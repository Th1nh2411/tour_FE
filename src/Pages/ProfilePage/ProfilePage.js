import styles from './ProfilePage.module.scss';
import classNames from 'classnames/bind';
import { BsCameraFill, BsFillClipboard2Fill, BsFillPhoneFill, BsPersonCircle, BsTicket } from 'react-icons/bs';
import { Alert, Badge, Col, Popconfirm, Row, Skeleton, Space, notification } from 'antd';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as bookingService from '../../services/bookingService';
import * as authService from '../../services/authService';
import { StoreContext, actions } from '../../store';
import { priceFormat } from '../../utils/format';
import { TbMoodSadSquint } from 'react-icons/tb';
import Image from '../../components/Image';
import dayjs from 'dayjs';
import { MdEdit, MdLock } from 'react-icons/md';
import { RiMailForbidFill } from 'react-icons/ri';
import { Button } from 'antd';
import BookingDetail from '../../components/BookingDetail/BookingDetail';
import ProfileForm from './ProfileForm';
import ChangePwForm from './ChangePwForm';
import { useSearchParams } from 'react-router-dom';
import CropperImage from '../../components/CropperImage';
const cx = classNames.bind(styles);

function ProfilePage() {
    const [listBooking, setListBooking] = useState([]);
    const [detailBooking, setDetailBooking] = useState();
    const [showEditProfile, setShowEditProfile] = useState();
    const [showChangePw, setShowChangePw] = useState();
    const [loading, setLoading] = useState();
    const [state, dispatch] = useContext(StoreContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const paymentStatus = searchParams.get('vnp_TransactionStatus');
    const query = Object.fromEntries(searchParams.entries());

    const uploadRef = useRef(null);
    const [avatarSrc, setAvatarSrc] = useState(null);
    const [showModalAvatar, setShowModalAvatar] = useState(false);

    const confirmPaymentInvoice = async () => {
        const results = await bookingService.vnpayReturn(query);
        if (results) {
            state.showToast('Thành công', results.message);
        }
        getAllBooking();
    };

    useEffect(() => {
        if (paymentStatus === '00') {
            confirmPaymentInvoice();
        } else if (paymentStatus === '02') {
            state.showToast('Đã huỷ thanh toán', null, 'info');
        }
    }, []);
    const getAllBooking = async () => {
        setLoading(true);
        const results = await bookingService.getAllBooking();
        if (results) {
            setListBooking(results.data || []);
        }
        setLoading(false);
    };
    useEffect(() => {
        getAllBooking();
    }, []);
    const handleImgChange = (e) => {
        setAvatarSrc(URL.createObjectURL(e.target.files[0]));
        e.target.value = '';
        setShowModalAvatar(true);
    };
    const handleInputClick = (e) => {
        e.preventDefault();
        uploadRef.current.click();
    };

    const sendMailActive = async () => {
        const results = await authService.sendMailActive();
        if (results) {
            state.showToast('Thành công', results.message);
        }
    };
    return (
        <>
            <CropperImage modalOpen={showModalAvatar} src={avatarSrc} onModalClose={() => setShowModalAvatar(false)} />
            <BookingDetail
                bookingDetail={detailBooking}
                onClose={(edited) => {
                    if (edited === true) {
                        getAllBooking();
                    }
                    setDetailBooking(false);
                }}
            />
            <ProfileForm showForm={showEditProfile} onClose={() => setShowEditProfile(false)} />
            <ChangePwForm showForm={showChangePw} onClose={() => setShowChangePw(false)} />
            <div className={cx('wrapper')}>
                <Row gutter={[40, 40]}>
                    <Col xs={24} lg={12}>
                        <div style={{ backgroundColor: '#718e9b' }} className={cx('card')}>
                            <div className={cx('title')}>
                                <BsPersonCircle className={cx('title-icon')} /> Thông tin cá nhân
                            </div>
                            <div className={cx('body')}>
                                <div className={cx('avatar-wrapper')}>
                                    <BsCameraFill onClick={handleInputClick} className={cx('camera-icon')} />
                                    <Image src={state.userInfo && state.userInfo.photo} className={cx('avatar')} />
                                    <input
                                        hidden
                                        type="file"
                                        accept="image/*"
                                        ref={uploadRef}
                                        onChange={handleImgChange}
                                    />
                                </div>
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
                                        Tài khoản gmail: <span>{state.userInfo && state.userInfo.email}</span>
                                    </h3>
                                    <h3 className={cx('profile-info')}>
                                        Số điện thoại: <span>{state.userInfo && state.userInfo.phoneNumber}</span>
                                    </h3>
                                    <h3 className={cx('profile-info')}>
                                        Địa chỉ: <span>{state.userInfo && state.userInfo.address}</span>
                                    </h3>
                                    {state.userInfo && !state.userInfo.isActive && (
                                        <Alert
                                            showIcon
                                            icon={<RiMailForbidFill />}
                                            message={
                                                <p>
                                                    Tài khoản email của bạn chưa được{' '}
                                                    <Popconfirm
                                                        title="Gửi mail kích hoạt tài khoản"
                                                        onConfirm={sendMailActive}
                                                        okText="Gửi mail"
                                                        cancelText="Quay lại"
                                                    >
                                                        <span className={cx('active-btn')}>kích hoạt</span>
                                                    </Popconfirm>
                                                </p>
                                            }
                                            type="error"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} lg={12}>
                        <div className={cx('card')}>
                            <div className={cx('title')}>
                                <BsFillClipboard2Fill className={cx('title-icon')} /> Lịch sử đặt chuyến
                            </div>
                            <Skeleton loading={loading}>
                                <div className={cx('body', 'invoice-list')}>
                                    {listBooking && listBooking.length !== 0 ? (
                                        listBooking.map((item, index) => (
                                            <div key={index} className={cx('invoice-wrapper')}>
                                                <div className={cx('left-side')}>
                                                    <Image src={item.tourInfo.photo} className={cx('invoice-img')} />
                                                    <div className={cx('invoice-body')}>
                                                        <div className={cx('invoice-title')}>
                                                            {item.tourInfo.tourName}
                                                        </div>
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
                            </Skeleton>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default ProfilePage;
