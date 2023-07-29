import { SET_TOAST, SET_USER_INFO } from './constraints';
export const setToast = (payload) => ({ type: SET_TOAST, payload });
export const setUserInfo = (payload) => ({ type: SET_USER_INFO, payload });
