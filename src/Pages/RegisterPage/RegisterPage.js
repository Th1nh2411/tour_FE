import styles from './RegisterPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { useContext, useEffect, useState } from 'react';
import { Button, Col, Input, Row, Space, notification } from 'antd';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import * as authService from '../../services/authService';

const cx = classNames.bind(styles);

function RegisterPage() {
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const register = async () => {
        const results = await authService.register(username, email, password);
        if (results.success) {
            showToast('Success', results.message, 'success');
            navigate(config.routes.login);
        } else {
            showToast('Fail', results.message, 'error');
            setUsername('');
            setEmail('');
            setPassword('');
        }
    };
    const showToast = (message = '', description = '', type = 'info') => {
        api[type]({
            message,
            description,
            placement: 'bottomRight',
        });
    };
    return (
        <>
            {contextHolder}
            <div className={cx('wrapper')}>
                <Row style={{ boxShadow: '0 48px 100px 0 rgba(17, 12, 46, 0.15)' }}>
                    <Col xs={0} md={12}>
                        <Image
                            className={cx('bg-img')}
                            src="https://doan-eta.vercel.app/static/media/login.0ef8aace597cf40e2588.png"
                        />
                    </Col>
                    <Col xs={24} md={12}>
                        <Space size={'middle'} direction="vertical" className={cx('form')}>
                            <h1 className={cx('form-title')}>Register</h1>
                            <Input
                                value={username}
                                size="large"
                                placeholder="Username"
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                            <Input
                                value={email}
                                size="large"
                                placeholder="Email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <Input.Password
                                value={password}
                                size="large"
                                placeholder="Password"
                                type=""
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <Button onClick={() => register()} type="ghost" size="large" className={cx('login-btn')}>
                                Register
                            </Button>
                            <h3 className={cx('option-title')}>
                                Already have an account?{' '}
                                <span>
                                    <Link to={config.routes.login}>Login</Link>
                                </span>
                            </h3>
                            <div className={cx('form-icon')}>
                                <FaUser />
                            </div>
                        </Space>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default RegisterPage;
