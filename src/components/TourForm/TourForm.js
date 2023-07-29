import PropTypes from 'prop-types';
import styles from './TourForm.module.scss';
import classNames from 'classnames/bind';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillExclamationCircle, AiFillInfoCircle } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import * as tourService from '../../services/tourService';
import { Col, Input, InputNumber, Modal, Row } from 'antd';
const cx = classNames.bind(styles);

const TourForm = ({ showTourForm, onClose = () => {} }) => {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [maxPeopleSize, setMaxPeople] = useState('');
    const [distance, setDistance] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [featured, setFeatured] = useState(true);
    const addTour = async () => {
        const results = await tourService.addTour({
            title,
            address,
            city,
            maxPeopleSize,
            distance,
            price,
            desc,
            featured,
        });
        console.log(results);
        onClose();
    };

    console.log(showTourForm);
    return (
        <Modal title="Add Tour" open={showTourForm} okText="Confirm Add" onOk={addTour} onCancel={onClose}>
            <Row gutter={[10, 10]} className={cx('mt-2')}>
                <Col md={12}>
                    <Input
                        size="large"
                        className={cx('search-input')}
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Col>
                <Col md={12}>
                    <Input
                        size="large"
                        className={cx('search-input')}
                        placeholder="City"
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Col>
                <Col md={12}>
                    <Input
                        size="large"
                        className={cx('search-input')}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Col>
                <Col md={12}>
                    <Input
                        size="large"
                        className={cx('search-input')}
                        placeholder="Description"
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </Col>
            </Row>
            <Row gutter={10} className={cx('mt-1')}>
                <Col md={8}>
                    <InputNumber
                        size="large"
                        className={cx('w-100')}
                        placeholder="Max People"
                        onChange={(value) => setMaxPeople(value)}
                    />
                </Col>
                <Col md={8}>
                    <InputNumber
                        after
                        size="large"
                        className={cx('w-100')}
                        placeholder="Distance"
                        onChange={(value) => setDistance(value)}
                        controls={false}
                        addonAfter="km"
                    />
                </Col>
                <Col md={8}>
                    <InputNumber
                        prefix="$"
                        size="large"
                        className={cx('w-100')}
                        placeholder="Price"
                        onChange={(value) => setPrice(value)}
                        controls={false}
                    />
                </Col>
            </Row>
        </Modal>
    );
};

export default TourForm;
