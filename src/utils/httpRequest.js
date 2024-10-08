import { Modal, notification } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
const httpRequest = axios.create({
    baseURL:
        process.env.REACT_APP_ENV === 'dev'
            ? 'http://localhost:4000/api/v1/'
            : 'https://tour-be-13cn.onrender.com/api/v1/',
    withCredentials: true,
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    credentials: 'include',
});
export const get = async (path, config = {}) => {
    try {
        const response = await httpRequest.get(path, config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            Cookies.remove('userInfo');
            Modal.info({
                centered: true,
                title: 'Phiên đăng nhập đã kết thúc! Vui lòng đăng nhập lại.',
                onOk() {
                    window.location.href = window.location.protocol + '//' + window.location.host;
                },
            });
        }
    }
};
export const post = async (path, body = {}, config = {}) => {
    try {
        const response = await httpRequest.post(path, body, config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            Cookies.remove('userInfo');
            Modal.info({
                centered: true,
                title: 'Phiên đăng nhập đã kết thúc! Vui lòng đăng nhập lại.',
                onOk() {
                    window.location.href = window.location.protocol + '//' + window.location.host;
                },
            });
        } else {
            notification.open({
                message: 'Thất bại',
                description: error.response && error.response.data.message,
                placement: 'bottomRight',
                type: 'error',
            });
        }
    }
};
export const del = async (path, config = {}) => {
    try {
        const response = await httpRequest.delete(path, config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            Cookies.remove('userInfo');
            Modal.info({
                centered: true,
                title: 'Phiên đăng nhập đã kết thúc! Vui lòng đăng nhập lại.',
                onOk() {
                    window.location.href = window.location.protocol + '//' + window.location.host;
                },
            });
        } else {
            notification.open({
                message: 'Thất bại',
                description: error.response && error.response.data.message,
                placement: 'bottomRight',
                type: 'error',
            });
        }
    }
};
export const put = async (path, body = {}, config = {}) => {
    try {
        const response = await httpRequest.put(path, body, config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            Cookies.remove('userInfo');
            Modal.info({
                centered: true,
                title: 'Phiên đăng nhập đã kết thúc! Vui lòng đăng nhập lại.',
                onOk() {
                    window.location.href = window.location.protocol + '//' + window.location.host;
                },
            });
        } else {
            notification.open({
                message: 'Thất bại',
                description: error.response && error.response.data.message,
                placement: 'bottomRight',
                type: 'error',
            });
        }
    }
};
export const patch = async (path, body = {}, config = {}) => {
    try {
        const response = await httpRequest.patch(path, body, config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            Cookies.remove('userInfo');
            Modal.info({
                centered: true,
                title: 'Phiên đăng nhập đã kết thúc! Vui lòng đăng nhập lại.',
                onOk() {
                    window.location.href = window.location.protocol + '//' + window.location.host;
                },
            });
        } else {
            notification.open({
                message: 'Thất bại',
                description: error.response && error.response.data.message,
                placement: 'bottomRight',
                type: 'error',
            });
        }
    }
};

// export default httpRequest;
