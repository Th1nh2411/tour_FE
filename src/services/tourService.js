import * as httpRequest from '../utils/httpRequest';

export const getAllTours = async (token) => {
    const config = {
        headers: { access_token: token },
    };

    try {
        const res = await httpRequest.get(`api/v1/tours`);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
export const getFeaturedTours = async (token) => {
    const config = {
        headers: { access_token: token },
    };

    try {
        const res = await httpRequest.get(`api/v1/tours/search/getFeaturedTour`);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
