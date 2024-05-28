import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useContext, useEffect, useRef, useState } from 'react';
import styles from './SearchBar.module.scss';
import images from '../../assets/images';
import { Button, Col, Input, InputNumber, Rate, Row, Select, Typography } from 'antd';

import { HiOutlineLocationMarker, HiOutlineMap, HiOutlineUsers, HiPencil } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
const cx = classNames.bind(styles);
const { Title, Paragraph, Text } = Typography;

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
            <Row align={'middle'} style={{ rowGap: 20 }} gutter={{ xs: 10, md: 30 }}>
                <Col xs={24} md={10} lg={10}>
                    <div className={cx('search-item')}>
                        <HiOutlineMap className={cx('icon')} />
                        <div style={{ flex: 1 }}>
                            <Title level={5} className={cx('search-title')}>
                                Du lịch đâu nè?
                            </Title>
                            <Input
                                variant="filled"
                                className={cx('search-input')}
                                placeholder="Where are you going"
                                value={keyword}
                                onChange={(e) => setLocationValue(e.target.value)}
                            />
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={6} lg={6}>
                    <div className={cx('search-item')}>
                        <HiOutlineUsers className={cx('icon')} />
                        <div>
                            <Title level={5} className={cx('search-title')}>
                                Chỗ trống
                            </Title>
                            <InputNumber
                                variant="filled"
                                className={cx('search-input')}
                                placeholder="1"
                                value={availableSeats}
                                onChange={(value) => setAvailableSeats(value)}
                                min={1}
                            />
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={8} className={cx('align-center')} lg={6}>
                    <div className={cx('search-item')}>
                        <HiOutlineUsers className={cx('icon')} />
                        <div>
                            <Title level={5} className={cx('search-title')}>
                                Kiểu du lịch
                            </Title>
                            <Select
                                placeholder="Chọn kiểu du lịch"
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
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={24} lg={2}>
                    <div onClick={() => onSearch({ keyword, availableSeats, duration })} className={cx('search-btn')}>
                        <BiSearch />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default SearchBar;
