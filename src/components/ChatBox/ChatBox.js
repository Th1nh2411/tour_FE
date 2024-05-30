import classNames from 'classnames/bind';
import styles from './ChatBox.module.scss';
import { Avatar, Divider, Drawer, Flex, Input, Skeleton, Typography } from 'antd';
import { FaHeadset } from 'react-icons/fa';
import { FcAssistant } from 'react-icons/fc';
import { AiOutlineSend } from 'react-icons/ai';
import * as messageService from '../../services/messageService';
import { useContext, useEffect, useRef, useState } from 'react';
import { StoreContext } from '../../store';
import io from 'socket.io-client';
import dayjs from 'dayjs';
const { Title, Paragraph, Text } = Typography;
const socket = io('http://localhost:4000');
const cx = classNames.bind(styles);

function ChatBox({ className, open, onClose = () => {} }) {
    const [state, dispatch] = useContext(StoreContext);
    const userInfo = state.userInfo;
    const [loading, setLoading] = useState();
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState();
    const [listUser, setListUser] = useState([]);
    const [chosenUser, setChosenUser] = useState({});
    const conversationRef = useRef(null);

    const onChangeSend = (e) => {
        const value = e.target.value;
        setMessage(value);

        socket.emit('keyboard_message_send', value);
    };

    // Client nhận dữ liệu từ server gửi xuống thông qua socket
    useEffect(() => {
        socket.on('message_response', (newConversation) => {
            if (newConversation) {
                setConversation(newConversation);
            } else {
            }
        });
        // console.log(conversation);
    }, [socket]);

    //Hàm này dùng để gửi tin nhắn
    const handlerSend = () => {
        const newMessage = {
            user_id: userInfo._id,
            createdAt: new Date(),
            content: message,
            socketID: socket.id,
        };
        const newConversation = [...conversation, newMessage];
        socket.emit('message', newConversation);
        setConversation(newConversation);

        //Tiếp theo nó sẽ postdata lên api đưa dữ liệu vào database
        const postData = async () => {
            let res;
            if (userInfo.role === 'admin') {
                res = await messageService.sendMessage({ user_id: chosenUser, message });
            } else {
                res = await messageService.sendSupportMessage({ message });
            }
            if (res && res.success) {
            }
            //Sau đó gọi hàm setLoad để useEffect lấy lại dữ liệu sau khi update
        };

        postData();

        setMessage('');
    };

    useEffect(() => {
        if (chosenUser) {
            const getMessage = async () => {
                setLoading(true);
                let res;
                if (userInfo.role === 'admin') {
                    res = await messageService.getMessageByUser({ user_id: chosenUser });
                } else {
                    res = await messageService.getSupportMessage();
                }
                setLoading(false);

                if (res && res.data) {
                    setConversation(res.data);
                }
            };

            getMessage();
        }
    }, [chosenUser]);
    const getListUser = async () => {
        const response = await messageService.getListUser();
        if (response) {
            setListUser(response.data);
            setChosenUser(response.data?.[0]._id);
        }
    };
    useEffect(() => {
        if (userInfo.role === 'admin') {
            getListUser();
        }
    }, []);
    useEffect(() => {
        if (conversationRef.current) {
            conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
        }
    }, [conversationRef, conversation]);
    return (
        <Drawer
            width={'auto'}
            title={
                <Text className={cx('align-center')} style={{ fontSize: 22, color: 'white' }}>
                    Hỗ trợ khách hàng <FaHeadset style={{ marginLeft: 8 }} />
                </Text>
            }
            onClose={onClose}
            open={open}
            footer={null}
            styles={{ header: { backgroundColor: 'var(--primary-color)' }, body: { padding: 0 } }}
            style={{
                position: 'relative',
                zIndex: 100,
            }}
            classNames={{ body: cx('wrapper', className) }}
        >
            <Flex className={cx('list-user')}>
                {listUser?.map((user, index) => (
                    <div onClick={() => setChosenUser(user._id)} key={index} className={cx('user-item')}>
                        <Avatar alt="avatar" src={user.photo} />
                        <Text style={{ width: 45, textAlign: 'center' }} ellipsis>
                            {user.fullName?.split(' ').pop()}
                        </Text>
                    </div>
                ))}
            </Flex>
            <div ref={conversationRef} className={cx('message-wrapper')}>
                <Skeleton loading={loading}>
                    {conversation?.map((item, index) => (
                        <div key={index} className={cx('message-item', { active: item.user_id === userInfo._id })}>
                            {item.user_id !== userInfo._id && <FcAssistant className={cx('default-avatar')} />}
                            <div className={cx('ml-1')}>
                                {item.user_id !== userInfo._id && (
                                    <Text style={{ display: 'block' }}>{chosenUser.fullName || 'Admin'}</Text>
                                )}
                                <div className={cx('message-content')}>
                                    {item.content}
                                    <span className={cx('message-time')}>{dayjs(item.createdAt).format('HH:mm')}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </Skeleton>
            </div>
            <div className={cx('message-input')}>
                <Input
                    onPressEnter={handlerSend}
                    value={message}
                    onChange={onChangeSend}
                    placeholder="Aa"
                    size="large"
                    style={{ marginRight: '12px', borderRadius: '16px' }}
                />
                <Text>
                    <AiOutlineSend className={cx('send-btn')} onClick={handlerSend} />
                </Text>
            </div>
        </Drawer>
    );
}

export default ChatBox;
