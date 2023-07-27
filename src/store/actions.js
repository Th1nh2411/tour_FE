import { SET_LIST_COURSE, SET_TOAST } from './constraints';
export const setToast = (payload) => ({ type: SET_TOAST, payload }, { type: SET_LIST_COURSE, payload });
