import { SET_LOADING, SET_USER_INFO } from './constraints';

function reducer(state, action) {
    switch (action.type) {
        case SET_USER_INFO:
            return { ...state, userInfo: action.payload };
        case SET_LOADING:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}
export default reducer;
