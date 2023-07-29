import * as httpRequest from '../utils/httpRequest';

export const getAllTours = async (token) => {
    const config = {
        withCredentials: true,
    };

    try {
        const res = await httpRequest.get(`api/v1/tours`, config);
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
        const res = await httpRequest.post(`api/v1/tours`, data, config);
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
export const getSearchTours = async (city = '', distance = 0, maxGroupSize) => {
    const config = {
        params: { city, distance, maxGroupSize },
    };

    try {
        const res = await httpRequest.get(`api/v1/tours/search/getTourBySearch`, config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
