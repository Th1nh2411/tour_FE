import PropTypes from 'prop-types';
import styles from './TourForm.module.scss';
import classNames from 'classnames/bind';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillExclamationCircle, AiFillInfoCircle } from 'react-icons/ai';
import { useContext, useEffect, useRef, useState } from 'react';
import * as tourService from '../../services/tourService';
import { Button, Checkbox, Col, Input, InputNumber, Modal, Row, Upload, message } from 'antd';
import { BsUpload } from 'react-icons/bs';
import { StoreContext } from '../../store';
const cx = classNames.bind(styles);

const TourForm = ({ data, showTourForm, onClose = () => {} }) => {
    const [state, dispatch] = useContext(StoreContext);
    const [title, setTitle] = useState(data ? data.title : '');
    const [address, setAddress] = useState(data ? data.address : '');
    const [city, setCity] = useState(data ? data.city : '');
    const [maxGroupSize, setMaxGroupSize] = useState(data ? data.maxGroupSize : '');
    const [distance, setDistance] = useState(data ? data.distance : '');
    const [price, setPrice] = useState(data ? data.price : '');
    const [desc, setDesc] = useState(data ? data.desc : '');
    const [featured, setFeatured] = useState(data ? data.featured : false);
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
    const editTour = async () => {
        const results = await tourService.editTour(
            {
                title,
                address,
                city,
                maxGroupSize,
                distance,
                price,
                desc,
                featured,
                photo,
            },
            data._id,
        );
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
            title={<h2 className={cx('text-center')}>{data ? 'Edit Tour' : 'Add Tour'}</h2>}
            open={showTourForm}
            okText="Confirm Edit"
            onOk={data ? editTour : addTour}
            onCancel={onClose}
        >
            <Row gutter={[10, 10]} className={cx('mt-2', 'align-center')}>
                <Col md={12}>
                    <Input
                        value={address}
                        size="large"
                        className={cx('data-input')}
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Col>
                <Col md={12}>
                    <Input
                        value={city}
                        size="large"
                        className={cx('data-input')}
                        placeholder="City"
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Col>

                <Col md={12}>
                    <Input
                        value={title}
                        size="large"
                        className={cx('data-input')}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Col>
                <Col md={12}>
                    <Input
                        value={desc}
                        size="large"
                        className={cx('data-input')}
                        placeholder="Description"
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </Col>
                <Col>
                    <InputNumber
                        value={maxGroupSize}
                        size="large"
                        className={cx('w-100')}
                        placeholder="Max People"
                        onChange={(value) => setMaxGroupSize(value)}
                    />
                </Col>
                <Col>
                    <InputNumber
                        value={distance}
                        size="large"
                        className={cx('w-100')}
                        placeholder="Distance"
                        onChange={(value) => setDistance(value)}
                        controls={false}
                        addonAfter="km"
                    />
                </Col>
                <Col>
                    <InputNumber
                        value={price}
                        prefix="$"
                        size="large"
                        className={cx('w-100')}
                        placeholder="Price"
                        onChange={(value) => setPrice(value)}
                        controls={false}
                    />
                </Col>
                <Col>
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
                <Col>
                    <Checkbox checked={featured} onChange={() => setFeatured(!featured)}>
                        Featured
                    </Checkbox>
                </Col>
            </Row>
        </Modal>
    );
};

export default TourForm;
