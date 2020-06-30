import {SELECTED_OBJECTS_CHANGED} from '../../actions/actionType';

export default (state = {}, action) => {
    const {type, payload} = action;
    switch (type) {
        case SELECTED_OBJECTS_CHANGED: {
            const widgetId = Object.keys(payload)[0];
            let newState = {
                ...state,
                [widgetId]: {
                    ...state[widgetId],
                    selectedObjects: [...payload[widgetId]]
                }
            };
            return {...newState};
        }
        default:
            return state;
    }
};