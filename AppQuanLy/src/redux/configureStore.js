import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { Staffs } from './staffs';
import { Departs } from './departments';
import { Salarys } from './salarys';
import { InitialModal } from './modalForm';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: Staffs,
            departs: Departs,
            salarys: Salarys,
            ...createForms( { modalForm: InitialModal } )
        }),
        applyMiddleware( thunk, logger )
    )

    return store
}