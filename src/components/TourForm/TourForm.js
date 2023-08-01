import PropTypes from 'prop-types';
import styles from './TourForm.module.scss';
import classNames from 'classnames/bind';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillExclamationCircle, AiFillInfoCircle } from 'react-icons/ai';
import { useContext, useEffect, useRef, useState } from 'react';
import * as tourService from '../../services/tourService';
import { Button, Col, Input, InputNumber, Modal, Row, Upload, message } from 'antd';
import { BsUpload } from 'react-icons/bs';
import { StoreContext } from '../../store';
const cx = classNames.bind(styles);

const TourForm = ({ showTourForm, onClose = () => {} }) => {
    const [state, dispatch] = useContext(StoreContext);
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [maxGroupSize, setMaxGroupSize] = useState('');
    const [distance, setDistance] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [featured, setFeatured] = useState(true);
    const [photo, setPhoto] = useState();
    const addTour = async () => {
        const results = await tourService.addTour({
            title,
            address,
            city,
            maxGroupSize,
            distance,
            price,
            desc,
            featured,
            photo,
        });
        if (results.success) {
            state.showToast('Success', results.message);
        } else {
            state.showToast('Fail', results.message, 'error');
        }
        onClose();
    };
    const handleChangeUpload = (info) => {
        setPhoto('/tour-images/' + info.fileList[0].name);
    };
    return (
        <Modal
            title={<h2 className={cx('text-center')}>Add Tour</h2>}
            open={showTourForm}
            okText="Confirm Add"
            onOk={addTour}
            onCancel={onClose}
        >
            <Row gutter={[10, 10]} className={cx('mt-2')}>
                <Col md={12}>
                    <Input
                        size="large"
                        className={cx('data-input')}
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Col>
                <Col md={12}>
                    <Input
                        size="large"
                        className={cx('data-input')}
                        placeholder="City"
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Col>

                <Col md={12}>
                    <Input
                        size="large"
                        className={cx('data-input')}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Col>
                <Col md={12}>
                    <Input
                        size="large"
                        className={cx('data-input')}
                        placeholder="Description"
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </Col>
                <Col md={8}>
                    <InputNumber
                        size="large"
                        className={cx('w-100')}
                        placeholder="Max People"
                        onChange={(value) => setMaxGroupSize(value)}
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
                <Col md={12}>
                    <Upload
                        beforeUpload={() => false}
                        accept="image/*"
                        maxCount={1}
                        className={cx('data-input')}
                        onChange={handleChangeUpload}
                    >
                        <Button icon={<BsUpload />}>Upload image</Button>
                    </Upload>
                </Col>
            </Row>
        </Modal>
    );
};

export default TourForm;
