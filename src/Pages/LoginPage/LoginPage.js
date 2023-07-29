import styles from './LoginPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { useContext, useEffect, useState } from 'react';
import { Button, Col, Input, Row, Space } from 'antd';
import { FaUser } from 'react-icons/fa';
const cx = classNames.bind(styles);

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className={cx('wrapper')}>
            <Row style={{ boxShadow: '0 48px 100px 0 rgba(17, 12, 46, 0.15)' }}>
                <Col lg={12}>
                    <Image
                        className={cx('bg-img')}
                        src="https://doan-eta.vercel.app/static/media/login.0ef8aace597cf40e2588.png"
                    />
                </Col>
                <Col lg={12}>
                    <Space size={'middle'} direction="vertical" className={cx('form')}>
                        <h1 className={cx('form-title')}>Login</h1>
                        <Input
                            size="large"
                            placeholder="Email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <Input.Password
                            size="large"
                            placeholder="Password"
                            type=""
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <Button type="ghost" size="large" className={cx('login-btn')}>
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
