import { useEffect, useReducer, useState } from 'react';
import UserContext from './Context';
import reducer from './reducer';
import { actions } from '.';
import images from '../assets/images';
import { notification } from 'antd';
import Cookies from 'js-cookie';
import * as bookingService from '../services/bookingService';
function Provider({ children }) {
    const [api, contextHolder] = notification.useNotification();
    const showToast = (message = '', description = '', type = 'success') => {
        api[type]({
            message,
            description,
            placement: 'bottomRight',
        });
    };
    const getUnpaidBooking = async () => {
        setTimeout(async () => {
            const results = await bookingService.getUnpaidBooking();
            if (results) {
                dispatch(actions.setUnpaidBooking(results.data));
                showToast('Thông báo', 'Bạn có chuyến đi chưa hoàn tất thanh toán!', 'info');
            }
        }, [2000]);
    };

    const initState = {
        userInfo: JSON.parse(Cookies.get('userInfo') || null),
        showToast,
        unpaidBooking: null,
        getUnpaidBooking,
    };
    const [state, dispatch] = useReducer(reducer, initState);
    useEffect(() => {
        getUnpaidBooking();
    }, []);
    return (
        <UserContext.Provider value={[state, dispatch]}>
            {contextHolder}
            {children}
        </UserContext.Provider>
    );
}

export default Provider;
