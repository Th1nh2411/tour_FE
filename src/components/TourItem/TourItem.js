import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import styles from './TourItem.module.scss';
import Image from '../Image';
import images from '../../assets/images';
import { Button, Rate, Select } from 'antd';
import { BsCalendar3, BsFillPersonFill } from 'react-icons/bs';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { priceFormat } from '../../utils/format';
const cx = classNames.bind(styles);

function TourItem({ className, data }) {
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('header')}>
                <Image src={data.photo} className={cx('img')} />
            </div>
            <div className={cx('body')}>
                <h2 className={cx('title')}>{data.title}</h2>
                <h4 className={cx('subtile')}>
                    Address: <span>{data.address}</span>
                </h4>
                <h4 className={cx('distance')}>
                    <BsFillPersonFill />
                    {data.distance} km
                    <span className={cx({ active: data.type === 'Online' })}>{data.city}</span>
                </h4>
                <h5 className={cx('info')}>{data.desc}</h5>

                <div className={cx('d-flex', 'align-s-center')}>
                    <div className={cx('price')}>${priceFormat(data.price)} </div>
                    <div className={cx('max-people')}>
                        <BsCalendar3 className={cx('calendar-icon')} />
                        Max people: {data.maxGroupSize}
                    </div>
                </div>
                <div className={cx('divider')}></div>

                <Button size="large" type="primary" className={cx('btn')}>
                    Xem chi tiết
                </Button>
            </div>
        </div>
    );
}

export default TourItem;
