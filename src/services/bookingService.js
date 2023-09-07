import { notification } from 'antd';
import * as httpRequest from '../utils/httpRequest';

export const createBooking = async (body) => {
    const config = {
        withCredentials: true,
    };
    try {
        const res = await httpRequest.post(`booking`, body, config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};

export const getBooking = async (id) => {
    const config = {
        withCredentials: true,
    };
    try {
        const res = await httpRequest.get(`booking/${id}`, config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
export const getAllBooking = async () => {
    try {
        const res = await httpRequest.get(`booking`);
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
export const vnPayment = async (body) => {
    const config = {
        withCredentials: true,
    };
    try {
        const res = await httpRequest.post(`create_payment_url`, body, config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
