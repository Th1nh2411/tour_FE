import styles from './ProfilePage.module.scss';
import classNames from 'classnames/bind';
import { BsFillClipboard2Fill, BsFillPhoneFill, BsPersonCircle, BsTicket } from 'react-icons/bs';
import { Alert, Badge, Col, Row, Space } from 'antd';
import { useContext, useEffect, useMemo, useState } from 'react';
import * as bookingService from '../../services/bookingService';
import { StoreContext, actions } from '../../store';
import { priceFormat } from '../../utils/format';
import { TbMoodSadSquint } from 'react-icons/tb';
import Image from '../../components/Image';
import dayjs from 'dayjs';
import { MdEdit, MdLock } from 'react-icons/md';
import { Button } from 'antd';
import BookingDetail from '../../components/BookingDetail/BookingDetail';
import ProfileForm from './ProfileForm';
import ChangePwForm from './ChangePwForm';
const cx = classNames.bind(styles);

function ProfilePage() {
    const [listBooking, setListBooking] = useState([]);
    const [detailBooking, setDetailBooking] = useState();
    const [showEditProfile, setShowEditProfile] = useState();
    const [showChangePw, setShowChangePw] = useState();
    const [loading, setLoading] = useState();
    const [state, dispatch] = useContext(StoreContext);
    const getTourReview = async () => {
        setLoading(true);
        const results = await bookingService.getAllBooking();
        setListBooking(results.data || []);
        setLoading(false);
    };
    useEffect(() => {
        getTourReview();
    }, []);
    return (
        <>
            <BookingDetail bookingDetail={detailBooking} onClose={() => setDetailBooking(false)} />
            <ProfileForm showForm={showEditProfile} onClose={() => setShowEditProfile(false)} />
            <ChangePwForm showForm={showChangePw} onClose={() => setShowChangePw(false)} />
            <div className={cx('wrapper')}>
                <Row gutter={[40, 40]}>
                    <Col xs={24} lg={12}>
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
                                    <h3 className={cx('profile-info')}>
                                        Địa chỉ: <span>{state.userInfo && state.userInfo.address}</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} lg={12}>
                        <div className={cx('card')}>
                            <div className={cx('title')}>
                                <BsFillClipboard2Fill className={cx('title-icon')} /> Lịch sử đặt chuyến
                            </div>
                            <div className={cx('body', 'invoice-list')}>
                                {listBooking && listBooking.length !== 0 ? (
                                    listBooking.map((item, index) => (
                                        <div key={index} className={cx('invoice-wrapper')}>
                                            <div className={cx('left-side')}>
                                                <Image
                                                    src="https://res.cloudinary.com/dgsumh8ih/image/upload/v1694075871/travel.png"
                                                    className={cx('invoice-img')}
                                                />
                                                <div className={cx('invoice-body')}>
                                                    <div className={cx('invoice-title')}>{item.tourInfo.tourName}</div>
                                                    <div className={cx('invoice-info')}>
                                                        Trạng thái :{' '}
                                                        <Badge
                                                            status={
                                                                item.status === -1
                                                                    ? 'default'
                                                                    : item.status === 0
                                                                    ? 'error'
                                                                    : item.status === 1
                                                                    ? 'processing'
                                                                    : 'success'
                                                            }
                                                            text={
                                                                item.status === -1
                                                                    ? 'Đã huỷ'
                                                                    : item.status === 0
                                                                    ? 'Chưa thanh toán'
                                                                    : item.status === 1
                                                                    ? 'Đã thanh toán cọc (20%)'
                                                                    : 'Đã thanh toán'
                                                            }
                                                        />
                                                    </div>
                                                    <div className={cx('invoice-info')}>
                                                        Khởi hành :{' '}
                                                        <span>{dayjs(item.startDate).format('DD/MM/YYYY')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button onClick={() => setDetailBooking(item)}>Chi tiết</Button>
                                        </div>
                                    ))
                                ) : (
                                    <Alert
                                        icon={<TbMoodSadSquint />}
                                        showIcon
                                        type="warning"
                                        message="Bạn chưa đặt chuyến đi nào cả"
                                    />
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default ProfilePage;
