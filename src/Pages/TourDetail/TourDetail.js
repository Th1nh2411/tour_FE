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
const cx = classNames.bind(styles);

function TourDetail({}) {
    const [state, dispatch] = useContext(StoreContext);
    const data = useLocation().state;
    const navigate = useNavigate();
    const serverPath = process.env.SERVER_PATH || 'https://doan-eta.vercel.app';
    const [fullNameValue, setFullNameValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [dateValue, setDateValue] = useState('');
    const [numPeopleValue, setNumPeopleValue] = useState('');
    const onChangeDate = (date, dateString) => {
        setDateValue(dateString);
    };
    const handleSubmitReview = () => {
        if (state.userInfo) {
            state.showToast('Successfully', `Successfully booked tickets on ${dateValue}`);
        } else {
            state.showToast('Fail', `Please Sign In`, 'error');
        }
    };
    const handleBookTour = () => {
        if (state.userInfo) {
            state.showToast('Successfully', `Submit review successful`);
        } else {
            state.showToast('Fail', `Please Sign In`, 'error');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <section>
                <Row gutter={28}>
                    <Col lg={16}>
                        <Image src={serverPath + data.photo} className={cx('img')} />
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
                                    <RiMoneyDollarCircleLine className={cx('icon')} />${data.price} /per person
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
                            <h2>Reviews ({data.reviews.length} reviews)</h2>
                            <Rate defaultValue={5} />
                            <Space.Compact
                                size="large"
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Input placeholder="Share your thoughts" />
                                <Button onClick={handleSubmitReview} className={cx('customer-btn')} type="ghost">
                                    Submit
                                </Button>
                            </Space.Compact>
                        </Space>
                    </Col>
                    <Col lg={8}>
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
                                    value={fullNameValue}
                                    size="large"
                                    placeholder="Full Name"
                                />
                                <InputNumber
                                    onChange={(value) => setPhoneValue(value)}
                                    value={phoneValue}
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
                                            onChange={(value) => setNumPeopleValue(value)}
                                            value={numPeopleValue}
                                            size="large"
                                            placeholder="Guest"
                                            className={cx('w-100')}
                                        />
                                    </Col>
                                </Row>
                                <div className={cx('align-center', 'content-between')}>
                                    <p className={cx('price-calculate')}>${data.price} x 1 person</p>
                                    <p className={cx('price-calculated')}>${data.price * numPeopleValue}</p>
                                </div>
                                <div className={cx('align-center', 'content-between')}>
                                    <p className={cx('charge-title')}>Service charge</p>
                                    <p className={cx('charge-calculated')}>$10</p>
                                </div>
                                <div className={cx('align-center', 'content-between')}>
                                    <p className={cx('total-title')}>Total</p>
                                    <p className={cx('total-calculated')}>${data.price * numPeopleValue + 10}</p>
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
