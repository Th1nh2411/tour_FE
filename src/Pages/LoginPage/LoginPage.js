import styles from './LoginPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { useContext, useEffect, useState } from 'react';
import { Button, Col, Input, Row, Space, notification } from 'antd';
import { FaUser } from 'react-icons/fa';
import * as authService from '../../services/authService';
import { useNavigate } from 'react-router';
import config from '../../config';
import { StoreContext, actions } from '../../store';
import Cookies from 'js-cookie';
const cx = classNames.bind(styles);

function LoginPage() {
    const [state, dispatch] = useContext(StoreContext);
    const navigate = useNavigate();
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = async () => {
        const results = await authService.login(username, password);
        if (results.token) {
            dispatch(actions.setUserInfo(results.data));
            Cookies.set('userInfo', JSON.stringify(results.data));
            Cookies.set('accessToken', results.token);
            const toast = state.showToast('Success', 'Đăng nhập thành công', 'success');
            navigate(config.routes.home);
        } else {
            const toast = state.showToast('Fail', results.message, 'error');
            setEmail('');
            setPassword('');
        }
    };
    return (
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
                        <h1 className={cx('form-title')}>Login</h1>
                        <Input
                            value={username}
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
                        <Button onClick={() => login()} type="ghost" size="large" className={cx('login-btn')}>
                            Login
                        </Button>
                        <h3 className={cx('option-title')}>
                            Don't have an account?<span> Create</span>
                        </h3>
                        <div className={cx('form-icon')}>
                            <FaUser />
                        </div>
                    </Space>
                </Col>
            </Row>
        </div>
    );
}

export default LoginPage;
