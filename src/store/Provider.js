import { useEffect, useReducer } from 'react';
import UserContext from './Context';
import reducer from './reducer';
import { actions } from '.';
import images from '../assets/images';
import { notification } from 'antd';
import Cookies from 'js-cookie';

function Provider({ children }) {
    const [api, contextHolder] = notification.useNotification();
    const showToast = (message = '', description = '', type = 'success') => {
        api[type]({
            message,
            description,
            placement: 'bottomRight',
        });
    };

    const initState = {
        userInfo: JSON.parse(Cookies.get('userInfo') || null),
        showToast,
    };
    const [state, dispatch] = useReducer(reducer, initState);

    return (
        <UserContext.Provider value={[state, dispatch]}>
            {contextHolder}
            {children}
        </UserContext.Provider>
    );
}

export default Provider;
