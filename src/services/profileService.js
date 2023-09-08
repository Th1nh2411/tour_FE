import { notification } from 'antd';
import * as httpRequest from '../utils/httpRequest';

export const editProfile = async (body) => {
    try {
        const res = await httpRequest.put(`user/profile`, body);
        return res;
    } catch (error) {
        console.log(error);
        notification.open({
            message: 'Thất bại',
            description: error.response.data.message,
            placement: 'bottomRight',
            type: 'error',
        });
    }
};
export const changePassword = async (body) => {
    try {
        const res = await httpRequest.put(`user/changepassword`, body);
        return res;
    } catch (error) {
        console.log(error);
        notification.open({
            message: 'Thất bại',
            description: error.response.data.message,
            placement: 'bottomRight',
            type: 'error',
        });
    }
};
