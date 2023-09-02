import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useContext, useEffect, useRef, useState } from 'react';
import styles from './TourItem.module.scss';
import Image from '../Image';
import images from '../../assets/images';
import { Button, Rate, Select } from 'antd';
import { BsFillStarFill } from 'react-icons/bs';
import { IoTicketSharp } from 'react-icons/io5';
import { priceFormat } from '../../utils/format';
import { HiOutlineLocationMarker, HiPencil } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import config from '../../config';
import { StoreContext } from '../../store';
import TourForm from '../TourForm/TourForm';
import dayjs from 'dayjs';
const cx = classNames.bind(styles);

function TourItem({ className, data, onEdit }) {
    const [state, dispatch] = useContext(StoreContext);
    const userInfo = state.userInfo;
    const navigate = useNavigate();
    const [showTourForm, setShowTourForm] = useState(false);
    return (
        <>
            {/* <TourForm
                data={data}
                showTourForm={showTourForm}
                onClose={(edited) => {
                    console.log(edited);
                    // if (edited) {
                    //     if (searchQueryFromHome) {
                    //          getSearchTours();
                    //     } else {
                    //          getAllTours();
                    //     }
                    // }
                    setShowTourForm(false);
                }}
            /> */}
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
                        <h3 className={cx('address')}>
                            <HiOutlineLocationMarker className={cx('location-icon')} />
                            {data.address}
                        </h3>
                        <div className={cx('rate-wrapper')}>
                            <BsFillStarFill className={cx('rate-icon')} />
                            {data.averageRating || 'Not rated'}
                        </div>
                    </div>
                    <h3 className={cx('title')}>{data.tourName}</h3>
                    <h4 className={cx('quantity-seats')}>
                        <IoTicketSharp className={cx('ticket-icon')} />
                        {data.availableSeats} còn lại
                        <span className={cx('duration')}>{data.duration} ngày</span>
                    </h4>
                    <div className={cx('footer')}>
                        <div>
                            <p>
                                <span style={{ fontWeight: 700 }}>Khời hành :</span>{' '}
                                {dayjs(data.startDate).format('DD/MM/YYYY')}
                            </p>
                            <div className={cx('price')}>
                                <span>{priceFormat(data.price)}đ</span> /per
                            </div>
                        </div>
                        <Button
                            onClick={() => navigate(`/tour/${data._id}`, { state: data })}
                            size="large"
                            type="ghost"
                            className={cx('btn')}
                        >
                            Chi tiết
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TourItem;
