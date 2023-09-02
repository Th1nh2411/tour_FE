import styles from './TourDetail.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { useContext, useEffect, useState } from 'react';
import { StoreContext, actions } from '../../store';
import config from '../../config';
import { Button, Col, DatePicker, Input, InputNumber, Rate, Row, Space } from 'antd';
import { HiLocationMarker, HiOutlineLocationMarker, HiOutlineMap } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router';
import { BsFillStarFill, BsPeople } from 'react-icons/bs';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import * as bookingService from '../../services/bookingService';
import * as reviewService from '../../services/reviewService';
import dayjs from 'dayjs';
import { priceFormat } from '../../utils/format';
const cx = classNames.bind(styles);

function TourDetail({}) {
    const [state, dispatch] = useContext(StoreContext);
    const data = useLocation().state;
    const navigate = useNavigate();
    const [fullName, setFullNameValue] = useState('');
    const [phone, setPhoneValue] = useState('');
    const [bookAt, setBookAtValue] = useState('');
    const [guestSize, setGuestSizeValue] = useState('');
    const [reviewText, setReviewTextValue] = useState('');
    const [rating, setRatingValue] = useState(5);
    const onChangeDate = (date, dateString) => {
        setBookAtValue(dateString);
    };

    const createReview = async () => {
        const results = await reviewService.createReview(
            {
                productId: data._id,
                username: state.userInfo.username,
                reviewText,
                rating,
            },
            data._id,
        );
        if (results.success) {
            state.showToast('Successfully', results.message);
        } else {
            state.showToast('Failure', results.message, 'error');
        }
    };
    const createBooking = async () => {
        const results = await bookingService.createBooking({
            phone,
            bookAt,
            guestSize,
            fullName,
            tourName: data.title,
            userEmail: state.userInfo.email,
            userId: state.userInfo._id,
        });
        if (results.success) {
            state.showToast('Successfully booked on ' + dayjs(bookAt).format('DD/MM/YYYY'), results.message);
        } else {
            state.showToast('Failure', results.message, 'error');
        }
    };
    const handleBookTour = () => {
        if (state.userInfo) {
            createBooking();
        } else {
            state.showToast('Fail', `Please Sign In`, 'error');
        }
    };
    const handleSubmitReview = () => {
        if (state.userInfo) {
            createReview();
            setReviewTextValue('');
        } else {
            state.showToast('Fail', `Please Sign In`, 'error');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <section>
                <Row gutter={[24, 24]}>
                    <Col lg={16}>
                        <Image src={data.photo} className={cx('img')} />
                        <Space direction="vertical" size={'small'} className={cx('card')}>
                            <h2>{data.title}</h2>
                            <div style={{ color: '#555' }} className={cx('align-center')}>
                                <div className={cx('align-center')}>
                                    <BsFillStarFill className={cx('icon')} />({data.rate || 0})
                                </div>
                                <div className={cx('align-center', 'ml-3')}>
                                    <HiLocationMarker className={cx('icon')} />
                                    {data.address}
                                </div>
                            </div>
                            <div style={{ color: '#555' }} className={cx('align-center')}>
                                <div className={cx('align-center')}>
                                    <HiOutlineLocationMarker className={cx('icon')} />
                                    {data.city}
                                </div>
                                <div className={cx('align-center', 'ml-3')}>
                                    <RiMoneyDollarCircleLine className={cx('icon')} />
                                    {priceFormat(data.price)}đ /per person
                                </div>
                                <div className={cx('align-center', 'ml-3')}>
                                    <HiOutlineMap className={cx('icon')} />
                                    {data.distance} k/m
                                </div>
                                <div className={cx('align-center', 'ml-3')}>
                                    <BsPeople className={cx('icon')} />
                                    {data.maxGroupSize} people
                                </div>
                            </div>
                            <h2 className={cx('mt-2')}>Description</h2>
                            <p style={{ color: '#555' }}>{data.desc}</p>
                        </Space>
                        <Space direction="vertical" size={'small'} className={cx('card', 'mt-2')}>
                            <h2>Reviews ({data.reviews && data.reviews.length} reviews)</h2>
                            <Rate value={rating} onChange={(value) => setRatingValue(value)} />
                            <Space.Compact
                                size="large"
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Input
                                    value={reviewText}
                                    onChange={(e) => setReviewTextValue(e.target.value)}
                                    placeholder="Share your thoughts"
                                />
                                <Button onClick={handleSubmitReview} className={cx('customer-btn')} type="ghost">
                                    Submit
                                </Button>
                            </Space.Compact>
                        </Space>
                    </Col>
                    <Col xs={24} lg={8}>
                        <div className={cx('booking-wrapper', 'card')}>
                            <div className={cx('content-between', 'booking-header')}>
                                <div className={cx('booking-price')}>
                                    <span>${data.price}</span> /per person
                                </div>
                                <div className={cx('align-center')}>
                                    <BsFillStarFill className={cx('icon')} />({data.rate || 0})
                                </div>
                            </div>
                            <div className={cx('booking-form')}>
                                <h2>Information</h2>
                                <Input
                                    onChange={(e) => setFullNameValue(e.target.value)}
                                    value={fullName}
                                    size="large"
                                    placeholder="Full Name"
                                />
                                <InputNumber
                                    onChange={(value) => setPhoneValue(value)}
                                    value={phone}
                                    size="large"
                                    placeholder="Phone"
                                    controls={false}
                                    className={cx('w-100')}
                                />
                                <Row gutter={12}>
                                    <Col span={12}>
                                        <DatePicker size="large" onChange={onChangeDate} className={cx('w-100')} />
                                    </Col>
                                    <Col span={12}>
                                        <InputNumber
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
                                    <p className={cx('price-calculate')}>${data.price} x 1 person</p>
                                    <p className={cx('price-calculated')}>${data.price * guestSize}</p>
                                </div>
                                <div className={cx('align-center', 'content-between')}>
                                    <p className={cx('charge-title')}>Service charge</p>
                                    <p className={cx('charge-calculated')}>$10</p>
                                </div>
                                <div className={cx('align-center', 'content-between')}>
                                    <p className={cx('total-title')}>Total</p>
                                    <p className={cx('total-calculated')}>${data.price * guestSize + 10}</p>
                                </div>
                            </div>
                            <Button
                                onClick={handleBookTour}
                                size="large"
                                className={cx('customer-btn', 'mt-1')}
                                type="ghost"
                            >
                                Book Now
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

                            <Button type="ghost" size="large" className={cx('customer-btn', 'ml-2')}>
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
