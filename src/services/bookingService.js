import * as httpRequest from '../utils/httpRequest';

export const createBooking = async (body) => {
    const config = {
        withCredentials: true,
        // headers: {
        //     Cookie: `accessToken=${token}`,
        // },
    };
    try {
        const res = await httpRequest.post(`api/v1/booking`, body, config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
export const getBooking = async (token, id) => {
    const config = {
        withCredentials: true,
    };
    try {
        const res = await httpRequest.get(`api/v1/booking/${id}`, config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
export const getFeaturedTours = async (token) => {
    const config = {};

    try {
        const res = await httpRequest.get(`api/v1/tours/search/getFeaturedTour`, config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
