import * as ActionTypes from './ActionTypes';
import { staffsUrl, departsUrl, salarysUrl } from '../shared/baseUrl';

export const addStaff = ( newStaff ) => ({
    type: ActionTypes.ADD_STAFF,
    payload: newStaff
})

export const searchStaff = ( searchData ) => ({
    type: ActionTypes.SEARCH_STAFF,
    payload: searchData
})

export const postStaff = ( newStaff ) => (dispatch) => {

    return fetch( staffsUrl , {
        method: "POST",
        body: JSON.stringify( newStaff ),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
    }, error => {
        throw error;
    }) //Trả về item thêm vào
    .then( () => dispatch( fetchStaffs() ) )
    .catch( error =>  { dispatch( staffsFailed( error.message ) ); alert( 'Your item could not be posted\nError: ' + error.message ) })
}

export const patchStaff = ( id, data ) => (dispatch) => {
    return fetch( staffsUrl + '/' + id , {
        method: "PATCH",
        body: JSON.stringify( data ),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
    }, error => {
        throw error;
    }) //Trả về item thêm vào
    .then( () => dispatch( fetchStaffs() ) )
    .catch( error =>  { dispatch( staffsFailed( error.message ) ); alert( 'Your item could not be patch\nError: ' + error.message ) })
}

export const deleteStaff = ( id ) => (dispatch) => {

    return fetch( staffsUrl + '/' + id , {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
    }, error => {
        throw error;
    }) //Trả về item rỗng
    .then( () => dispatch( fetchStaffs() ) )
    .catch( error =>  { dispatch( staffsFailed( error.message ) ); alert( 'Your item could not be deleted\nError: ' + error.message ) })
}

export const fetchStaffs = () => ( dispatch ) => {

    dispatch(staffsLoading(true));

    return fetch(staffsUrl)
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then( response => response.json() ) //Trả về danh sách
    .then( staffs => dispatch( addStaffs( staffs ) ) )
    .catch( error => dispatch( staffsFailed( error.message ) ) )
}

export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
})

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
})

export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
})


//---------------------------------------------


export const fetchDeparts = () => (dispatch) => {

    dispatch(departsLoading(true));

    return fetch(departsUrl)
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(departs => dispatch(addDeparts(departs)))
    .catch(error => dispatch(departsFailed(error.message)))
}

export const departsLoading = () => ({
    type: ActionTypes.DEPARTS_LOADING
})

export const departsFailed = (errmess) => ({
    type: ActionTypes.DEPARTS_FAILED,
    payload: errmess
})

export const addDeparts = (departs) => ({
    type: ActionTypes.ADD_DEPARTS,
    payload: departs
})


//---------------------------------------------


export const fetchSalarys = () => (dispatch) => {

    dispatch(salarysLoading(true));

    return fetch(salarysUrl)
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(salarys => dispatch(addSalarys(salarys)))
    .catch(error => dispatch(salarysFailed(error.message)))
}

export const salarysLoading = () => ({
    type: ActionTypes.SALARYS_LOADING
})

export const salarysFailed = (errmess) => ({
    type: ActionTypes.SALARYS_FAILED,
    payload: errmess
})

export const addSalarys = (salarys) => ({
    type: ActionTypes.ADD_SALARYS,
    payload: salarys
})