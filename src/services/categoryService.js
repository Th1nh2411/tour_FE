import { notification } from 'antd';
import * as httpRequest from '../utils/httpRequest';

export const getAllCategory = async (body) => {
    // const config = {
    //     headers: { access_token: token },
    // };
    try {
        const res = await httpRequest.get(`category`);
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
export const getDetailCategory = async (id) => {
    // const config = {
    //     headers: { access_token: token },
    // };
    try {
        const res = await httpRequest.get(`category/${id}`);
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
// Admin
export const createCategory = async (body) => {
    // const config = {
    //     headers: { access_token: token },
    // };
    try {
        const res = await httpRequest.post(`category`, body);
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
export const updateCategory = async (id, body) => {
    // const config = {
    //     headers: { access_token: token },
    // };
    try {
        const res = await httpRequest.put(`category/${id}`, body);
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
