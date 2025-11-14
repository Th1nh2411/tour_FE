import { useEffect, useReducer, useState } from 'react';
import UserContext from './Context';
import reducer from './reducer';
import { actions } from '.';
import images from '../assets/images';
import { Button, Flex, notification } from 'antd';
import Cookies from 'js-cookie';
import * as bookingService from '../services/bookingService';
import * as authService from '../services/authService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import config from '../config';
function Provider({ children }) {
    const [api, contextHolder] = notification.useNotification();
    const showToast = (message = '', description = '', type = 'success') => {
        api[type]({
            message,
            description,
            placement: 'bottomRight',
            duration: 30000,
        });
    };
    const [searchParams, setSearchParams] = useSearchParams();
    const activeID = searchParams.get('activeID');
    const navigate = useNavigate();
    const getUnpaidBooking = async () => {
        if (state.userInfo) {
            setTimeout(async () => {
                const results = await bookingService.getUnpaidBooking();
                if (results) {
                    dispatch(actions.setUnpaidBooking(results.data));
                    showToast(
                        'Thông báo',
                        <Flex align="center" justify="start">
                            <span>Bạn có chuyến đi chưa thanh toán!</span>
                            <Button type="link" onClick={() => navigate(config.routes.profile)}>
                                Xem
                            </Button>
                        </Flex>,
                        'info',
                    );
                }
            }, [5000]);
        }
    };
    const setStyleTheme = (theme) => {
        document.documentElement.style.setProperty('--box-shadow-color', theme === 'dark' ? '#ffffff2b' : '#0003');
    };
    const initState = {
        userInfo: JSON.parse(Cookies.get('userInfo') || null),
        theme: JSON.parse(Cookies.get('theme') || null) || 'dark',
        showToast,
        unpaidBooking: null,
        getUnpaidBooking,
        setStyleTheme,
    };
    const [state, dispatch] = useReducer(reducer, initState);
    const activeAccount = async () => {
        if (activeID) {
            setTimeout(async () => {
                const results = await authService.activeAccount({ activeID });
                if (results) {
                    if (state.userInfo) {
                        dispatch(actions.setUserInfo({ ...state.userInfo, email: results.newEmail }));
                        Cookies.set('userInfo', JSON.stringify({ ...state.userInfo, email: results.newEmail }));
                    }
                    showToast('Thông báo', results.message, 'success');
                }
            }, [2000]);
        }
    };

    useEffect(() => {
        getUnpaidBooking();
        activeAccount();
        setStyleTheme(state.theme);
    }, []);
    return (
        <UserContext.Provider value={[state, dispatch]}>
            {contextHolder}
            {children}
        </UserContext.Provider>
    );
}

export default Provider;
