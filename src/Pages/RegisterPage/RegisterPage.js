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
                    <Col xs={0} md={12}>
                        <Image
                            className={cx('bg-img')}
                            src="https://doan-eta.vercel.app/static/media/login.0ef8aace597cf40e2588.png"
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <div className={cx('form')}>
                            <h1 className={cx('form-title')}>Register</h1>
                            <Form
                                labelCol={{
                                    span: 8,
                                    style: { fontWeight: 600 },
                                }}
                                size="large"
                                onFinish={register}
                            >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Username" />
                                </Form.Item>
                                <Form.Item
                                    label="Full Name"
                                    name="fullName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your full name!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Full Name" />
                                </Form.Item>
                                <Form.Item
                                    label="Phone"
                                    name="phoneNumber"
                                    rules={[
                                        {
                                            required: true,
                                            pattern: /^\d{10}$/,
                                            message: 'Please input valid phone number!',
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
                                            message: 'Please input valid email!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        {
                                            pattern: /^(\d{9,}|)$/,
                                            message: 'Your password has at least 9 digits!',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Password" />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        // onClick={() => register()}
                                        type="ghost"
                                        className={cx('login-btn')}
                                        htmlType="submit"
                                    >
                                        Create account
                                    </Button>
                                </Form.Item>
                            </Form>
                            <h3 className={cx('option-title')}>
                                Already have an account?{' '}
                                <span>
                                    <Link to={config.routes.login}>Login</Link>
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
