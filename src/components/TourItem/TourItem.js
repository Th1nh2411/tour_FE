import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import styles from './TourItem.module.scss';
import Image from '../Image';
import images from '../../assets/images';
import { Button, Rate, Select } from 'antd';
import { BsCalendar3, BsFillStarFill } from 'react-icons/bs';
import { priceFormat } from '../../utils/format';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import config from '../../config';
const cx = classNames.bind(styles);

function TourItem({ className, data }) {
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('header')}>
                <Image src={'https://doan-eta.vercel.app' + data.photo} className={cx('img')} />
                <div className={cx('featured')}>Featured</div>
            </div>
            <div className={cx('body')}>
                <div className={cx('city-wrapper')}>
                    <h3 className={cx('city')}>
                        <HiOutlineLocationMarker className={cx('location-icon')} />
                        {data.city}
                    </h3>
                    <div className={cx('rate-wrapper')}>
                        <BsFillStarFill className={cx('rate-icon')} />
                        {data.rate || 'Not rated'}
                    </div>
                </div>
                <h3 className={cx('title')}>{data.title}</h3>

                <div className={cx('footer')}>
                    <div className={cx('price')}>
                        <span>${priceFormat(data.price)}</span> /per person{' '}
                    </div>
                    <Button
                        onClick={() => navigate(`/tour/${data._id}`, { state: data })}
                        size="large"
                        type="ghost"
                        className={cx('btn')}
                    >
                        Book Now
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default TourItem;
