import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useContext, useEffect, useRef, useState } from 'react';
import styles from './TourItem.module.scss';
import Image from '../Image';
import images from '../../assets/images';
import { Button, Rate, Select, Typography } from 'antd';
import { BsFillStarFill } from 'react-icons/bs';
import { IoTicketSharp } from 'react-icons/io5';
import { priceFormat } from '../../utils/format';
import { HiOutlineLocationMarker, HiPencil } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import config from '../../config';
import { StoreContext } from '../../store';
import dayjs from 'dayjs';
const { Title, Paragraph, Text } = Typography;
const cx = classNames.bind(styles);

function TourItem({ className, data, onEdit }) {
    const [state, dispatch] = useContext(StoreContext);
    const userInfo = state.userInfo;
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('header')}>
                <Image src={data.photo} className={cx('img')} />
                {data.featured && <div className={cx('featured')}>Featured</div>}
                {userInfo && userInfo.role === 'admin' && onEdit && (
                    <HiPencil onClick={onEdit} className={cx('edit-icon')} />
                )}
            </div>
            <div className={cx('body')}>
                <div className={cx('city-wrapper')}>
                    <Title level={3} className={cx('address')}>
                        <HiOutlineLocationMarker className={cx('location-icon')} />
                        {data.address}
                    </Title>
                    <div className={cx('rate-wrapper')}>
                        <BsFillStarFill className={cx('rate-icon')} />
                        {data.averageRating || 'Not rated'}
                    </div>
                </div>
                <Title level={3} className={cx('title')}>
                    {data.tourName}
                </Title>
                <Title level={4} className={cx('quantity-seats')}>
                    <IoTicketSharp className={cx('ticket-icon')} />
                    {data.availableSeats} còn lại
                    <Text className={cx('duration')}>{data.duration} ngày</Text>
                </Title>
                <div className={cx('footer')}>
                    <div>
                        <Text>
                            <Text style={{ fontWeight: 700 }}>Khời hành :</Text>{' '}
                            {dayjs(data.startDate).format('DD/MM/YYYY')}
                        </Text>
                        <div className={cx('price')}>
                            <Text>{priceFormat(data.price)}đ</Text> /1 vé
                        </div>
                    </div>
                    <Button
                        onClick={() => navigate(`/tour/${data._id}`)}
                        size="large"
                        type="ghost"
                        className={cx('btn')}
                    >
                        Chi tiết
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default TourItem;
