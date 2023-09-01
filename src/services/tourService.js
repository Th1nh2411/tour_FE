import * as httpRequest from '../utils/httpRequest';

export const getAllTours = async (page) => {
    const config = {
        withCredentials: true,
        params: {
            page,
        },
    };

    try {
        const res = await httpRequest.get(`tours`, config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
export const addTour = async (data) => {
    const config = {
        withCredentials: true,
    };
    try {
        const res = await httpRequest.post(`tours`, data, config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
export const editTour = async (data, id) => {
    const config = {
        withCredentials: true,
    };
    try {
        const res = await httpRequest.put(`tours/${id}`, data, config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
export const getFeaturedTours = async (token) => {
    const config = {};

    try {
        const res = await httpRequest.get(`tours/search/getFeaturedTour`, config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
export const getSearchTours = async (city = '', distance = 0, maxGroupSize) => {
    const config = {
        params: { city, distance, maxGroupSize },
    };

    try {
        const res = await httpRequest.get(`tours/search/getTourBySearch`, config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
