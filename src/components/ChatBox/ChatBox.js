import classNames from 'classnames/bind';
import styles from './ChatBox.module.scss';
import { Drawer, Input, Skeleton } from 'antd';
import { FaHeadset } from 'react-icons/fa';
import { FcAssistant } from 'react-icons/fc';
import { AiOutlineSend } from 'react-icons/ai';
import * as messageService from '../../services/messageService';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store';
const cx = classNames.bind(styles);

function ChatBox({ className, open, onClose = () => {} }) {
    const [state, dispatch] = useContext(StoreContext);
    const [loading, setLoading] = useState();
    const getMessage = async () => {
        setLoading(true);
        const results = await messageService.getAllMessage();

        setLoading(false);
    };
    useEffect(() => {
        if (state.userInfo) {
            getMessage();
        } else {
            onClose();
            state.showToast('Vui lòng đăng nhập', '', 'info');
        }
    }, []);
    return (
        <Drawer
            // width={700}
            title={
                <p className={cx('align-center')} style={{ fontSize: 22, color: 'white' }}>
                    Hỗ trợ khách hàng <FaHeadset style={{ marginLeft: 8 }} />
                </p>
            }
            onClose={onClose}
            open={open}
            headerStyle={{ backgroundColor: 'var(--primary-color)' }}
            className={cx('wrapper', className)}
            footer={null}
            style={{
                position: 'relative',
                zIndex: 100,
            }}
        >
            <Skeleton loading={loading}>
                <div className={cx('message-wrapper')}>
                    <FcAssistant className={cx('message-avatar')} />
                    <div className={cx('message-content')}>Chào bạn, bạn cần giúp đỡ?</div>
                </div>
                <div className={cx('message-wrapper', 'active')}>
                    <div className={cx('message-content')}>Đúng vạy</div>
                </div>
                <div className={cx('message-input')}>
                    <Input placeholder="Aa" size="large" style={{ marginRight: '12px', borderRadius: '16px' }} />
                    <AiOutlineSend className={cx('send-btn')} />
                </div>
            </Skeleton>
        </Drawer>
    );
}

export default ChatBox;
