import { notification } from 'antd';
import * as httpRequest from '../utils/httpRequest';

export const getSupportMessage = async (params) => {
    const config = {
        params,
    };
    try {
        const res = await httpRequest.get(`message/support`, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getMessageByUser = async (params) => {
    const config = {
        params,
    };
    try {
        const res = await httpRequest.get(`message`, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const deleteMessage = async (params) => {
    const config = {
        params,
    };
    try {
        const res = await httpRequest.del(`message`, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const sendSupportMessage = async (body) => {
    try {
        const res = await httpRequest.post(`message/support`, body);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const sendMessage = async (body) => {
    try {
        const res = await httpRequest.post(`message`, body);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const countUnreadMessage = async (body) => {
    try {
        const res = await httpRequest.post(`message/support/count`, body);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const readSupportMessage = async (body) => {
    try {
        const res = await httpRequest.post(`message/support/read`, body);
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
