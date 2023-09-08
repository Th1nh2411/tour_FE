import PropTypes from 'prop-types';
import styles from './TourForm.module.scss';
import classNames from 'classnames/bind';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillExclamationCircle, AiFillInfoCircle } from 'react-icons/ai';
import { useContext, useEffect, useRef, useState } from 'react';
import * as tourService from '../../services/tourService';
import * as uploadService from '../../services/uploadService';
import { Button, Checkbox, Col, Form, Input, InputNumber, Modal, Row, Space, Upload, message } from 'antd';
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
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setAddress(data.address);
            setCity(data.city);
            setMaxGroupSize(data.maxGroupSize);
            setDistance(data.distance);
            setPrice(data.price);
            setDesc(data.desc);
            setFeatured(data.featured);
        } else {
            setTitle('');
            setAddress('');
            setCity('');
            setMaxGroupSize('');
            setDistance('');
            setPrice('');
            setDesc('');
            setFeatured(false);
        }
        setPhoto(null);
    }, [data]);
    const addTour = async () => {
        setLoading(true);
        const res = await uploadService.uploadFile(photo);
        const results = await tourService.addTour({
            title,
            address,
            city,
            maxGroupSize,
            distance,
            price,
            desc,
            featured,
            photo: res.url,
        });
        setLoading(false);
        if (results.success) {
            state.showToast('Success', results.message);
        } else {
            state.showToast('Thất bại', results.message, 'error');
        }
        onClose(true);
    };
    const editTour = async () => {
        setLoading(true);
        const res = await uploadService.uploadFile(photo);
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
                photo: res.url,
            },
            data._id,
        );
        setLoading(false);
        if (results.success) {
            state.showToast('Success', results.message);
        } else {
            state.showToast('Thất bại', results.message, 'error');
        }
        onClose(true);
    };
    const handleChangeUpload = (info) => {
        const { file, fileList } = info;
        if (fileList[0]) {
            setPhoto(fileList[0].originFileObj);
        } else {
            setPhoto(null);
        }
    };
    return (
        <Modal
            // width={'auto'}
            title={<h2 className={cx('text-center')}>{data ? 'Edit Tour' : 'Add Tour'}</h2>}
            open={showTourForm}
            okText="Confirm Edit"
            okButtonProps={{
                loading,
            }}
            onOk={data ? editTour : addTour}
            onCancel={onClose}
        >
            <Form layout="vertical" className={cx('mt-2')}>
                <Form.Item label="Address" md={12}>
                    <Input
                        size="large"
                        value={address}
                        className={cx('data-input')}
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Item>
                <Form.Item label="City" md={12}>
                    <Input
                        size="large"
                        value={city}
                        className={cx('data-input')}
                        placeholder="City"
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Item>

                <Form.Item label="Title" md={12}>
                    <Input
                        size="large"
                        value={title}
                        className={cx('data-input')}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Item>
                <Form.Item className={cx('data-input')} label="Description" md={12}>
                    <Input
                        size="large"
                        value={desc}
                        placeholder="Description"
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </Form.Item>
                <Space align="end">
                    <Form.Item label="Max People">
                        <InputNumber
                            value={maxGroupSize}
                            // className={cx('w-100')}
                            placeholder="Max People"
                            onChange={(value) => setMaxGroupSize(value)}
                        />
                    </Form.Item>
                    <Form.Item label="Distance">
                        <InputNumber
                            value={distance}
                            placeholder="Distance"
                            onChange={(value) => setDistance(value)}
                            controls={false}
                            addonAfter="km"
                        />
                    </Form.Item>
                    <Form.Item label="Price">
                        <InputNumber
                            value={price}
                            prefix="$"
                            // className={cx('w-100')}
                            placeholder="Price"
                            onChange={(value) => setPrice(value)}
                            controls={false}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox checked={featured} onChange={() => setFeatured(!featured)}>
                            Featured
                        </Checkbox>
                    </Form.Item>
                </Space>

                <Form.Item>
                    <Upload
                        fileList={photo && [photo]}
                        beforeUpload={() => false}
                        accept="image/*"
                        maxCount={1}
                        className={cx('data-input')}
                        onChange={handleChangeUpload}
                    >
                        <Button icon={<BsUpload />}>Upload image</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TourForm;
