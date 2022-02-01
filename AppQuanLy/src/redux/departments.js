import * as ActionTypes from './ActionTypes';

export const Departs = (state = {
    isLoading: true,
    errMess: null,
    departs: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DEPARTS:
            return {...state, isLoading: false, errMess: null, departs: action.payload};

        case ActionTypes.DEPARTS_LOADING:
            return {...state, isLoading: true, errMess: null, departs: []}

        case ActionTypes.DEPARTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};