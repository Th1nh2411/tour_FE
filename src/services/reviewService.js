import * as httpRequest from '../utils/httpRequest';

export const createReview = async (body, tourId) => {
    const config = {
        withCredentials: true,
        // params: {
        //     tourId,
        // },
    };
    try {
        const res = await httpRequest.post(`review/${tourId}`, body, config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
export const getAllReview = async (tourId, page, rating) => {
    const config = {
        params: {
            page,
            rating,
        },
    };
    try {
        const res = await httpRequest.get(`review/${tourId}`, config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
export const getTop8Review = async () => {
    try {
        const res = await httpRequest.get(`review`);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
