import PropTypes from 'prop-types';
import styles from './TourForm.module.scss';
import classNames from 'classnames/bind';

import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as tourService from '../../services/tourService';
import * as categoryService from '../../services/categoryService';
import * as uploadService from '../../services/uploadService';
import * as guideService from '../../services/guideService';
import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Select,
    Skeleton,
    Space,
    Switch,
    Typography,
    Upload,
    message,
} from 'antd';
import { BsDashCircle, BsPlusCircle, BsUpload } from 'react-icons/bs';
import { StoreContext } from '../../store';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { range } from 'lodash-es';
const { RangePicker } = DatePicker;
const { Title, Paragraph, Text } = Typography;
const cx = classNames.bind(styles);

const TourForm = ({ data, onClose = () => {} }) => {
    const [state, dispatch] = useContext(StoreContext);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [allCategories, setAllCategories] = useState(false);
    const [allGuides, setAllGuides] = useState(false);

    const getCategories = async () => {
        const results = await categoryService.getAllCategory();

        if (results) {
            setAllCategories(results.data);
        }
    };
    const getGuides = async () => {
        const results = await guideService.getAllGuide();

        if (results) {
            setAllGuides(results.data);
        }
    };
    useEffect(() => {
        getCategories();
        getGuides();
    }, []);
    const addTour = async (values) => {
        setLoading(true);
        let res;
        if (values.photo) {
            res = await uploadService.uploadFile(values.photo.fileList[0].originFileObj);
        }
        const results = await tourService.addTour({
            ...values,
            startDate: values.date?.[0],
            endDate: values.date?.[1],
            availableSeats: values.maxSeats,
            duration: values.date[1].diff(values.date[0], 'day'),
            photo: res && res.url,
        });
        setLoading(false);
        if (results) {
            state.showToast('Success', results.message);
            onClose(true);
        }
    };
    const editTour = async (values) => {
        console.log(values);
        setLoading(true);
        let res;
        if (values.photo) {
            res = await uploadService.uploadFile(values.photo.fileList[0].originFileObj);
        }
        const results = await tourService.editTour(
            {
                ...values,
                photo: res && res.url,
                startDate: values.date?.[0],
                endDate: values.date?.[1],
            },
            data._id,
        );
        setLoading(false);
        if (results) {
            state.showToast('Success', results.message);
            onClose(true);
        }
    };
    const initFormValue = {
        tourName: data && data.tourName,
        address: data && data.address,
        description: data && data.description,
        discount: data && data.discount,
        price: data && data.price,
        featured: data && data.featured,
        status: data && data.status,
        duration: data && data.duration,
        maxSeats: data && data.maxSeats,
        date:
            data && dayjs().isBefore(dayjs(data.endDate))
                ? [dayjs(data.startDate), dayjs(data.endDate)]
                : [dayjs().add(1, 'day').hour(5).minute(0)],
        category: data && data.category._id,
        guide: data && data.guide._id,
        itineraries: data && data.itineraries,
    };
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };
    const disabledTime = (current) => ({
        disabledHours: () => {
            return current && current.format('DD/MM/YYYY') === dayjs().format('DD/MM/YYYY') ? range(0, 24) : [];
        },
    });
    return (
        <Modal
            width={'auto'}
            style={{ margin: '30px 0' }}
            centered
            title={
                <Title level={2} className={cx('text-center')}>
                    {data ? 'Chỉnh sửa chuyến đi' : 'Thêm chuyến đi'}
                </Title>
            }
            open
            onCancel={() => {
                form.setFieldsValue(['']);
                onClose();
            }}
            footer={false}
        >
            <Form
                onFinish={data ? editTour : addTour}
                initialValues={initFormValue}
                form={form}
                layout="vertical"
                className={cx('mt-1')}
            >
                <Row gutter={[24, 0]}>
                    <Col md={12}>
                        <Form.Item
                            rules={[{ required: true, message: 'Vui lòng điền trường này' }]}
                            name="tourName"
                            label="Tên chuyến đi"
                            md={12}
                        >
                            <Input size="large" className={cx('data-input')} placeholder="Nhập tên chuyến đi" />
                        </Form.Item>
                        <Form.Item
                            rules={[{ required: true, message: 'Vui lòng điền trường này' }]}
                            name="address"
                            label="Địa chỉ chuyến đi"
                            md={12}
                        >
                            <Input size="large" className={cx('data-input')} placeholder="Nhập địa chỉ" />
                        </Form.Item>
                        <Form.Item
                            rules={[{ required: true, message: 'Vui lòng điền trường này' }]}
                            name="description"
                            label="Mô tả chuyến đi"
                            md={12}
                        >
                            <TextArea size="large" className={cx('data-input')} placeholder="Nhập mô tả chuyến đi" />
                        </Form.Item>

                        <Row gutter={[16, 0]}>
                            <Col xs={12} sm={4}>
                                <Form.Item
                                    rules={[{ required: true, message: 'Vui lòng điền trường này' }]}
                                    name="maxSeats"
                                    label="Số vé"
                                >
                                    <InputNumber min={0} className={cx('w-100')} placeholder="Số vé" controls={false} />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={10}>
                                <Form.Item
                                    rules={[{ required: true, message: 'Vui lòng điền trường này' }]}
                                    name="price"
                                    label="Giá vé"
                                >
                                    <InputNumber
                                        min={0}
                                        className={cx('w-100')}
                                        placeholder="Giá vé"
                                        controls={false}
                                        addonAfter="VNĐ"
                                        formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={6}>
                                <Form.Item
                                    rules={[{ required: true, message: 'Vui lòng điền trường này' }]}
                                    name="discount"
                                    label="Khuyến mãi"
                                >
                                    <InputNumber
                                        className={cx('w-100')}
                                        min={0}
                                        placeholder="Khuyến mãi"
                                        controls={false}
                                        addonAfter="%"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={4}>
                                <Form.Item valuePropName="checked" name="featured" label="Featured">
                                    <Switch />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Space size={'middle'}>
                            <Form.Item
                                rules={[{ required: true, message: 'Vui lòng chọn trường này' }]}
                                name="date"
                                label="Thời gian khởi hành và kết thúc"
                            >
                                <RangePicker
                                    disabledDate={disabledDate}
                                    disabledTime={disabledTime}
                                    size="large"
                                    showTime={{
                                        format: 'HH:mm',
                                    }}
                                    format="DD-MM-YYYY HH:mm"
                                />
                            </Form.Item>
                            <Form.Item valuePropName="checked" name="status" label="Status">
                                <Switch />
                            </Form.Item>
                        </Space>
                    </Col>
                    <Col md={12}>
                        <Row gutter={[16, 0]}>
                            <Col>
                                <Form.Item
                                    rules={[{ required: true, message: 'Vui lòng chọn trường này' }]}
                                    style={{ flex: 1 }}
                                    name="category"
                                    label="Chọn kiểu du lịch"
                                >
                                    <Select
                                        size="large"
                                        className={cx('w-100')}
                                        placeholder="Chọn kiểu du lịch"
                                        options={
                                            allCategories &&
                                            allCategories.map((item) => ({
                                                value: item._id,
                                                label: item.categoryName,
                                            }))
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item
                                    rules={[{ required: true, message: 'Vui lòng chọn trường này' }]}
                                    style={{ flex: 1 }}
                                    name="guide"
                                    label="Chọn hướng dẫn viên - Ngôn ngữ thông thạo"
                                >
                                    <Select
                                        size="large"
                                        className={cx('w-100')}
                                        placeholder="Chọn hướng dẫn viên"
                                        options={
                                            allGuides &&
                                            allGuides.map((item) => ({
                                                value: item._id,
                                                label: (
                                                    <div>
                                                        <Text style={{ fontSize: 16 }}>{item.guideName} - </Text>
                                                        <Text type="secondary">{item.languages}</Text>
                                                    </div>
                                                ),
                                            }))
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label={'Hành trình chuyến đi'}>
                            <Form.List
                                name="itineraries"
                                rules={[
                                    {
                                        validator: async (_, itineraries) => {
                                            if (!itineraries || itineraries.length < 1) {
                                                return Promise.reject(new Error('Phải có ít nhất 1 trường'));
                                            }
                                        },
                                    },
                                ]}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <Form.Item
                                                // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                                required={false}
                                                key={field.key}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: 'Vui lòng nhập trường này hoặc xoá nó đi',
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input
                                                        size="large"
                                                        placeholder="Hành trình"
                                                        style={{
                                                            width: '85%',
                                                        }}
                                                    />
                                                </Form.Item>
                                                {fields.length > 1 ? (
                                                    <BsDashCircle
                                                        className={cx('dynamic-delete-button')}
                                                        onClick={() => remove(field.name)}
                                                    />
                                                ) : null}
                                            </Form.Item>
                                        ))}
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            style={{
                                                width: '60%',
                                            }}
                                            icon={<BsPlusCircle />}
                                        >
                                            Thêm hành trình
                                        </Button>

                                        <Form.ErrorList errors={errors} />
                                    </>
                                )}
                            </Form.List>
                        </Form.Item>
                        <Form.Item
                            rules={[{ required: !data, message: 'Vui lòng chọn trường này' }]}
                            name="photo"
                            label="Tải ảnh chuyến đi"
                        >
                            <Upload
                                beforeUpload={() => false}
                                accept="image/*"
                                maxCount={1}
                                className={cx('data-input')}
                            >
                                <Button icon={<BsUpload />}>Upload image</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Space className={cx('content-end')}>
                    <Button
                        onClick={() => {
                            form.setFieldsValue(['']);
                            onClose();
                        }}
                        size="large"
                    >
                        Huỷ bỏ
                    </Button>
                    <Button loading={loading} size="large" type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </Space>
            </Form>
        </Modal>
    );
};

export default TourForm;
