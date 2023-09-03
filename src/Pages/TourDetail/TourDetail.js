import styles from './TourDetail.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { useContext, useEffect, useState } from 'react';
import { StoreContext, actions } from '../../store';
import config from '../../config';
import { Alert, Button, Col, Descriptions, Input, InputNumber, Row, Select, Space } from 'antd';
import { HiLocationMarker, HiOutlineLocationMarker, HiOutlineMap } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router';
import { BsFillStarFill, BsPeople } from 'react-icons/bs';
import { AiOutlineFieldTime } from 'react-icons/ai';
import * as bookingService from '../../services/bookingService';
import dayjs from 'dayjs';
import { priceFormat } from '../../utils/format';
import { MdTour } from 'react-icons/md';
import { TbPlaneDeparture, TbTicket } from 'react-icons/tb';
const cx = classNames.bind(styles);

function TourDetail({}) {
    const [state, dispatch] = useContext(StoreContext);
    const data = useLocation().state;
    const navigate = useNavigate();
    const [guestSize, setGuestSizeValue] = useState('');
    const [reviewText, setReviewTextValue] = useState('');
    const [rating, setRatingValue] = useState(5);

    const createBooking = async () => {
        const results = await bookingService.createBooking({
            guestSize,
        });
        if (results.success) {
            state.showToast('Successfully booked on ' + dayjs(data.createAt).format('DD/MM/YYYY'), results.message);
        } else {
            state.showToast('Failure', results.message, 'error');
        }
    };

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
                            <h2 className={cx('mt-2')}>Description</h2>
                            <p style={{ color: '#555' }}>{data.description}</p>
                        </Space>
                        <Space direction="vertical" size={'small'} className={cx('card', 'mt-2')}>
                            <h2>Reviews ({data.reviews && data.reviews.length} reviews)</h2>
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
                                            size="large"
                                            className={cx('w-100')}
                                            placeholder="Chọn kiểu thanh toán"
                                            options={[
                                                {
                                                    value: 0,
                                                    label: 'Thanh toán cọc (20%)',
                                                },
                                                {
                                                    value: 1,
                                                    label: 'Thanh toán toàn bộ',
                                                },
                                            ]}
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <InputNumber
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
                                onClick={createBooking}
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
                        <Image src="https://doan-eta.vercel.app/static/media/male-tourist.f000d0ad1ca492b2bcfb.png" />
                    </Col>
                </Row>
            </section>
        </div>
    );
}

export default TourDetail;
