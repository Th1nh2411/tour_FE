import { notification } from 'antd';
import * as httpRequest from '../utils/httpRequest';

export const register = async (body) => {
    // const config = {
    //     headers: { access_token: token },
    // };
    try {
        const res = await httpRequest.post(`auth/register`, body);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const login = async (body) => {
    // const config = {
    //     headers: { access_token: token },
    // };

    try {
        const res = await httpRequest.post(`auth/login`, body);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const sendOTPForgotPw = async (body) => {
    // const config = {
    //     headers: { access_token: token },
    // };
    try {
        const res = await httpRequest.post(`user/forgotpassword`, body);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const confirmOTPForgotPw = async (body) => {
    // const config = {
    //     headers: { access_token: token },
    // };
    try {
        const res = await httpRequest.post(`user/forgotpassword/verify`, body);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const changeForgotPw = async (body) => {
    // const config = {
    //     headers: { access_token: token },
    // };
    try {
        const res = await httpRequest.post(`user/forgotpassword/success`, body);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const sendMailActive = async () => {
    // const config = {
    //     headers: { access_token: token },
    // };
    try {
        const res = await httpRequest.get(`user/activebutton`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const activeAccount = async (body) => {
    // const config = {
    //     headers: { access_token: token },
    // };
    try {
        const res = await httpRequest.post(`user/active`, body);
        return res;
    } catch (error) {
        console.log(error);
    }
};
