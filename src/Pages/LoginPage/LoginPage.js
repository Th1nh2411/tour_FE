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
import { useForm } from 'antd/es/form/Form';
import ForgotPw from './ForgotPw';
const { Title, Paragraph, Text } = Typography;
const cx = classNames.bind(styles);

function LoginPage() {
    const [state, dispatch] = useContext(StoreContext);
    const navigate = useNavigate();
    const [form] = useForm();
    useEffect(() => {
        if (state.userInfo) {
            navigate(config.routes.home);
        }
    }, []);
    const [showForgot, setShowForgot] = useState(false);
    const login = async (values) => {
        const results = await authService.login(values);
        if (results) {
            dispatch(actions.setUserInfo(results.data));
            Cookies.set('userInfo', JSON.stringify(results.data));

            state.showToast('Thành công', 'Đăng nhập thành công!');
            const checkPayment = await state.getUnpaidBooking();
            navigate(config.routes.home);
        } else {
            dispatch(actions.setUnpaidBooking(null));
        }
    };
    return (
        <div className={cx('wrapper')}>
            <ForgotPw open={showForgot} onCloseModal={() => setShowForgot(false)} />
            <Row
                style={{
                    boxShadow: 'var(--box-shadow-color) -1px 5px 20px 0px',
                    position: 'relative',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                }}
            >
                <Col xs={0} md={11} style={{ textAlign: 'center' }}>
                    <Image
                        className={cx('bg-img')}
                        src="https://res.cloudinary.com/dgsumh8ih/image/upload/v1694512385/auth.png"
                    />
                </Col>
                <Col xs={24} md={13}>
                    <div className={cx('form')}>
                        <div style={{ textAlign: 'end' }}>
                            <Image
                                src="https://res.cloudinary.com/dgsumh8ih/image/upload/v1693657591/logoFull.png"
                                alt="logo"
                                className={cx('form-logo')}
                            />
                        </div>
                        <Title level={2} className={cx('form-title', 'text-center')}>
                            Đăng nhập
                        </Title>
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
                            <Title level={3} onClick={() => setShowForgot(true)} className={cx('option-title')}>
                                <Text>Quên mật khẩu?</Text>
                            </Title>
                        </Form>
                        <Title level={5} className={cx('option-title')}>
                            Thành viên mới?{' '}
                            <Text>
                                <Link to={config.routes.register}>Đăng ký</Link>
                            </Text>
                        </Title>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default LoginPage;
