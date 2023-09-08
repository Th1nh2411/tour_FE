import styles from './TourDetail.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { useContext, useEffect, useState } from 'react';
import { StoreContext, actions } from '../../store';
import config from '../../config';
import {
    Alert,
    Button,
    Col,
    Descriptions,
    Input,
    InputNumber,
    Pagination,
    Rate,
    Row,
    Select,
    Skeleton,
    Space,
    Image as PreviewImage,
} from 'antd';
import { HiLocationMarker } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router';
import { BsFillStarFill, BsPeople } from 'react-icons/bs';
import { AiOutlineFieldTime } from 'react-icons/ai';
import * as bookingService from '../../services/bookingService';
import dayjs from 'dayjs';
import { priceFormat } from '../../utils/format';
import { MdTour } from 'react-icons/md';
import { TbPlaneDeparture, TbTicket } from 'react-icons/tb';
import * as reviewService from '../../services/reviewService';
const cx = classNames.bind(styles);

function TourDetail({}) {
    const [state, dispatch] = useContext(StoreContext);
    const data = useLocation().state;
    const navigate = useNavigate();
    const [guestSize, setGuestSizeValue] = useState(1);
    const [flag, setFlagValue] = useState(2);

    const [reviews, setReviews] = useState([]);
    const [numReviews, setNumReviews] = useState(0);
    const [loading, setLoading] = useState(false);
    const [currentPageReview, setCurrentPageReview] = useState(1);

    const payment = async () => {
        const results = await bookingService.createBooking({
            tourInfo: data._id,
            guestSize,
        });
        if (results.success) {
            const results2 = await bookingService.vnpayPayment({ id_order: results.data._id, flag });
            if (results2) window.location.replace(results2.data);
        } else {
            state.showToast('Thất bại', results.message, 'error');
        }
    };

    const getTourReview = async () => {
        setLoading(true);
        const results = await reviewService.getAllReview(data._id, currentPageReview - 1);
        setNumReviews(results.count || 0);
        setReviews(results.data || []);
        setLoading(false);
    };
    useEffect(() => {
        getTourReview();
    }, [currentPageReview]);
    const infoItems = [
        {
            key: '1',
            label: 'Tên đầy đủ',
            children: state.userInfo && state.userInfo.fullName,
        },
        {
            key: '2',
            label: 'Số điện thoại',
            children: state.userInfo && state.userInfo.phoneNumber,
        },
        {
            key: '3',
            label: 'Tài khoản gmail',
            children: state.userInfo && state.userInfo.email,
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <section>
                <Row gutter={[24, 24]}>
                    <Col lg={14}>
                        <Image src={data.photo} className={cx('img')} />
                        <Space direction="vertical" size={'small'} className={cx('card')}>
                            <h2>{data.tourName}</h2>
                            <div style={{ color: '#555' }} className={cx('align-center')}>
                                <div className={cx('align-center')}>
                                    <BsFillStarFill className={cx('icon')} />
                                    {data.averageRating || 0}
                                </div>
                                <div className={cx('align-center', 'ml-3')}>
                                    <HiLocationMarker className={cx('icon')} />
                                    {data.address}
                                </div>
                                <div className={cx('align-center', 'ml-3')}>
                                    <MdTour className={cx('icon')} />
                                    {data.category.categoryName}
                                </div>
                            </div>
                            <div style={{ color: '#555' }} className={cx('align-center')}>
                                <div className={cx('align-center')}>
                                    <TbPlaneDeparture className={cx('icon')} />
                                    {dayjs(data.startDate).format('DD/MM/YYYY')}
                                </div>{' '}
                                <div className={cx('align-center', 'ml-3')}>
                                    <AiOutlineFieldTime className={cx('icon')} />
                                    {data.duration} ngày
                                </div>
                                <div className={cx('align-center', 'ml-3')}>
                                    <TbTicket className={cx('icon')} />
                                    Còn lại: {data.availableSeats} /{data.maxSeats} vé
                                </div>
                            </div>
                            <h2 className={cx('mt-1')}>Mô tả</h2>
                            <p style={{ color: '#555' }}>{data.description}</p>
                            <h2 className={cx('mt-1')}>Hành trình</h2>
                            {data.itineraries.map((item, index) => (
                                <p key={index} style={{ color: '#555' }}>
                                    {item}
                                </p>
                            ))}
                        </Space>
                        <Space direction="vertical" size={'small'} className={cx('card', 'mt-2')}>
                            <h2>Đánh giá chuyến đi ({numReviews} đánh giá)</h2>
                            <Skeleton loading={loading}>
                                {reviews &&
                                    reviews.map((item, index) => (
                                        <Space className={cx('review-item')} key={index} align="start">
                                            <Image className={cx('user-photo')} src={item.userInfo.photo} />
                                            <div>
                                                <p style={{ fontWeight: 600 }}>{item.userInfo.fullName}</p>
                                                <Rate
                                                    disabled
                                                    defaultValue={item.rating}
                                                    allowHalf
                                                    style={{ fontSize: 12 }}
                                                />
                                                <p style={{ color: '#555' }}>{item.comment}</p>
                                                <Space className={cx('mt-1')} key={index}>
                                                    {item.photo &&
                                                        item.photo.map((item, index) => (
                                                            <PreviewImage height={60} width={80} src={item} />
                                                        ))}
                                                </Space>
                                            </div>
                                        </Space>
                                    ))}
                            </Skeleton>
                            <Pagination
                                onChange={(page) => setCurrentPageReview(page)}
                                style={{ textAlign: 'center' }}
                                className={cx('mt-1')}
                                current={currentPageReview}
                                total={numReviews}
                                pageSize={5}
                            />
                        </Space>
                    </Col>
                    <Col xs={24} lg={10}>
                        <div className={cx('booking-wrapper', 'card')}>
                            <div className={cx('content-between', 'booking-header')}>
                                <div className={cx('booking-price')}>
                                    <span>{priceFormat(data.price)}đ</span> /1 vé
                                </div>
                                <div className={cx('align-center')}>
                                    <BsFillStarFill className={cx('icon')} />({data.averageRating || 0})
                                </div>
                            </div>
                            <div className={cx('booking-form')}>
                                <h2>Thông tin đặt vé</h2>
                                <Descriptions size="small" column={1} items={infoItems} />
                                <Row gutter={12}>
                                    <Col span={16}>
                                        <Select
                                            disabled={!state.userInfo || !state.userInfo.isActive}
                                            size="large"
                                            className={cx('w-100')}
                                            placeholder="Chọn kiểu thanh toán"
                                            value={flag}
                                            onChange={(value) => setFlagValue(value)}
                                            options={[
                                                {
                                                    value: 1,
                                                    label: 'Thanh toán cọc (20%)',
                                                },
                                                {
                                                    value: 2,
                                                    label: 'Thanh toán toàn bộ',
                                                },
                                            ]}
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <InputNumber
                                            disabled={!state.userInfo || !state.userInfo.isActive}
                                            max={data.availableSeats}
                                            min="0"
                                            onChange={(value) => setGuestSizeValue(value)}
                                            value={guestSize}
                                            size="large"
                                            placeholder="Guest"
                                            className={cx('w-100')}
                                        />
                                    </Col>
                                </Row>
                                <div className={cx('align-center', 'content-between')}>
                                    <p className={cx('price-calculate')}>
                                        {priceFormat(data.price)}đ x {guestSize || 0} vé
                                    </p>
                                    <p className={cx('price-calculated')}>{priceFormat(data.price * guestSize)}đ</p>
                                </div>

                                <div className={cx('align-center', 'content-between')}>
                                    <p className={cx('total-title')}>Total</p>
                                    <p className={cx('total-calculated')}>{priceFormat(data.price * guestSize)}đ</p>
                                </div>
                            </div>
                            {(!state.userInfo || !state.userInfo.isActive) && (
                                <Alert
                                    type="error"
                                    message={
                                        !state.userInfo
                                            ? 'Vui lòng đăng nhập để đặt vé'
                                            : 'Tài khoản chưa được kích hoạt'
                                    }
                                    banner
                                />
                            )}
                            <Button
                                onClick={payment}
                                size="large"
                                type="primary"
                                disabled={!state.userInfo || !state.userInfo.isActive}
                            >
                                Đặt vé
                            </Button>
                        </div>
                    </Col>
                </Row>
            </section>
            <section>
                <Row>
                    <Col lg={10}>
                        <h3 className={cx('section-slogan')}>
                            <span className={cx('slogan-text')}>Subscribe</span>
                        </h3>
                        <h2 className={cx('mt-1')}>Subscribe us now to get useful traveling information</h2>
                        <div className={cx('mt-3', 'd-flex')}>
                            <Input placeholder="Enter your email" size="large" className={cx('customer-input')} />

                            <Button type="primary" size="large" className={cx('ml-2')}>
                                Subscribe
                            </Button>
                        </div>
                        <Image
                            src="https://www.allianz-partners.com/en_global/products/travel/_jcr_content/root/parsys/wrapper_copy/wrapper/image.img.82.3360.jpeg/1656941434579/travel-1800x600px.jpeg"
                            className={cx('w-100', 'mt-2')}
                        />
                    </Col>
                    <Col lg={12} offset={2}>
                        <Image
                            className={cx('w-100')}
                            src="https://doan-eta.vercel.app/static/media/male-tourist.f000d0ad1ca492b2bcfb.png"
                        />
                    </Col>
                </Row>
            </section>
        </div>
    );
}

export default TourDetail;
