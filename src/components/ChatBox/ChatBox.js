import classNames from 'classnames/bind';
import styles from './ChatBox.module.scss';
import { Drawer, Input, Skeleton, Typography } from 'antd';
import { FaHeadset } from 'react-icons/fa';
import { FcAssistant } from 'react-icons/fc';
import { AiOutlineSend } from 'react-icons/ai';
import * as messageService from '../../services/messageService';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store';
import io from 'socket.io-client';
const { Title, Paragraph, Text } = Typography;
const socket = io('http://localhost:4000');
const cx = classNames.bind(styles);

function ChatBox({ className, open, onClose = () => {} }) {
    const [state, dispatch] = useContext(StoreContext);
    const userInfo = state.userInfo;
    const [loading, setLoading] = useState();
    const [load, setLoad] = useState(true);
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState();
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const onChangeSend = (e) => {
        const value = e.target.value;
        setMessage(value);
        const data = {
            message: value,
        };

        // console.log(data)

        //Nếu user đang bấm phím để gửi tin nhắn thì sẽ gửi socket lên server với key keyboard_message_send
        //Để cho đối phương biết là user đang gửi tin nhắn
        //Vì gửi là user muốn gửi đến người nào
        //Nên chúng ta phải lấy id_user của đối phương mà user muốn gửi
        socket.emit('keyboard_message_send', data);
    };

    //Client nhận dữ liệu từ server gửi xuống thông qua socket
    // useEffect(() => {
    //     socket.on('keyboard_message_receive', (data) => {
    //         const message = data.message;

    //         //Ở bên phía người nhận thì sẽ có userID1 của chính mình
    //         //Nếu mà có tin nhắn và đúng với id_user của người gửi đúng với userID1 của chính mình thì sẽ load
    //         if (message !== '') {
    //             setLoadMessage(true);
    //         } else {
    //             setLoadMessage(false);
    //         }
    //     });
    // }, []);

    //Hàm này dùng để gửi tin nhắn
    const handlerSend = () => {
        const data = {
            message,
        };

        socket.emit('send_message', data);

        //Tiếp theo nó sẽ postdata lên api đưa dữ liệu vào database
        const postData = async () => {
            setLoading(true);
            const response = await messageService.sendSupportMessage({ message });

            console.log(response);

            //Sau đó gọi hàm setLoad để useEffect lấy lại dữ liệu sau khi update
            setLoading(false);
            setLoad(true);
        };

        postData();

        setMessage('');
    };
    const getListUser = async () => {
        //Tiếp theo nó sẽ postdata lên api đưa dữ liệu vào database
        const response = await messageService.getListUser();

        if (response) {
            setListUser(response.data);
        }
        //Sau đó gọi hàm setLoad để useEffect lấy lại dữ liệu sau khi update
    };
    useEffect(() => {
        if (load) {
            const getMessage = async () => {
                const response = await messageService.getSupportMessage({ currentPage });

                if (response) {
                    setConversation(response.data);
                }
            };

            // getMessage();
        }

        setLoad(false);
    }, [load]);

    useEffect(() => {
        //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_message
        socket.on('receive_message', (data) => {
            setLoad(true);
        });
        getListUser();
    }, []);
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
            headerStyle={{ backgroundColor: 'var(--primary-color)' }}
            className={cx('wrapper', className)}
            footer={null}
            style={{
                position: 'relative',
                zIndex: 100,
            }}
        >
            <Skeleton loading={loading}>
                <div className={cx('d-flex')}>
                    <div className={cx('list-user')}>
                        {listUser &&
                            listUser.map((user, index) => (
                                <div key={index} className={cx('user-item')}>
                                    {user.fullName}
                                </div>
                            ))}
                    </div>
                    <div style={{ width: 324 }}>
                        {conversation &&
                            conversation.map((item, index) => (
                                <div
                                    key={index}
                                    className={cx('message-wrapper', { active: item.sender === userInfo._id })}
                                >
                                    {item.sender !== userInfo._id && <FcAssistant className={cx('message-avatar')} />}
                                    <div className={cx('message-content')}>{item.message}</div>
                                </div>
                            ))}
                    </div>
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
                    <AiOutlineSend className={cx('send-btn')} onClick={handlerSend} />
                </div>
            </Skeleton>
        </Drawer>
    );
}

export default ChatBox;
