import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useContext, useEffect, useRef, useState } from 'react';
import styles from './TourItem.module.scss';
import Image from '../Image';
import images from '../../assets/images';
import { Button, Rate, Select } from 'antd';
import { BsCalendar3, BsFillStarFill } from 'react-icons/bs';
import { priceFormat } from '../../utils/format';
import { HiOutlineLocationMarker, HiPencil } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import config from '../../config';
import { StoreContext } from '../../store';
import TourForm from '../TourForm/TourForm';
const cx = classNames.bind(styles);

function TourItem({ className, data }) {
    const [state, dispatch] = useContext(StoreContext);
    const userInfo = state.userInfo;
    const navigate = useNavigate();
    const [showTourForm, setShowTourForm] = useState(false);
    return (
        <>
            <TourForm data={data} showTourForm={showTourForm} onClose={() => setShowTourForm(false)} />
            <div className={cx('wrapper', className)}>
                <div className={cx('header')}>
                    <Image src={'https://doan-eta.vercel.app' + data.photo} className={cx('img')} />
                    <div className={cx('featured')}>Featured</div>
                    {userInfo && userInfo.role === 'admin' && (
                        <HiPencil onClick={() => setShowTourForm(true)} className={cx('edit-icon')} />
                    )}
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
        </>
    );
}

export default TourItem;
