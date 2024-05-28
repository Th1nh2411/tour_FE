import classNames from 'classnames/bind';
import React from 'react';
import styles from './RefundPolicy.module.scss';
import { TbPlaneDeparture, TbTicket } from 'react-icons/tb';
import { Typography } from 'antd';
const cx = classNames.bind(styles);
const { Title, Paragraph, Text } = Typography;

const RefundPolicy = () => {
    return (
        <div className={cx('refund-policy')}>
            <TbTicket className={cx('start-refund')} />
            <div className={cx('success-refund')}>
                <Text className={cx('refund-timeline')}>Trước 1 tuần</Text>
                <Text className={cx('refund-value')}>Huỷ vé miễn phí</Text>
            </div>
            <div className={cx('warning-refund')}>
                <Text className={cx('refund-value')}>Phí huỷ vé: 20%</Text>
                <Text className={cx('refund-timeline')}>Trước 3 ngày</Text>
            </div>
            <div className={cx('danger-refund')}>
                <Text className={cx('refund-value')}>Không thể huỷ vé</Text>
            </div>
            <TbPlaneDeparture className={cx('end-refund')} />
        </div>
    );
};

export default RefundPolicy;
