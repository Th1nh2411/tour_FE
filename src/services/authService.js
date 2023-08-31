import { notification } from 'antd';
import * as httpRequest from '../utils/httpRequest';

export const register = async (body) => {
    // const config = {
    //     headers: { access_token: token },
    // };
    try {
        const res = await httpRequest.post(`api/v1/auth/register`, body);
        return res;
    } catch (error) {
        console.log(error);
        notification.open({
            message: 'Fail',
            description: error.response.data.message,
            placement: 'bottomRight',
            type: 'error',
        });
    }
};
export const login = async (body) => {
    // const config = {
    //     headers: { access_token: token },
    // };

    try {
        const res = await httpRequest.post(`api/v1/auth/login`, body);
        return res;
    } catch (error) {
        console.log(error);
        notification.open({
            message: 'Fail',
            description: error.response.data.message,
            placement: 'bottomRight',
            type: 'error',
        });
    }
};
