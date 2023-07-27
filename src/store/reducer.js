import { SET_LIST_COURSE, SET_TOAST } from './constraints';

function reducer(state, action) {
    switch (action.type) {
        case SET_TOAST:
            return { ...state, toast: action.payload };
        case SET_LIST_COURSE:
            return action.payload;
        default:
            return state;
    }
}
export default reducer;
