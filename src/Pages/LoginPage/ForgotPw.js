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
    const [username, setUsername] = useState('');
    const [verifyID, setVerifyID] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [step, setStep] = useState(1);

    const sendOTP = async () => {
        const results = await authService.sendOTPForgotPw({ username });
        if (results) {
            console.log(results);
            state.showToast('Thành công', results.message);
            setStep(2);
        }
    };
    const confirmOTP = async () => {
        const results = await authService.confirmOTPForgotPw({ username, verifyID });
        if (results) {
            console.log(results);
            state.showToast('Thành công', results.message);
            setStep(3);
        }
    };
    const changePw = async () => {
        const results = await authService.changeForgotPw({ username, newPassword, repeatPassword });
        if (results) {
            console.log(results);
            state.showToast('Thành công', results.message);
        }
    };
    return (
        <Modal
            width={'auto'}
            centered
            title={<h2 style={{ textAlign: 'center' }}>Quên mật khẩu</h2>}
            open={open}
            onCancel={() => {
                setStep(1);
                setUsername('');
                onCloseModal();
            }}
            okText={step === 1 ? 'Gửi mã xác nhận' : step === 2 ? 'Xác nhận' : 'Đổi mật khẩu'}
            cancelText="Huỷ bỏ"
            onOk={step === 1 ? sendOTP : step === 2 ? confirmOTP : changePw}
        >
            {step === 1 ? (
                <Form size="large">
                    <Form.Item name="username" label="Nhập Username">
                        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>
                </Form>
            ) : step === 2 ? (
                <Form size="large">
                    <Form.Item name="verifyID" label="Nhập mã xác minh">
                        <Input value={verifyID} onChange={(e) => setVerifyID(e.target.value)} />
                    </Form.Item>
                </Form>
            ) : (
                <Form size="large">
                    <Form.Item name="newPassword" label="Nhập mật khẩu mới">
                        <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item name="repeatPassword" label="Nhập xác nhận mật khẩu">
                        <Input value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
}

export default ForgotPw;
