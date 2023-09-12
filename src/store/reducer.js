import { SET_UNPAID_BOOKING, SET_USER_INFO } from './constraints';

function reducer(state, action) {
    switch (action.type) {
        case SET_USER_INFO:
            return { ...state, userInfo: action.payload };
        case SET_UNPAID_BOOKING:
            return { ...state, unpaidBooking: action.payload };
        default:
            return state;
    }
}
export default reducer;
