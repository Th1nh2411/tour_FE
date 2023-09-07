import styles from './PaymentPage.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { Col, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { StoreContext, actions } from '../../store';
const cx = classNames.bind(styles);

function PaymentPage() {
    const [orderType, setOrderType] = useState(1);
    const [menu, setMenu] = useState([]);
    const [state, dispatch] = useContext(StoreContext);

    return (
        <div className={cx('wrapper')}>
            <section className={cx('banner-section')}>
                <div className={cx('banner-content')}>
                    <div className={cx('banner-title')}>Payment Page</div>
                </div>
            </section>
        </div>
    );
}

export default PaymentPage;
