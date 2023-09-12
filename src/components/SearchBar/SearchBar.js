import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useContext, useEffect, useRef, useState } from 'react';
import styles from './SearchBar.module.scss';
import images from '../../assets/images';
import { Button, Col, Input, InputNumber, Rate, Row, Select } from 'antd';
import { BsFillStarFill } from 'react-icons/bs';
import { IoTicketSharp } from 'react-icons/io5';
import { priceFormat } from '../../utils/format';
import { HiOutlineLocationMarker, HiOutlineMap, HiOutlineUsers, HiPencil } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import config from '../../config';
import { StoreContext } from '../../store';
import dayjs from 'dayjs';
import { BiSearch } from 'react-icons/bi';
const cx = classNames.bind(styles);

function SearchBar({ className, defaultValue, onSearch = () => {}, resetQuery, doneReset = () => {} }) {
    const [keyword, setLocationValue] = useState(defaultValue ? defaultValue.keyword : '');
    const [availableSeats, setAvailableSeats] = useState(defaultValue ? defaultValue.availableSeats : 1);
    const [duration, setDuration] = useState(defaultValue ? defaultValue.duration : null);
    useEffect(() => {
        if (resetQuery) {
            setLocationValue('');
            setAvailableSeats(1);
            setDuration(null);
            doneReset();
        }
    }, [resetQuery]);
    return (
        <div className={cx('wrapper', className)}>
            <Row gutter={[10, 10]}>
                <Col md={10}>
                    <div className={cx('search-item')}>
                        <HiOutlineMap className={cx('icon')} />
                        <div>
                            <h5 className={cx('search-title')}>Du lịch đâu nè?</h5>
                            <Input
                                className={cx('search-input')}
                                placeholder="Where are you going"
                                bordered={false}
                                value={keyword}
                                onChange={(e) => setLocationValue(e.target.value)}
                            />
                        </div>
                    </div>
                </Col>
                <Col md={6}>
                    <div className={cx('search-item')}>
                        <HiOutlineUsers className={cx('icon')} />
                        <div>
                            <h5 className={cx('search-title')}>Chỗ trống</h5>
                            <InputNumber
                                className={cx('search-input')}
                                placeholder="1"
                                bordered={false}
                                value={availableSeats}
                                onChange={(value) => setAvailableSeats(value)}
                                min={1}
                            />
                        </div>
                    </div>
                </Col>
                <Col className={cx('align-center')} md={6}>
                    <Select
                        placeholder="Chọn kiểu du lịch"
                        size="large"
                        value={duration}
                        onChange={(value) => setDuration(value)}
                        options={[
                            {
                                value: 0,
                                label: 'Du lịch ngắn ngày',
                            },
                            {
                                value: 1,
                                label: 'Du lịch dài ngày',
                            },
                        ]}
                    />
                </Col>
                <Col md={2} className={cx('content-end')}>
                    <div onClick={() => onSearch({ keyword, availableSeats, duration })} className={cx('search-btn')}>
                        <BiSearch />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default SearchBar;
