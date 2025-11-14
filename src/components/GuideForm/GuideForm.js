import styles from './GuideForm.module.scss';
import classNames from 'classnames/bind';

import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as guideService from '../../services/guideService';
import * as uploadService from '../../services/uploadService';
import {
    Button,
    Col,
    DatePicker,
    Flex,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Select,
    Space,
    Switch,
    Typography,
    Upload,
} from 'antd';
import { BsDashCircle, BsPlusCircle, BsUpload } from 'react-icons/bs';
import { StoreContext } from '../../store';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { range } from 'lodash-es';
import GUIDE_FORM_DATA from './data';
import { useNavigate } from 'react-router';
import config from '../../config';
const cx = classNames.bind(styles);
const { Title, Paragraph, Text } = Typography;

const GuideForm = ({ data, onClose = () => {} }) => {
    const [state, dispatch] = useContext(StoreContext);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const addGuide = async (values) => {
        setLoading(true);
        let res;
        if (values.photo) {
            res = await uploadService.uploadFile(values.photo.fileList[0].originFileObj);
        }
        const results = await guideService.createGuide({
            ...values,
            photo: res && res.url,
            languages: values.languages.join(', '),
        });
        setLoading(false);
        if (results) {
            state.showToast('Success', results.message);
            onClose(true);
        }
    };
    const editGuide = async (values) => {
        setLoading(true);
        let res;
        if (values.photo) {
            res = await uploadService.uploadFile(values.photo.fileList[0].originFileObj);
        }
        const results = await guideService.updateGuide(
            {
                ...values,
                photo: res && res.url,
                languages: values.languages.join(', '),
                // tourName: values.tourName !== data.tourName ? values.tourName : undefined,
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
        guideName: data && data.guideName,
        email: data && data.email,
        description: data && data.description,
        languages: data ? data.languages.split(', ') : [],
        phoneNumber: data && data.phoneNumber,
    };
    const languageOptions = GUIDE_FORM_DATA.languages.map((item) => ({
        label: item,
        value: item,
    }));
    return (
        <Modal
            // width={'auto'}
            style={{ margin: '30px 0' }}
            centered
            title={<Title className={cx('text-center')}>{data ? 'Chỉnh sửa chuyến đi' : 'Thêm chuyến đi'}</Title>}
            open
            onCancel={() => {
                form.setFieldsValue(['']);
                onClose();
            }}
            footer={false}
        >
            <Form
                onFinish={data ? editGuide : addGuide}
                initialValues={initFormValue}
                form={form}
                layout="vertical"
                className={cx('mt-1')}
            >
                <Form.Item
                    rules={[{ required: true, message: 'Vui lòng điền trường này' }]}
                    name="guideName"
                    label="Tên đầy đủ"
                    md={12}
                >
                    <Input size="large" className={cx('data-input')} placeholder="Nhập tên đầy đủ" />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
                    name="email"
                    label="Tài khoản email"
                    md={12}
                >
                    <Input size="large" className={cx('data-input')} placeholder="Nhập tài khoản email" />
                </Form.Item>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            pattern: /^\d{10}$/,
                            message: 'Vui lòng nhập số điện thoại hợp lệ!',
                        },
                    ]}
                    name="phoneNumber"
                    label="Số điện thoại"
                    md={12}
                >
                    <Input size="large" className={cx('data-input')} placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true, message: 'Vui lòng điền trường này' }]}
                    name="description"
                    label="Lời giới thiệu"
                    md={12}
                >
                    <TextArea size="large" className={cx('data-input')} placeholder="Nhập lời giới thiệu" />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true, message: 'Vui lòng điền trường này' }]}
                    name="languages"
                    label="Chọn ngôn ngữ thông thạo"
                    md={12}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Please select"
                        defaultValue={['a10', 'c12']}
                        options={languageOptions}
                    />
                </Form.Item>
                <Form.Item
                    rules={[{ required: !data, message: 'Vui lòng chọn trường này' }]}
                    name="photo"
                    label="Tải ảnh hướng dẫn viên"
                >
                    <Upload beforeUpload={() => false} accept="image/*" maxCount={1} className={cx('data-input')}>
                        <Button icon={<BsUpload />}>Upload image</Button>
                    </Upload>
                </Form.Item>
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

export default GuideForm;
