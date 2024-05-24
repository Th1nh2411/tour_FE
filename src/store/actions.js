import { SET_THEME, SET_UNPAID_BOOKING, SET_USER_INFO } from './constraints';
export const setUserInfo = (payload) => ({ type: SET_USER_INFO, payload });
export const setTheme = (payload) => ({ type: SET_THEME, payload });
export const setUnpaidBooking = (payload) => ({ type: SET_UNPAID_BOOKING, payload });
