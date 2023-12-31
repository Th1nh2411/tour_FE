import * as httpRequest from '../utils/httpRequest';

export const getAllTours = async (page) => {
    const config = {
        params: {
            page,
        },
    };

    try {
        const res = await httpRequest.get(`tour`, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getDetailTour = async (id) => {
    const config = {};
    try {
        const res = await httpRequest.get(`tour/${id}`, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const addTour = async (data) => {
    const config = {};
    try {
        const res = await httpRequest.post(`tour`, data, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const editTour = async (data, id) => {
    const config = {};
    try {
        const res = await httpRequest.put(`tour/${id}`, data, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getFeaturedTours = async (token) => {
    const config = {};

    try {
        const res = await httpRequest.get(`tour/search/getFeaturedTour`, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getSearchTours = async (params) => {
    const config = {
        params,
    };

    try {
        const res = await httpRequest.get(`tour/search/getTourBySearch`, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};
