import { notification } from 'antd';
import * as httpRequest from '../utils/httpRequest';

export const getAllMessage = async () => {
    try {
        const res = await httpRequest.get(`messenger`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const sendMessage = async (body) => {
    try {
        const res = await httpRequest.post(`messenger`, body);
        return res;
    } catch (error) {
        console.log(error);
    }
};
