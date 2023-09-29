import { notification } from 'antd';
import * as httpRequest from '../utils/httpRequest';

export const getSupportMessage = async () => {
    try {
        const res = await httpRequest.get(`messenger/support`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const sendSupportMessage = async (body) => {
    try {
        const res = await httpRequest.post(`messenger/support`, body);
        return res;
    } catch (error) {
        console.log(error);
    }
};
