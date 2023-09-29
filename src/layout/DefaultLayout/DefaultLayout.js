import Header from '../components/Header';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { ConfigProvider, FloatButton } from 'antd';
import { useContext, useState } from 'react';
import { StoreContext } from '../../store';
import { FaCommentDots } from 'react-icons/fa';
import ChatBox from '../../components/ChatBox/ChatBox';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const [state, dispatch] = useContext(StoreContext);
    const [showChat, setShowChat] = useState(false);
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#faa935',
                },
            }}
        >
            {showChat && <ChatBox open={showChat} onClose={() => setShowChat(false)} />}
            <FloatButton.Group>
                <FloatButton.BackTop />
                <FloatButton onClick={() => setShowChat(true)} icon={<FaCommentDots />} type="primary" />
            </FloatButton.Group>
            <div className={cx('wrapper')}>
                <Header />
                <div className={cx('container')}>
                    <div className={cx('content')}>{children}</div>
                </div>
                <Footer />
            </div>
        </ConfigProvider>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
