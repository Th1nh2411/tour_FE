import styles from './LoginPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Space, Typography, notification } from 'antd';
import * as authService from '../../services/authService';
import { useNavigate } from 'react-router';
import config from '../../config';
import { StoreContext, actions } from '../../store';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
const { Title, Paragraph, Text } = Typography;

function ForgotPw({ open, onCloseModal = () => {} }) {
    const [state, dispatch] = useContext(StoreContext);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [username, setUsername] = useState('');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState();

    const sendOTP = async () => {
        setLoading(true);
        const results = await authService.sendOTPForgotPw({ username });
        if (results) {
            state.showToast('Thành công', results.message);
            setStep(2);
        }
        setLoading(false);
    };
    const confirmOTP = async (values) => {
        setLoading(true);
        const results = await authService.confirmOTPForgotPw({ username, ...values });
        if (results) {
            state.showToast('Thành công', results.message);
            setStep(3);
        }
        setLoading(false);
    };
    const changePw = async (values) => {
        setLoading(true);
        const results = await authService.changeForgotPw({ username, ...values });
        if (results) {
            state.showToast('Thành công', results.message);
            form.resetFields();
            setStep(1);
            onCloseModal();
        }
        setLoading(false);
    };
    return (
        <Modal
            width={'auto'}
            centered
            title={
                <Title level={3} style={{ textAlign: 'center' }}>
                    Quên mật khẩu
                </Title>
            }
            open={open}
            footer={null}
            closable={false}
        >
            <Form
                form={form}
                labelCol={{
                    span: 10,
                    style: { fontWeight: 600 },
                }}
                size="large"
                onFinish={step === 1 ? sendOTP : step === 2 ? confirmOTP : changePw}
            >
                {step === 1 ? (
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập username!',
                            },
                        ]}
                        name="username"
                        label="Nhập Username"
                    >
                        <Input onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>
                ) : step === 2 ? (
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mã xác minh!',
                            },
                        ]}
                        name="verifyID"
                        label="Mã xác minh"
                    >
                        <Input />
                    </Form.Item>
                ) : (
                    <>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu mới!',
                                },
                                {
                                    min: 6,
                                    message: 'Mật khẩu phải dài hơn 9 ký tự!',
                                },
                            ]}
                            name="newPassword"
                            label="Mật khẩu mới"
                        >
                            <Input type="password" />
                        </Form.Item>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập lại mật khẩu!',
                                },
                            ]}
                            name="repeatPassword"
                            label="Xác nhận mật khẩu"
                        >
                            <Input type="password" />
                        </Form.Item>
                    </>
                )}
                <Space className={cx('content-end', 'mt-4')}>
                    <Button
                        onClick={() => {
                            form.resetFields();
                            setStep(1);
                            onCloseModal();
                        }}
                        size="middle"
                    >
                        Huỷ bỏ
                    </Button>
                    <Button loading={loading} size="middle" type="primary" htmlType="submit">
                        {step === 1 ? 'Gửi mã xác nhận' : step === 2 ? 'Xác nhận' : 'Đổi mật khẩu'}
                    </Button>
                </Space>
            </Form>
        </Modal>
    );
}

export default ForgotPw;
