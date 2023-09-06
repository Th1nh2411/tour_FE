import styles from './ProfilePage.module.scss';
import classNames from 'classnames/bind';
import { BsFillClipboard2Fill, BsFillPhoneFill, BsPersonCircle, BsTicket } from 'react-icons/bs';
import { Col, Row, Space } from 'antd';
import { useContext, useEffect, useMemo, useState } from 'react';
import * as bookingService from '../../services/bookingService';
import { StoreContext, actions } from '../../store';
import { priceFormat } from '../../utils/format';
import { IoLocationSharp } from 'react-icons/io5';
import { AiOutlineRight } from 'react-icons/ai';
import Image from '../../components/Image';
import dayjs from 'dayjs';
import { MdEdit, MdLock } from 'react-icons/md';
import { Button } from 'antd';
const cx = classNames.bind(styles);

function ProfilePage() {
    const [listBooking, setListBooking] = useState([]);
    const [detailInvoice, setDetailInvoice] = useState();
    const [showEditProfile, setShowEditProfile] = useState();
    const [showChangePw, setShowChangePw] = useState();
    const [loading, setLoading] = useState();
    const [state, dispatch] = useContext(StoreContext);
    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col md={12}>
                    <div className={cx('card')}>
                        <div className={cx('title')}>
                            <BsPersonCircle className={cx('title-icon')} /> Thông tin cá nhân
                        </div>
                        <div className={cx('body')}>
                            <Image src={state.userInfo && state.userInfo.photo} className={cx('avatar')} />
                            <div className={cx('profile-wrapper')}>
                                <Space>
                                    <Button onClick={() => setShowEditProfile(true)} icon={<MdEdit />}>
                                        Chỉnh sửa
                                    </Button>
                                    <Button
                                        className={cx('ml-8')}
                                        onClick={() => setShowChangePw(true)}
                                        icon={<MdLock />}
                                    >
                                        Đổi mật khẩu
                                    </Button>
                                </Space>
                                <h3 className={cx('profile-info')}>
                                    Tên người dùng: <span>{state.userInfo && state.userInfo.fullName}</span>
                                </h3>
                                <h3 className={cx('profile-info')}>
                                    Số điện thoại: <span>{state.userInfo && state.userInfo.phoneNumber}</span>
                                </h3>
                                <h3 className={cx('profile-info')}>
                                    Tài khoản gmail: <span>{state.userInfo && state.userInfo.email}</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={12}>
                    <div className={cx('title')}>
                        <BsFillClipboard2Fill className={cx('title-icon')} /> Lịch sử đặt hàng
                    </div>
                    <div className={cx('body', 'invoice-list')}>
                        {listBooking &&
                            listBooking.map((item, index) => (
                                <div key={index} className={cx('invoice-wrapper')}>
                                    <div className={cx('left-side')}>
                                        <BsTicket className={cx('invoice-img')} />
                                        <div className={cx('invoice-body')}>
                                            <div className={cx('invoice-title')}>
                                                Đơn hàng đặt lúc {dayjs(item.date).format('HH:mm')} ngày{' '}
                                                {dayjs(item.date).format('DD/MM/YYYY')}
                                            </div>
                                            <div className={cx('invoice-info')}>
                                                Trạng thái :{' '}
                                                <span>
                                                    {item.status === 0
                                                        ? 'Chưa thanh toán'
                                                        : item.status === 1
                                                        ? 'Đang giao'
                                                        : 'Đã giao'}
                                                </span>
                                            </div>
                                            <div className={cx('invoice-info')}>
                                                Tổng tiền : <span>{priceFormat(item.shippingFee + item.total)}đ</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div onClick={() => setDetailInvoice(item.id)} className={cx('invoice-actions')}>
                                        Xem chi tiết
                                    </div>
                                </div>
                            ))}
                    </div>
                </Col>
            </Row>{' '}
        </div>
    );
}

export default ProfilePage;
