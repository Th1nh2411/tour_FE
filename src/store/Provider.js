import { useEffect, useReducer, useState } from 'react';
import UserContext from './Context';
import reducer from './reducer';
import { actions } from '.';
import images from '../assets/images';
import { notification } from 'antd';
import Cookies from 'js-cookie';
import * as bookingService from '../services/bookingService';
import * as authService from '../services/authService';
import { useSearchParams } from 'react-router-dom';
function Provider({ children }) {
    const [api, contextHolder] = notification.useNotification();
    const showToast = (message = '', description = '', type = 'success') => {
        api[type]({
            message,
            description,
            placement: 'bottomRight',
        });
    };
    const [searchParams, setSearchParams] = useSearchParams();
    const id_user = searchParams.get('id_user');
    const activeID = searchParams.get('activeID');

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
    console.log(state.userInfo);
    const activeAccount = async () => {
        setTimeout(async () => {
            const results = await authService.activeAccount({ id_user, activeID });
            if (results) {
                dispatch(actions.setUserInfo({ ...state.userInfo, isActive: true }));
                showToast('Thông báo', 'Tài khoản của bạn đã được kích hoạt!', 'success');
            }
        }, [2000]);
    };
    useEffect(() => {
        if (state.userInfo) {
            getUnpaidBooking();
        }
        if (id_user && activeID) {
            activeAccount();
        }
    }, []);
    return (
        <UserContext.Provider value={[state, dispatch]}>
            {contextHolder}
            {children}
        </UserContext.Provider>
    );
}

export default Provider;
