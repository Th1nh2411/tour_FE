import * as httpRequest from '../utils/httpRequest';

export const register = async (username, email, password) => {
    // const config = {
    //     headers: { access_token: token },
    // };
    const body = { username, email, password };
    try {
        const res = await httpRequest.post(`api/v1/auth/register`, body);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
export const login = async (email, password) => {
    // const config = {
    //     headers: { access_token: token },
    // };
    const body = { email, password };

    try {
        const res = await httpRequest.post(`api/v1/auth/login`, body);
        return res;
    } catch (error) {
        console.log(error);
        return error.response && error.response.data;
    }
};
