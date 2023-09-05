import styles from './LoginPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Space, notification } from 'antd';
import { FaUser } from 'react-icons/fa';
import * as authService from '../../services/authService';
import { useNavigate } from 'react-router';
import config from '../../config';
import { StoreContext, actions } from '../../store';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
const cx = classNames.bind(styles);

function LoginPage() {
    const [state, dispatch] = useContext(StoreContext);
    const navigate = useNavigate();
    const [form] = useForm();
    const login = async (values) => {
        const results = await authService.login(values);
        if (results) {
            dispatch(actions.setUserInfo(results.data));
            Cookies.set('userInfo', JSON.stringify(results.data));
            notification.open({
                message: 'Success',
                description: 'Login Successful!',
                placement: 'bottomRight',
                type: 'success',
            });
            navigate(config.routes.home);
        } else {
            form.resetFields();
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Row style={{ boxShadow: '0 48px 100px 0 rgba(17, 12, 46, 0.15)', position: 'relative' }}>
                <div className={cx('form-icon')}>
                    <FaUser />
                </div>
                <div xs={0} className={cx('sep')}></div>
                <Col xs={0} md={11} style={{ textAlign: 'center' }}>
                    <Image
                        className={cx('bg-img')}
                        src="https://doan-eta.vercel.app/static/media/login.0ef8aace597cf40e2588.png"
                    />
                </Col>
                <Col xs={24} md={13}>
                    <div className={cx('form')}>
                        <h1 className={cx('form-title')}>Đăng nhập</h1>
                        <Form
                            form={form}
                            labelCol={{
                                span: 8,
                                style: { fontWeight: 600 },
                            }}
                            onFinish={login}
                            size="large"
                        >
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                                label="Username"
                                name="username"
                            >
                                <Input placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                label="Mật khẩu"
                                name="password"
                            >
                                <Input.Password placeholder="Password" />
                            </Form.Item>
                            <Button type="ghost" size="large" className={cx('login-btn')} htmlType="submit">
                                Đăng nhập
                            </Button>
                        </Form>
                        <h3 className={cx('option-title')}>
                            Chưa có tài khoản?{' '}
                            <span>
                                <Link to={config.routes.register}>Đăng ký</Link>
                            </span>
                        </h3>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default LoginPage;
