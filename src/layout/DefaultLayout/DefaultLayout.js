import Header from '../components/Header';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { ConfigProvider, FloatButton, theme } from 'antd';
import { useContext, useState } from 'react';
import { StoreContext } from '../../store';
import ThemeMode from '../components/ThemeMode';
import { FaCommentDots } from 'react-icons/fa';
import ChatBox from '../../components/ChatBox/ChatBox';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const [state, dispatch] = useContext(StoreContext);
    const [showChat, setShowChat] = useState(false);
    const { defaultAlgorithm, darkAlgorithm } = theme;
    return (
        <ConfigProvider
            theme={{
                algorithm: state.theme === 'dark' ? darkAlgorithm : defaultAlgorithm,
                token: {
                    fontFamily: 'Nunito',
                    boxShadow:
                        '0px 1px 3px 0 var(--box-shadow-color), 0 3px 8px 0px var(--box-shadow-color), 0px 2px 3px 0px var(--box-shadow-color)',
                },
                components: {
                    Layout: {
                        headerBg: state.theme === 'dark' ? '#001529' : '#f5f5f5',
                        colorBgLayout: state.theme === 'dark' ? '#001529' : '#f5f5f5',
                    },
                    Rate: {
                        marginXS: 4,
                    },
                    Form: {
                        itemMarginBottom: 16,
                    },
                },
            }}
        >
            {showChat && <ChatBox open={showChat} onClose={() => setShowChat(false)} />}
            <FloatButton.Group>
                <FloatButton.BackTop />
                <FloatButton
                    onClick={() => {
                        if (state.userInfo) {
                            setShowChat(true);
                        } else {
                            state.showToast('Vui lòng đăng nhập', '', 'info');
                        }
                    }}
                    icon={<FaCommentDots />}
                    type="primary"
                />
            </FloatButton.Group>
            <div className={cx('wrapper')}>
                <Header />
                <ThemeMode />
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
