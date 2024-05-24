import PropTypes from 'prop-types';
import styles from './ProfilePage.module.scss';
import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import * as profileService from '../../services/profileService';
import { Button, Checkbox, Col, Form, Input, InputNumber, Modal, Row, Space, Typography, Upload, message } from 'antd';
import { StoreContext, actions } from '../../store';
const cx = classNames.bind(styles);
const { Title, Paragraph, Text } = Typography;

const ChangePwForm = ({ showForm, onClose = () => {} }) => {
    const [state, dispatch] = useContext(StoreContext);
    const userInfo = state.userInfo;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const editProfile = async (values) => {
        setLoading(true);
        const results = await profileService.changePassword(values);
        setLoading(false);
        if (results && results.success) {
            state.showToast('Success', results.message);
            dispatch(actions.setUserInfo({ ...userInfo, ...values }));
            onClose(true);
        }
    };

    return (
        <Modal
            onCancel={() => {
                form.resetFields();
                onClose();
            }}
            title={<Title className={cx('text-center')}>Đổi mật khẩu</Title>}
            open={showForm}
            footer={null}
        >
            <Form form={form} onFinish={editProfile} layout="vertical" className={cx('mt-2')}>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu cũ!',
                        },
                    ]}
                    name="oldPassword"
                    label="Mật khẩu cũ"
                >
                    <Input type="password" size="large" placeholder="Mật khẩu cũ" />
                </Form.Item>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu mới!',
                        },
                        {
                            min: 9,
                            message: 'Mật khẩu phải dài hơn 9 ký tự!',
                        },
                    ]}
                    name="newPassword"
                    label="Mật khẩu mới"
                >
                    <Input type="password" size="large" placeholder="Mật khẩu mới" />
                </Form.Item>

                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập xác nhận mật khẩu!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Xác nhận mật khẩu không trùng!'));
                            },
                        }),
                    ]}
                    name="repeatPassword"
                    label="Xác nhận mật khẩu"
                >
                    <Input type="password" size="large" placeholder="Xác nhận mật khẩu" />
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

export default ChangePwForm;
