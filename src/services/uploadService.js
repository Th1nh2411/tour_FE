import * as httpRequest from '../utils/httpRequest';

export const uploadFile = async (my_file, token) => {
    const config = {
        headers: { access_token: token, 'Content-Type': 'multipart/form-data' },
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
