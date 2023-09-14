import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useContext, useEffect, useRef, useState } from 'react';
import styles from './BookingDetail.module.scss';
import { redirect, useNavigate } from 'react-router';
import { StoreContext } from '../../store';
import { Badge, Button, Descriptions, Divider, Drawer, Popconfirm, Space } from 'antd';
import * as bookingService from '../../services/bookingService';
import dayjs from 'dayjs';
import { priceFormat } from '../../utils/format';

const cx = classNames.bind(styles);

function BookingDetail({ className, bookingDetail, onClose = () => {} }) {
    const [state, dispatch] = useContext(StoreContext);
    const [loading, setLoading] = useState({});

    const payment = async (flag) => {
        setLoading({ ...loading, payment1: flag === 1, payment2: flag === 2 });
        const results = await bookingService.vnpayPayment({ id_order: bookingDetail._id, flag });
        if (results) {
            window.location.replace(results.data);
        }
        setLoading({});
        onClose(true);
    };
    const cancelBooking = async () => {
        setLoading({ ...loading, cancel: true });
        const results = await bookingService.cancelBooking(bookingDetail._id);
        if (results) {
            state.showToast('Thành công', 'Huỷ đơn thành công');
        }
        setLoading({});
        onClose(true);
    };
    const userInfo = [
        {
            key: '1',
            label: 'Tên đầy đủ',
            children: bookingDetail && bookingDetail.userInfo.fullName,
        },
        {
            key: '2',
            label: 'Số điện thoại',
            children: bookingDetail && bookingDetail.userInfo.phoneNumber,
        },
        {
            key: '3',
            label: 'Tài khoản gmail',
            children: bookingDetail && bookingDetail.userInfo.email,
        },
    ];
    const tourInfo = [
        {
            key: '1',
            label: 'Tên chuyến',
            children: bookingDetail && bookingDetail.tourInfo.tourName,
        },
        {
            key: '2',
            label: 'Địa điểm',
            children: bookingDetail && bookingDetail.tourInfo.address,
        },
        {
            key: '3',
            label: 'Mô tả',
            children: bookingDetail && bookingDetail.tourInfo.description,
        },
        {
            key: '4',
            label: 'Hành trình',
            children: bookingDetail && (
                <div>
                    {bookingDetail.tourInfo.itineraries.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
            ),
        },
    ];
    const bookingInfo = [
        {
            key: '1',
            label: 'Ngày khởi hành',
            children: bookingDetail && dayjs(bookingDetail.startDate).format('DD/MM/YYYY'),
        },
        {
            key: '2',
            label: 'Ngày kết thúc',
            children: bookingDetail && dayjs(bookingDetail.endDate).format('DD/MM/YYYY'),
        },
        {
            key: '3',
            label: 'Số vé đặt',
            children: bookingDetail && bookingDetail.guestSize,
        },
        {
            key: '4',
            label: 'Tổng tiền',
            children: bookingDetail && priceFormat(bookingDetail.total) + 'đ',
        },
        {
            key: '5',
            label: 'Trạng thái',
            children: bookingDetail && (
                <Badge
                    status={
                        bookingDetail.status === -1
                            ? 'default'
                            : bookingDetail.status === 0
                            ? 'error'
                            : bookingDetail.status === 1
                            ? 'processing'
                            : 'success'
                    }
                    text={
                        bookingDetail.status === -1
                            ? 'Đã huỷ'
                            : bookingDetail.status === 0
                            ? 'Chưa thanh toán'
                            : bookingDetail.status === 1
                            ? 'Đã thanh toán cọc (20%)'
                            : 'Đã thanh toán'
                    }
                />
            ),
        },
    ];
    const actions = bookingDetail && bookingDetail.status !== -1 && (
        <Space className={cx('content-end')}>
            <Popconfirm
                title="Delete the task"
                description="Bạn chắc chắn huỷ chuyến này?"
                onConfirm={cancelBooking}
                okButtonProps={{ loading: loading.cancel }}
                okText="Huỷ chuyến"
                cancelText="Quay lại"
            >
                <Button danger>Huỷ đơn</Button>
            </Popconfirm>

            <Button
                disabled={bookingDetail.status >= 1}
                loading={loading.payment1}
                onClick={() => payment(1)}
                type="primary"
                ghost
            >
                Thanh toán cọc (20%)
            </Button>
            <Button
                disabled={bookingDetail.status === 2}
                loading={loading.payment2}
                onClick={() => payment(2)}
                type="primary"
            >
                Thanh toán toàn bộ
            </Button>
        </Space>
    );
    return (
        <Drawer
            width={700}
            title={<p style={{ fontSize: 22 }}>Chi tiết chuyến đi</p>}
            onClose={onClose}
            open={bookingDetail}
            className={cx('wrapper', className)}
            footer={actions}
        >
            <Descriptions
                size="small"
                column={2}
                items={userInfo}
                title={<p style={{ fontSize: 18 }}>Thông tin khách hàng</p>}
            />
            <Divider />
            <Descriptions
                size="small"
                column={2}
                items={tourInfo}
                title={<p style={{ fontSize: 18 }}>Thông tin chuyến đi</p>}
            />
            <Divider />
            <Descriptions
                size="small"
                column={2}
                items={bookingInfo}
                title={<p style={{ fontSize: 18 }}>Thông tin đặt chuyến</p>}
            />
        </Drawer>
    );
}

export default BookingDetail;
