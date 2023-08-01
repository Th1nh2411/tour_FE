import * as httpRequest from '../utils/httpRequest';

export const createReview = async (body, tourId) => {
    const config = {
        withCredentials: true,
        // params: {
        //     tourId,
        // },
    };
    try {
        const res = await httpRequest.post(`api/v1/review/${tourId}`, body, config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
