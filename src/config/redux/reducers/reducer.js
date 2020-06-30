import reduceReducers from 'reduce-reducers';
import {combineReducers} from 'redux';

import selectedObjects from './widgets/selectedObjectsReducer';

const appReducers = combineReducers({
    widgets: reduceReducers(selectedObjects)
});

const reducer = (state = {}, action) => {
    return appReducers(state, action);
};

export default reducer;
