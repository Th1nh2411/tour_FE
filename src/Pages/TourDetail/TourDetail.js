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
    Modal,
    Typography,
} from 'antd';
import { HiLocationMarker } from 'react-icons/hi';
import { useLocation, useNavigate, useParams } from 'react-router';
import { BsFillStarFill, BsPeople } from 'react-icons/bs';
import { AiOutlineFieldTime } from 'react-icons/ai';
import * as bookingService from '../../services/bookingService';
import dayjs from 'dayjs';
import { priceFormat } from '../../utils/format';
import { MdTour } from 'react-icons/md';
import { TbPlaneDeparture, TbTicket } from 'react-icons/tb';
import * as reviewService from '../../services/reviewService';
import * as tourService from '../../services/tourService';
import RefundPolicy from '../../components/RefundPolicy';
const { Title, Paragraph, Text } = Typography;
const cx = classNames.bind(styles);

function TourDetail({}) {
    const [state, dispatch] = useContext(StoreContext);
    const [tourData, setTourData] = useState({});
    const [guestSize, setGuestSizeValue] = useState(1);
    const [flag, setFlagValue] = useState(2);

    const [reviews, setReviews] = useState([]);
    const [numReviews, setNumReviews] = useState(0);
    const [loading, setLoading] = useState(false);
    const [bookLoading, setBookLoading] = useState(false);
    const [currentPageReview, setCurrentPageReview] = useState(1);
    const { idTour } = useParams();

    const payment = async () => {
        setBookLoading(true);
        const results = await bookingService.createBooking({
            tourInfo: tourData._id,
            guestSize,
        });
        if (results) {
            const results2 = await bookingService.vnpayPayment({ id_order: results.data._id, flag });
            if (results2) window.location.replace(results2.data);
        }
        setBookLoading(false);
    };

    const getTourData = async () => {
        setLoading(true);
        const results = await tourService.getDetailTour(idTour);
        const results2 = await reviewService.getAllReview(idTour, currentPageReview - 1);
        if (results) {
            setTourData(results.data);
        }
        if (results2) {
            setNumReviews(results2.count);
            setReviews(results2.data);
        }
        setLoading(false);
    };
    useEffect(() => {
        getTourData();
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
    const guideItems = [
        {
            key: '1',
            label: 'Tên đầy đủ',
            children: tourData && tourData.guide && tourData.guide.guideName,
        },
        {
            key: '2',
            label: 'Số điện thoại',
            children: tourData && tourData.guide && tourData.guide.phoneNumber,
        },
        {
            key: '3',
            label: 'Tài khoản gmail',
            children: tourData && tourData.guide && tourData.guide.email,
        },
        {
            key: '4',
            label: 'Ngôn ngữ',
            children: tourData && tourData.guide && tourData.guide.languages,
        },
    ];
    const [showPolicy, setShowPolicy] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <Modal
                title="Chính sách và lưu ý"
                open={showPolicy}
                okButtonProps={{ loading: bookLoading }}
                onOk={payment}
                okText="Tôi đồng ý và đặt vé"
                cancelText="Quay lại"
                onCancel={() => setShowPolicy(false)}
            >
                <RefundPolicy />
            </Modal>
            <section>
                <Row gutter={[24, 24]}>
                    <Col lg={14}>
                        <Skeleton loading={loading}>
                            <Image src={tourData.photo} className={cx('img')} />
                            <Space direction="vertical" size={'small'} className={cx('card')}>
                                <Title>{tourData.tourName}</Title>
                                <div style={{ color: '#555' }} className={cx('align-center')}>
                                    <div className={cx('align-center')}>
                                        <BsFillStarFill className={cx('icon')} />
                                        {tourData.averageRating || 0}
                                    </div>
                                    <div className={cx('align-center', 'ml-3')}>
                                        <HiLocationMarker className={cx('icon')} />
                                        {tourData.address}
                                    </div>
                                    <div className={cx('align-center', 'ml-3')}>
                                        <MdTour className={cx('icon')} />
                                        {tourData.category && tourData.category.categoryName}
                                    </div>
                                </div>
                                <div style={{ color: '#555' }} className={cx('align-center')}>
                                    <div className={cx('align-center')}>
                                        <TbPlaneDeparture className={cx('icon')} />
                                        {dayjs(tourData.startDate).format('DD/MM/YYYY')}
                                    </div>{' '}
                                    <div className={cx('align-center', 'ml-3')}>
                                        <AiOutlineFieldTime className={cx('icon')} />
                                        {tourData.duration} ngày
                                    </div>
                                    <div className={cx('align-center', 'ml-3')}>
                                        <TbTicket className={cx('icon')} />
                                        Còn lại: {tourData.availableSeats} /{tourData.maxSeats} vé
                                    </div>
                                </div>
                                <Title className={cx('mt-1')}>Mô tả</Title>
                                <Text style={{ color: '#555' }}>{tourData.description}</Text>
                                <Title className={cx('mt-1')}>Hành trình</Title>
                                {tourData.itineraries &&
                                    tourData.itineraries.map((item, index) => (
                                        <Text key={index} style={{ color: '#555' }}>
                                            {item}
                                        </Text>
                                    ))}
                                <Title className={cx('mt-1')}>Hướng dẫn viên</Title>

                                <Descriptions column={{ xs: 1, sm: 2, md: 2, lg: 1, xl: 2 }} items={guideItems} />
                            </Space>
                            <Space direction="vertical" size={'small'} className={cx('card', 'mt-2')}>
                                <Title>Đánh giá chuyến đi ({numReviews} đánh giá)</Title>
                                {reviews &&
                                    reviews.map((item, index) => (
                                        <Space className={cx('review-item')} key={index} align="start">
                                            <Image className={cx('user-photo')} src={item.userInfo.photo} />
                                            <div>
                                                <Text style={{ fontWeight: 600 }}>{item.userInfo.fullName}</Text>
                                                <Rate
                                                    disabled
                                                    defaultValue={item.rating}
                                                    allowHalf
                                                    style={{ fontSize: 12 }}
                                                />
                                                <Text style={{ color: '#555' }}>{item.comment}</Text>
                                                <Space className={cx('mt-1')} key={index}>
                                                    {item.photo &&
                                                        item.photo.map((item, index) => (
                                                            <PreviewImage height={60} width={80} src={item} />
                                                        ))}
                                                </Space>
                                            </div>
                                        </Space>
                                    ))}
                                <Pagination
                                    onChange={(page) => setCurrentPageReview(page)}
                                    style={{ textAlign: 'center' }}
                                    className={cx('mt-1')}
                                    current={currentPageReview}
                                    total={numReviews}
                                    pageSize={5}
                                />
                            </Space>
                        </Skeleton>
                    </Col>
                    <Col xs={24} lg={10}>
                        <Skeleton loading={loading}>
                            <div className={cx('booking-wrapper', 'card')}>
                                <div className={cx('content-between', 'booking-header')}>
                                    <div className={cx('booking-price')}>
                                        <Text>{priceFormat(tourData.price)}đ</Text> /1 vé
                                    </div>
                                    <div className={cx('align-center')}>
                                        <BsFillStarFill className={cx('icon')} />({tourData.averageRating || 0})
                                    </div>
                                </div>
                                <div className={cx('booking-form')}>
                                    <Title>Thông tin đặt vé</Title>
                                    <Descriptions size="small" column={1} items={infoItems} />
                                    <Row gutter={12}>
                                        <Col span={16}>
                                            <Select
                                                disabled={!state.userInfo}
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
                                                disabled={!state.userInfo}
                                                max={tourData.availableSeats}
                                                min="1"
                                                onChange={(value) => setGuestSizeValue(value)}
                                                value={guestSize}
                                                size="large"
                                                placeholder="Guest"
                                                className={cx('w-100')}
                                            />
                                        </Col>
                                    </Row>
                                    <div className={cx('align-center', 'content-between')}>
                                        <Text className={cx('price-calculate')}>
                                            {priceFormat(tourData.price)}đ x {guestSize || 0} vé
                                        </Text>
                                        <Text className={cx('price-calculated')}>
                                            {priceFormat(tourData.price * guestSize)}đ
                                        </Text>
                                    </div>

                                    <div className={cx('align-center', 'content-between')}>
                                        <Text className={cx('total-title')}>Total</Text>
                                        <Text className={cx('total-calculated')}>
                                            {priceFormat(tourData.price * guestSize)}đ
                                        </Text>
                                    </div>
                                </div>
                                {!state.userInfo && (
                                    <Alert type="error" message={'Vui lòng đăng nhập để đặt vé'} banner />
                                )}
                                <Button
                                    onClick={() => setShowPolicy(true)}
                                    size="large"
                                    type="primary"
                                    disabled={!state.userInfo}
                                >
                                    Đặt vé
                                </Button>
                            </div>
                        </Skeleton>
                    </Col>
                </Row>
            </section>
        </div>
    );
}

export default TourDetail;
