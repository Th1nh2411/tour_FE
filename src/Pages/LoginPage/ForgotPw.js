import styles from './LoginPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Space, notification } from 'antd';
import * as authService from '../../services/authService';
import { useNavigate } from 'react-router';
import config from '../../config';
import { StoreContext, actions } from '../../store';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
const cx = classNames.bind(styles);

function ForgotPw({ open, onCloseModal = () => {} }) {
    const [state, dispatch] = useContext(StoreContext);
    const navigate = useNavigate();
    const [form] = useForm();

    const [showForgot, setShowForgot] = useState(false);

    const sendOTP = async (values) => {
        const results = await authService.forgotPw(values);
        if (results) {
            dispatch(actions.setUserInfo(results.data));
            Cookies.set('userInfo', JSON.stringify(results.data));
            const checkPayment = await state.getUnpaidBooking();

            state.showToast('Thành công', 'Đăng nhập thành công!');
            navigate(config.routes.home);
        }
    };
    return (
        <Modal
            width={'auto'}
            centered
            title={<h2 style={{ textAlign: 'center' }}>Quên mật khẩu</h2>}
            open={open}
            onCancel={onCloseModal}
        >
            <Form>
                <Form.Item name="username" label="Nhập Username">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ForgotPw;
