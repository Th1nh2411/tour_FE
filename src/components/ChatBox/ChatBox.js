import classNames from 'classnames/bind';
import styles from './ChatBox.module.scss';
import { Avatar, Divider, Drawer, Dropdown, Flex, Input, Popconfirm, Skeleton, Typography } from 'antd';
import { FaHeadset } from 'react-icons/fa';
import { FcAssistant } from 'react-icons/fc';
import { AiOutlineSend } from 'react-icons/ai';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import * as messageService from '../../services/messageService';
import { useContext, useEffect, useRef, useState } from 'react';
import { StoreContext } from '../../store';
import io from 'socket.io-client';
import dayjs from 'dayjs';
import useDebounce from '../../hooks/useDebounce';
const { Title, Paragraph, Text } = Typography;
const socket = io('https://holidate-be.vercel.app', { transports: ['websocket', 'polling', 'flashsocket'] });
const cx = classNames.bind(styles);

function ChatBox({ className, open, onClose = () => {} }) {
    const [state, dispatch] = useContext(StoreContext);
    const userInfo = state.userInfo;
    const [loading, setLoading] = useState();
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState();
    const [listUser, setListUser] = useState([]);
    const [currentChat, setCurrentChat] = useState({});
    const [chosenUser, setChosenUser] = useState({});
    const [isTyping, setIsTyping] = useState(false);
    const conversationRef = useRef(null);
    const typeDebounce = useDebounce(message, 1000);

    const onChangeSend = (e) => {
        const value = e.target.value;
        setMessage(value);

        socket.emit('typing', { chat_id: currentChat, sender_id: userInfo._id });
    };
    useEffect(() => {
        socket.emit('stop_typing', currentChat);
    }, [typeDebounce]);
    // Client nhận dữ liệu từ server gửi xuống thông qua socket
    useEffect(() => {
        socket.on('message_response', (data) => {
            if (data.newConversation && data.chat_id === currentChat) {
                setConversation(data.newConversation);
            }
        });
        socket.on('display_typing', (data) => {
            if (data.chat_id === currentChat && data.sender_id !== userInfo._id) {
                setIsTyping(true);
            }
        });

        socket.on('remove_typing', (chat_id) => {
            if (chat_id === currentChat) {
                setIsTyping(false);
            }
        });
        return () => {
            socket.off('display_typing');
            socket.off('remove_typing');
            socket.off('message_response');
        };
    }, [socket, currentChat]);

    //Hàm này dùng để gửi tin nhắn
    const handlerSend = () => {
        const newMessage = {
            user_id: userInfo._id,
            createdAt: new Date(),
            content: message,
            socketID: socket.id,
        };
        const newConversation = [...conversation, newMessage];
        socket.emit('message', { chat_id: currentChat, newConversation });

        //Tiếp theo nó sẽ postdata lên api đưa dữ liệu vào database
        const postData = async () => {
            const res = await messageService.sendMessage({ chat_id: currentChat, message });
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
                    res = await messageService.getMessageByUser({ user_id: chosenUser._id });
                } else {
                    res = await messageService.getSupportMessage();
                }
                setLoading(false);

                if (res) {
                    setConversation(res.data);
                    console.log(res.chat_id);
                    setCurrentChat(res.chat_id);
                }
            };

            getMessage();
        }
    }, [chosenUser._id]);
    const getListUser = async () => {
        const response = await messageService.getListUser();
        if (response) {
            setListUser(response.data);
            setChosenUser(response.data?.[0]);
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
    const handleDeleteConversation = () => {
        const deleteConversation = async () => {
            const response = await messageService.deleteMessage({ chat_id: currentChat });
            if (response) {
                setConversation([]);
                state.showToast('Đã xóa cuộc hội thoại');
            }
        };
        deleteConversation();
    };
    const items = [
        {
            label: (
                <Popconfirm title="Xóa cuộc hội thoại này?" onConfirm={handleDeleteConversation}>
                    <Text>Xóa cuộc hội thoại</Text>
                </Popconfirm>
            ),
            key: '0',
        },
        {
            label: <Text>Icon</Text>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];
    return (
        <Drawer
            width={'600px'}
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
                    <div onClick={() => setChosenUser(user)} key={index} className={cx('user-item')}>
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
                            <div className={cx('ml-1')} style={{ maxWidth: '80%' }}>
                                {item.user_id !== userInfo._id && (
                                    <Text style={{ display: 'block' }}>{chosenUser.fullName || 'Admin'}</Text>
                                )}
                                <div className={cx('message-content')}>
                                    <Text style={{ color: '#333' }}>{item.content}</Text>
                                    <span className={cx('message-time')}>{dayjs(item.createdAt).format('HH:mm')}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </Skeleton>
                {isTyping && (
                    <div className={cx('dots')}>
                        <div className={cx('dot', 'dot-small')}></div>
                        <div className={cx('dot', 'dot-small')}></div>
                        <div className={cx('dot', 'dot-small')}></div>
                    </div>
                )}
            </div>
            <div className={cx('message-input')}>
                <Dropdown menu={{ items }} trigger={'click'}>
                    <Text>
                        <HiOutlineDotsVertical className={cx('bottom-icon')} />
                    </Text>
                </Dropdown>
                <Input
                    onPressEnter={handlerSend}
                    value={message}
                    onChange={onChangeSend}
                    placeholder="Aa"
                    size="large"
                    style={{ marginRight: '12px', borderRadius: '16px' }}
                />
                <Text>
                    <AiOutlineSend className={cx('bottom-icon')} onClick={handlerSend} />
                </Text>
            </div>
        </Drawer>
    );
}

export default ChatBox;
