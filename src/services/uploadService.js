import * as httpRequest from '../utils/httpRequest';

export const uploadFile = async (my_file) => {
    const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    };
    const body = {
        my_file,
    };
    try {
        const res = await httpRequest.post(`upload`, body, config);
        return res;
    } catch (error) {
        console.log(error);
    }
};
