import classNames from 'classnames/bind';
import React from 'react';
import styles from './RefundPolicy.module.scss';
import { TbPlaneDeparture, TbTicket } from 'react-icons/tb';
const cx = classNames.bind(styles);

const RefundPolicy = () => {
    return (
        <div className={cx('refund-policy')}>
            <TbTicket className={cx('start-refund')} />
            <div className={cx('success-refund')}>
                <span className={cx('refund-timeline')}>Trước 1 tuần</span>
                <p className={cx('refund-value')}>Huỷ vé miễn phí</p>
            </div>
            <div className={cx('warning-refund')}>
                <p className={cx('refund-value')}>Phí huỷ vé : 100k</p>
                <span className={cx('refund-timeline')}>Trước 3 ngày</span>
            </div>
            <div className={cx('danger-refund')}>
                <p className={cx('refund-value')}>Không thể huỷ vé</p>
            </div>
            <TbPlaneDeparture className={cx('end-refund')} />
        </div>
    );
};

export default RefundPolicy;
