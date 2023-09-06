import * as httpRequest from '../utils/httpRequest';

export const createBooking = async (body) => {
    const config = {
        withCredentials: true,
        // headers: {
        //     Cookie: `accessToken=${token}`,
        // },
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
    const config = {
        withCredentials: true,
    };
    try {
        const res = await httpRequest.get(`booking`, config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
