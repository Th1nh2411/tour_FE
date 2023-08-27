import axios from 'axios';
const httpRequest = axios.create({
    withCredentials: true,
    baseURL: 'https://holidate-be.vercel.app/',
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    credentials: 'include',
});
export const get = async (path, config = {}) => {
    const response = await httpRequest.get(path, config);
    return response.data;
};
export const post = async (path, body = {}, config = {}) => {
    const response = await httpRequest.post(path, body, config);
    return response.data;
};
export const del = async (path, config = {}) => {
    const response = await httpRequest.delete(path, config);
    return response.data;
};
export const put = async (path, body = {}, config = {}) => {
    const response = await httpRequest.put(path, body, config);
    return response.data;
};
export const patch = async (path, body = {}, config = {}) => {
    const response = await httpRequest.patch(path, body, config);
    return response.data;
};
// export default httpRequest;
