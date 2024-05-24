import { notification } from 'antd';
import * as httpRequest from '../utils/httpRequest';

export const getSupportMessage = async (params) => {
    const config = {
        params,
    };
    try {
        const res = await httpRequest.get(`messenger/support/get`, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const sendSupportMessage = async (body) => {
    try {
        const res = await httpRequest.post(`messenger/support/send`, body);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const countUnreadMessage = async (body) => {
    try {
        const res = await httpRequest.post(`messenger/support/count`, body);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const readSupportMessage = async (body) => {
    try {
        const res = await httpRequest.post(`messenger/support/read`, body);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getListUser = async () => {
    try {
        const res = await httpRequest.get(`user`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
