import * as ActionTypes from './ActionTypes';

export const Staffs = (state = {
    isLoading: true,
    errMess: null,
    searchData: [],
    staffs: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_STAFF:
            let newStaff = action.payload;
            newStaff.id = state.staffs.length;
            return { ...state, staffs: state.staffs.concat([newStaff])};

        case ActionTypes.SEARCH_STAFF:
            return {...state, searchData: action.payload};
    
        case ActionTypes.ADD_STAFFS:
            return {...state, isLoading: false, errMess: null, staffs: action.payload};

        case ActionTypes.STAFFS_LOADING:
            return {...state, isLoading: true, errMess: null, staffs: []}

        case ActionTypes.STAFFS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};