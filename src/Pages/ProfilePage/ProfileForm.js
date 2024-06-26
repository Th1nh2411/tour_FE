import PropTypes from 'prop-types';
import styles from './ProfilePage.module.scss';
import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import * as profileService from '../../services/profileService';
import { Button, Checkbox, Col, Form, Input, InputNumber, Modal, Row, Space, Typography, Upload, message } from 'antd';
import { BsUpload } from 'react-icons/bs';
import { StoreContext, actions } from '../../store';
import Cookies from 'js-cookie';
const { Title, Paragraph, Text } = Typography;
const cx = classNames.bind(styles);

const ProfileForm = ({ showForm, onClose = () => {} }) => {
    const [state, dispatch] = useContext(StoreContext);
    const userInfo = state.userInfo;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const initFormValue = {
        fullName: userInfo && userInfo.fullName,
        phoneNumber: userInfo && userInfo.phoneNumber,
        email: userInfo && userInfo.email,
        address: userInfo && userInfo.address,
    };
    const editProfile = async (values) => {
        setLoading(true);
        const results = await profileService.editProfile({
            ...values,
            email: values.email !== userInfo.email ? values.email : undefined,
            phoneNumber: values.phoneNumber !== userInfo.phoneNumber ? values.phoneNumber : undefined,
        });
        setLoading(false);
        if (results) {
            state.showToast('Thành công', results.message);
            dispatch(
                actions.setUserInfo({
                    ...userInfo,
                    ...values,
                    email: userInfo.email,
                }),
            );
            onClose(true);
        }
    };

    return (
        <Modal
            onCancel={() => {
                form.resetFields();
                onClose();
            }}
            title={
                <Title level={2} className={cx('text-center')}>
                    Sửa thông tin cá nhân
                </Title>
            }
            open={showForm}
            footer={null}
        >
            <Form
                form={form}
                onFinish={editProfile}
                initialValues={initFormValue}
                layout="vertical"
                className={cx('mt-2')}
            >
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Tên người dùng không được để trống!',
                        },
                    ]}
                    name="fullName"
                    label="Tên người dùng"
                >
                    <Input size="large" placeholder="Tên người dùng" />
                </Form.Item>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Vui lòng nhập tài khoản gmail hợp lệ!',
                        },
                    ]}
                    name="email"
                    label="Tài khoản email"
                >
                    <Input size="large" placeholder="Số điện thoại" />
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
                >
                    <Input size="large" placeholder="Số điện thoại" />
                </Form.Item>

                <Form.Item name="address" label="Địa chỉ">
                    <Input size="large" placeholder="Địa chỉ" />
                </Form.Item>
                <Space className={cx('content-end')}>
                    <Button
                        onClick={() => {
                            form.resetFields();
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

export default ProfileForm;
