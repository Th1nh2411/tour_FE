import styles from './RegisterPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Space, notification } from 'antd';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import * as authService from '../../services/authService';

const cx = classNames.bind(styles);

function RegisterPage() {
    const navigate = useNavigate();
    const register = async (values) => {
        const results = await authService.register(values);
        if (results) {
            notification.open({
                message: 'Success',
                description: results.message,
                placement: 'bottomRight',
                type: 'success',
            });
            navigate(config.routes.login);
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <Row style={{ boxShadow: 'rgba(17, 12, 46, 0.15) -1px 5px 20px 0px', position: 'relative' }}>
                    <div className={cx('form-icon')}>
                        <FaUser />
                    </div>
                    <div xs={0} className={cx('sep')}></div>
                    <Col xs={0} md={11}>
                        <Image
                            className={cx('bg-img')}
                            src="https://doan-eta.vercel.app/static/media/login.0ef8aace597cf40e2588.png"
                        />
                    </Col>
                    <Col xs={24} md={13}>
                        <div className={cx('form')}>
                            <h1 className={cx('form-title')}>Đăng ký</h1>
                            <Form
                                labelCol={{
                                    span: 8,
                                    style: { fontWeight: 600 },
                                }}
                                size="large"
                                onFinish={register}
                            >
                                <Form.Item
                                    label="Tên tài khoản"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tên tài khoản!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Username" />
                                </Form.Item>
                                <Form.Item
                                    label="Tên đầy đủ"
                                    name="fullName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập đủ tên đầy đủ!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Full Name" />
                                </Form.Item>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="phoneNumber"
                                    rules={[
                                        {
                                            required: true,
                                            pattern: /^\d{10}$/,
                                            message: 'Vui lòng nhập số điện thoại hợp lệ!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Phone Number" />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            type: 'email',
                                            message: 'Vui lòng nhập tài khoản gmail hợp lệ!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu!',
                                        },
                                        {
                                            min: 9,
                                            message: 'Mật khẩu phải dài hơn 9 ký tự!',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Password" />
                                </Form.Item>
                                <Form.Item
                                    label="Xác nhận"
                                    name="confirm"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập xác nhận mật khẩu!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Xác nhận mật khẩu không trùng!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder="Confirm Password" />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        // onClick={() => register()}
                                        type="ghost"
                                        className={cx('login-btn')}
                                        htmlType="submit"
                                    >
                                        Tạo tài khoản
                                    </Button>
                                </Form.Item>
                            </Form>
                            <h3 className={cx('option-title')}>
                                Đã có tài khoản?{' '}
                                <span>
                                    <Link to={config.routes.login}>Đăng nhập</Link>
                                </span>
                            </h3>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default RegisterPage;
