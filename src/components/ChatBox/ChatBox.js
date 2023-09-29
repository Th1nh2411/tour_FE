import classNames from 'classnames/bind';
import styles from './ChatBox.module.scss';
import { Drawer, Input, Skeleton } from 'antd';
import { FaHeadset } from 'react-icons/fa';
import { FcAssistant } from 'react-icons/fc';
import { AiOutlineSend } from 'react-icons/ai';
import * as messageService from '../../services/messageService';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store';
import io from 'socket.io-client';
const socket = io('http://localhost:4000');
const cx = classNames.bind(styles);

function ChatBox({ className, open, onClose = () => {} }) {
    const [state, dispatch] = useContext(StoreContext);
    const [loading, setLoading] = useState();
    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);

    const getMessage = async () => {
        setLoading(true);
        const results = await messageService.getSupportMessage();

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
        //Nếu User chưa bấm vào thì không thể gửi được

        //Gọi hàm formaticon đã tạo sẵn để xử lý

        //Khi gửi tin nhắn thì nó sẽ lấy id của cả 2 người
        //Với cái key category có value là send
        //Vì là gửi tin nhắn
        const data = {
            message,
        };

        //Sau đó nó emit dữ liệu lên server bằng socket với key send_message và value data
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

    //Đây là hàm lấy dữ liệu từ api dựa vào state load
    useEffect(() => {
        if (load) {
            const fetchData = async () => {
                const response = await messageService.getSupportMessage();

                if (response) {
                    setConversation(response.data);
                }
            };

            fetchData();
        }

        setLoad(false);
    }, [load]);

    useEffect(() => {
        //Nhận dữ liệu từ server gửi lên thông qua socket với key receive_message
        socket.on('receive_message', (data) => {
            //Sau đó nó sẽ setLoad gọi lại hàm useEffect lấy lại dữ liệu
            setLoad(true);
        });
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
                    <Input
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
