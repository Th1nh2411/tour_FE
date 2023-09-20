import PropTypes from 'prop-types';
import styles from './TourForm.module.scss';
import classNames from 'classnames/bind';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillExclamationCircle, AiFillInfoCircle } from 'react-icons/ai';
import { useContext, useEffect, useRef, useState } from 'react';
import * as tourService from '../../services/tourService';
import * as categoryService from '../../services/categoryService';
import * as uploadService from '../../services/uploadService';
import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Modal,
    Row,
    Skeleton,
    Space,
    Switch,
    Upload,
    message,
} from 'antd';
import { BsUpload } from 'react-icons/bs';
import { StoreContext } from '../../store';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { range } from 'lodash-es';
const { RangePicker } = DatePicker;
const cx = classNames.bind(styles);

const TourForm = ({ data, onClose = () => {} }) => {
    const [state, dispatch] = useContext(StoreContext);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [allCategories, setAllCategories] = useState(false);

    const getCategories = async () => {
        const results = await categoryService.getAllCategory();

        if (results) {
            setAllCategories(results.data);
        }
    };
    useEffect(() => {
        getCategories();
    }, []);
    const addTour = async (values) => {
        setLoading(true);
        const res = await uploadService.uploadFile(values.photo);
        const results = await tourService.addTour({
            ...values,
            photo: res.url,
        });
        setLoading(false);
        if (results.success) {
            state.showToast('Success', results.message);
        }
        onClose(true);
    };
    const editTour = async (values) => {
        setLoading(true);
        const res = await uploadService.uploadFile(values.photo);
        const results = await tourService.editTour({
            ...values,
            photo: res.url,
        });
        setLoading(false);
        if (results.success) {
            state.showToast('Success', results.message);
        }
        onClose(true);
    };
    // const handleChangeUpload = (info) => {
    //     const { file, fileList } = info;
    //     if (fileList[0]) {
    //         setPhoto(fileList[0].originFileObj);
    //     } else {
    //         setPhoto(null);
    //     }
    // };

    const initFormValue = {
        tourName: data && data.tourName,
        address: data && data.address,
        description: data && data.description,
        discount: data && data.discount,
        price: data && data.price,
        featured: data && data.featured,
        status: data && data.status,
        duration: data && data.duration,
        maxSeats: data && data.maxSeats,
        date: data ? [dayjs(data.startDate), dayjs(data.endDate)] : [dayjs().add(1, 'day').hour(5).minute(0)],
    };
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };
    const disabledTime = (current) => ({
        disabledHours: () => {
            console.log(current);
            return current && current.format('DD/MM/YYYY') === dayjs().format('DD/MM/YYYY') ? range(0, 24) : [];
        },
    });
    console.log(initFormValue);
    return (
        <Modal
            // width={'auto'}
            centered
            title={<h2 className={cx('text-center')}>{data ? 'Edit Tour' : 'Add Tour'}</h2>}
            open
            okText="Confirm Edit"
            okButtonProps={{
                loading,
            }}
            onOk={data ? editTour : addTour}
            onCancel={() => {
                form.setFieldsValue(['']);
                onClose();
            }}
        >
            <Form initialValues={initFormValue} form={form} layout="vertical" className={cx('mt-1')}>
                <Form.Item name="tourName" label="Tên chuyến đi" md={12}>
                    <Input size="large" className={cx('data-input')} placeholder="Nhập tên chuyến đi" />
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ chuyến đi" md={12}>
                    <Input size="large" className={cx('data-input')} placeholder="Nhập địa chỉ" />
                </Form.Item>
                <Form.Item name="description" label="Mô tả chuyến đi" md={12}>
                    <TextArea size="large" className={cx('data-input')} placeholder="Nhập mô tả chuyến đi" />
                </Form.Item>

                <Space size={'middle'}>
                    <Form.Item name="maxSeats" label="Số vé">
                        <InputNumber
                            min={0}
                            style={{ width: 60 }}
                            // className={cx('w-100')}
                            placeholder="Số vé"
                            controls={false}
                        />
                    </Form.Item>
                    <Form.Item name="price" label="Giá vé">
                        <InputNumber
                            min={0}
                            // className={cx('w-100')}
                            placeholder="Giá vé"
                            controls={false}
                            addonAfter="VNĐ"
                            formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    </Form.Item>
                    <Form.Item name="discount" label="Khuyến mãi">
                        <InputNumber
                            min={0}
                            style={{ width: 90 }}
                            placeholder="Khuyến mãi"
                            controls={false}
                            addonAfter="%"
                        />
                    </Form.Item>

                    <Form.Item valuePropName="checked" name="featured" label="Featured">
                        <Switch />
                    </Form.Item>
                </Space>
                <Space size={'middle'}>
                    <Form.Item name="date" label="Thời gian khởi hành và kết thúc">
                        <RangePicker
                            disabledDate={disabledDate}
                            disabledTime={disabledTime}
                            size="large"
                            showTime={{
                                format: 'HH:mm',
                            }}
                            format="DD-MM-YYYY HH:mm"
                        />
                    </Form.Item>
                    <Form.Item valuePropName="checked" name="status" label="Status">
                        <Switch />
                    </Form.Item>
                </Space>
                <Form.Item>
                    <Upload accept="image/*" maxCount={1} className={cx('data-input')}>
                        <Button icon={<BsUpload />}>Upload image</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TourForm;
