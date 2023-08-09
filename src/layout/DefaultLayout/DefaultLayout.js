import Header from '../components/Header';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { Spin } from 'antd';
import { useContext } from 'react';
import { StoreContext } from '../../store';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const [state, dispatch] = useContext(StoreContext);
    return (
        <>
            {state.loading && (
                <div className={cx('loading-wrapper')}>
                    <Spin className={cx('loading')} />
                </div>
            )}
            {state.loading === false && (
                <div className={cx('wrapper')}>
                    <Header />
                    <div className={cx('container')}>
                        <div className={cx('content')}>{children}</div>
                    </div>
                    <Footer />
                </div>
            )}
        </>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
