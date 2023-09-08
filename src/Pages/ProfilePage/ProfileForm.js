import PropTypes from 'prop-types';
import styles from './ProfilePage.module.scss';
import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import * as profileService from '../../services/profileService';
import { Button, Checkbox, Col, Form, Input, InputNumber, Modal, Row, Space, Upload, message } from 'antd';
import { BsUpload } from 'react-icons/bs';
import { StoreContext, actions } from '../../store';
const cx = classNames.bind(styles);

const ProfileForm = ({ showForm, onClose = () => {} }) => {
    const [state, dispatch] = useContext(StoreContext);
    const userInfo = state.userInfo;
    const [loading, setLoading] = useState(false);

    const editProfile = async (values) => {
        setLoading(true);
        const results = await profileService.editProfile(values);
        setLoading(false);
        if (results && results.success) {
            state.showToast('Success', results.message);
            dispatch(actions.setUserInfo({ ...userInfo, ...values }));
            onClose(true);
        }
    };

    return (
        <Modal
            onCancel={onClose}
            title={<h2 className={cx('text-center')}>Sửa thông tin cá nhân</h2>}
            open={showForm}
            footer={null}
        >
            <Form
                onFinish={editProfile}
                initialValues={{
                    fullName: userInfo.fullName,
                    phoneNumber: userInfo.phoneNumber,
                    email: userInfo.email,
                    address: userInfo.address,
                }}
                layout="vertical"
                className={cx('mt-2')}
            >
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Tên người dùng không được để trống!',
                        },
                    ]}
                    name="fullName"
                    label="Tên người dùng"
                >
                    <Input size="large" placeholder="Tên người dùng" />
                </Form.Item>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Số điện thoại không được để trống!',
                        },
                    ]}
                    name="phoneNumber"
                    label="Số điện thoại"
                >
                    <Input size="large" placeholder="Số điện thoại" />
                </Form.Item>

                <Form.Item name="address" label="Địa chỉ">
                    <Input size="large" placeholder="Địa chỉ" />
                </Form.Item>
                <Space className={cx('content-end')}>
                    <Button onClick={onClose} size="large">
                        Huỷ bỏ
                    </Button>
                    <Button loading={loading} size="large" type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </Space>
            </Form>
        </Modal>
    );
};

export default ProfileForm;
