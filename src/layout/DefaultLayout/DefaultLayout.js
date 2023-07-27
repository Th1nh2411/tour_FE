import Header from '../components/Header';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { useContext, useEffect, useMemo, useState } from 'react';
import { HiShoppingCart } from 'react-icons/hi';
import { BiArrowToTop } from 'react-icons/bi';
import LocalStorageManager from '../../utils/LocalStorageManager';
import { StoreContext, actions } from '../../store';
import Toast from '../../components/Toast/Toast';
import config from '../../config';
import { useLocation } from 'react-router';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const localStorageManager = LocalStorageManager.getInstance();
    const [state, dispatch] = useContext(StoreContext);
    const currentPath = useLocation().pathname;

    return (
        <>
            <div className={cx('wrapper')}>
                <Header />
                <div className={cx('container')}>
                    <div className={cx('content')}>{children}</div>
                </div>
                <Footer />
            </div>

            {state.toast.show && (
                <Toast
                    content={state.toast.content}
                    title={state.toast.title}
                    type={state.toast.type}
                    onClose={() => dispatch(actions.setToast({ show: false }))}
                />
            )}
        </>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
