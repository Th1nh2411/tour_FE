import { notification } from 'antd';
import * as httpRequest from '../utils/httpRequest';

export const getAllGuide = async (body) => {
    // const config = {
    //     headers: { access_token: token },
    // };
    try {
        const res = await httpRequest.get(`guide`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getDetailGuide = async (id) => {
    // const config = {
    //     headers: { access_token: token },
    // };
    try {
        const res = await httpRequest.get(`guide/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
// Admin
export const createGuide = async (body) => {
    // const config = {
    //     headers: { access_token: token },
    // };
    try {
        const res = await httpRequest.post(`guide`, body);
        return res;
    } catch (error) {
        console.log(error);
        notification.open({
            message: 'Thất bại',
            description: error.response && error.response.data.message,
            placement: 'bottomRight',
            type: 'error',
        });
    }
};
export const updateGuide = async (id, body) => {
    // const config = {
    //     headers: { access_token: token },
    // };
    try {
        const res = await httpRequest.put(`guide/${id}`, body);
        return res;
    } catch (error) {
        console.log(error);
        notification.open({
            message: 'Thất bại',
            description: error.response && error.response.data.message,
            placement: 'bottomRight',
            type: 'error',
        });
    }
};
