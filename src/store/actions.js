import { SET_LOADING, SET_USER_INFO } from './constraints';
export const setUserInfo = (payload) => ({ type: SET_USER_INFO, payload });
export const setLoading = (payload) => ({ type: SET_LOADING, payload });
