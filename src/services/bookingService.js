import * as httpRequest from '../utils/httpRequest';

export const createBooking = async (body) => {
    try {
        const res = await httpRequest.post(`booking`, body, {}, true);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};
export const cancelBooking = async (id) => {
    try {
        const res = await httpRequest.post(`booking/cancel/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getBooking = async (id) => {
    try {
        const res = await httpRequest.get(`booking/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getUnpaidBooking = async () => {
    try {
        const res = await httpRequest.get(`booking/check/payment`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getAllBooking = async () => {
    try {
        const res = await httpRequest.get(`booking`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const vnpayPayment = async (body) => {
    try {
        const res = await httpRequest.post(`vnpay/create_payment_url`, body);
        return res;
    } catch (error) {}
};
export const vnpayReturn = async (params) => {
    const config = { params };
    try {
        const res = await httpRequest.get(`vnpay/vnpay_return`, config);
        return res;
    } catch (error) {}
};
