import styles from './RegisterPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import * as authService from '../../services/authService';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../../store';
const { Title, Paragraph, Text } = Typography;

const cx = classNames.bind(styles);

function RegisterPage() {
    const [state, dispatch] = useContext(StoreContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (state.userInfo) {
            navigate(config.routes.home);
        }
    }, []);
    const register = async (values) => {
        const results = await authService.register(values);
        if (results) {
            state.showToast('Thành công', results.message);

            navigate(config.routes.login);
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <Row
                    style={{
                        boxShadow: 'rgba(17, 12, 46, 0.15) -1px 5px 20px 0px',
                        position: 'relative',
                        borderRadius: 10,
                    }}
                >
                    <Col xs={0} md={11}>
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
                            <Title level={1} className={cx('form-title')}>
                                Tạo tài khoản
                            </Title>
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
                            <Title level={3} className={cx('option-title')}>
                                Đã có tài khoản?{' '}
                                <Text>
                                    <Link to={config.routes.login}>Đăng nhập</Link>
                                </Text>
                            </Title>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default RegisterPage;
