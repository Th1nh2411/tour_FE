import { useEffect, useReducer } from 'react';
import UserContext from './Context';
import reducer from './reducer';
import { actions } from '.';
import LocalStorageManager from '../utils/LocalStorageManager';
import images from '../assets/images';
import { notification } from 'antd';

function Provider({ children }) {
    const [api, contextHolder] = notification.useNotification();
    const localStorageManager = LocalStorageManager.getInstance();
    const showToast = (message = '', description = '', type = 'success') => {
        api[type]({
            message,
            description,
            placement: 'bottomRight',
        });
    };

    const initState = {
        toast: { show: false, content: '', title: '' },
        userInfo: localStorageManager.getItem('userInfo'),
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
