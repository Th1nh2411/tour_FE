import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useContext, useEffect, useRef, useState } from 'react';
import styles from './BookingDetail.module.scss';
import { redirect, useNavigate } from 'react-router';
import { StoreContext } from '../../store';
import {
    Alert,
    Badge,
    Button,
    Descriptions,
    Divider,
    Drawer,
    Form,
    Image,
    Popconfirm,
    Rate,
    Space,
    Typography,
    Upload,
} from 'antd';
import * as bookingService from '../../services/bookingService';
import * as reviewService from '../../services/reviewService';
import dayjs from 'dayjs';
import { priceFormat } from '../../utils/format';
import RefundPolicy from '../RefundPolicy/RefundPolicy';
import TextArea from 'antd/es/input/TextArea';
import { MdAddPhotoAlternate } from 'react-icons/md';
const { Title, Paragraph, Text } = Typography;

const cx = classNames.bind(styles);

function BookingDetail({ className, bookingDetail, onClose = () => {} }) {
    const [state, dispatch] = useContext(StoreContext);
    const [loading, setLoading] = useState({});
    const navigate = useNavigate();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => {};
        });
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const payment = async (flag) => {
        setLoading({ ...loading, payment1: flag === 1, payment2: flag === 2 });
        const results = await bookingService.vnpayPayment({ id_order: bookingDetail._id, flag });
        if (results) {
            window.open(results.data, '_blank').focus();
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
                        <Text style={{ display: 'block' }} key={index}>
                            {item}
                        </Text>
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
    const joinedTrip = dayjs().isAfter(dayjs(bookingDetail?.endDate)) && bookingDetail?.status === 2;
    const actions = bookingDetail?.status !== -1 && !joinedTrip && (
        <Space className={cx('content-end')}>
            <Popconfirm
                title="Huỷ chuyến"
                description="Bạn chắc chắn huỷ chuyến này?"
                onConfirm={cancelBooking}
                okButtonProps={{ loading: loading.cancel }}
                okText="Huỷ chuyến"
                cancelText="Quay lại"
            >
                <Button danger>Huỷ đơn</Button>
            </Popconfirm>

            <Button
                disabled={bookingDetail?.status >= 1} // has pay deposit or pay all
                loading={loading.payment1}
                onClick={() => payment(1)}
                type="primary"
                ghost
            >
                Thanh toán cọc (20%)
            </Button>
            <Button
                disabled={bookingDetail?.status === 2} // has pay pay all
                loading={loading.payment2}
                onClick={() => payment(2)}
                type="primary"
            >
                Thanh toán toàn bộ
            </Button>
        </Space>
    );
    const sendReview = async (values) => {
        setLoading(true);
        const results = await reviewService.createReview({ review: values.review }, bookingDetail._id);
        if (results) {
            state.showToast('Thành công', results.message);
        }
        setLoading(false);
    };
    return (
        <Drawer
            width={700}
            title={<Text style={{ fontSize: 22 }}>Chi tiết chuyến đi</Text>}
            onClose={onClose}
            open={bookingDetail}
            className={cx('wrapper', className, { darkBg: state.theme === 'dark' })}
            footer={actions}
            style={{
                position: 'relative',
                zIndex: 100,
                background: `url(${bookingDetail && bookingDetail.tourInfo.photo}) center / cover no-repeat`,
            }}
            extra={
                <Button type="primary" onClick={() => navigate(`/tour/${bookingDetail.tourInfo._id}`)}>
                    Đặt lại
                </Button>
            }
        >
            {joinedTrip && (
                <Form initialValues={{ rate: 5 }} onFinish={sendReview}>
                    <div className="d-flex" style={{ gap: 10 }}>
                        <Title level={4}>Nhận xét</Title>
                        <Form.Item style={{ margin: '0' }} name="rate">
                            <Rate allowHalf style={{ fontSize: 16 }} />
                        </Form.Item>
                    </div>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập nhận xét!',
                            },
                        ]}
                        name="review"
                    >
                        <TextArea
                            allowClear
                            placeholder="Chia sẻ cảm nhận của bạn về chuyến đi với mọi người nào!"
                        ></TextArea>
                    </Form.Item>
                    <div className={cx('align-center', 'content-end')} style={{ gap: 10 }}>
                        {previewImage && (
                            <Image
                                wrapperStyle={{
                                    display: 'none',
                                }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                        {fileList.length < 4 && (
                            <Upload
                                // action="http://localhost:3000/profile"
                                listType="picture-card"
                                accept="image/png, image/jpeg"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                <Button icon={<MdAddPhotoAlternate />}></Button>
                            </Upload>
                        )}
                        <Button htmlType="submit" type="primary">
                            Gửi nhận xét
                        </Button>
                    </div>
                    <Divider style={{ margin: '15px 0' }} />
                </Form>
            )}
            <Title level={4}>Thông tin khách hàng</Title>
            <Descriptions
                size="small"
                column={2}
                items={userInfo}
                // title={}
            />
            <Divider style={{ margin: '15px 0' }} />
            <Title level={4}>Thông tin chuyến đi</Title>
            <Descriptions size="small" column={1} bordered items={tourInfo} />
            <Divider style={{ margin: '15px 0' }} />
            <Title level={4}>Thông tin đặt vé</Title>
            <Descriptions size="small" column={2} bordered items={bookingInfo} />
            <Divider style={{ margin: '15px 0' }} />
            <Title level={4}>Chính sách huỷ vé</Title>
            <RefundPolicy />
        </Drawer>
    );
}

export default BookingDetail;
