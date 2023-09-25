import { notification } from 'antd';
import * as httpRequest from '../utils/httpRequest';

export const getAllGuide = async (body) => {
    try {
        const res = await httpRequest.get(`guide`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getDetailGuide = async (id) => {
    try {
        const res = await httpRequest.get(`guide/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
// Admin
export const createGuide = async (body) => {
    try {
        const res = await httpRequest.post(`guide`, body);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const updateGuide = async (body, id) => {
    try {
        const res = await httpRequest.put(`guide/${id}`, body);
        return res;
    } catch (error) {
        console.log(error);
    }
};
