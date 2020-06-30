import {SELECTED_OBJECTS_CHANGED} from '../actionType';

const selectedObjectsChanged = (widgetId, selectedObjects) => ({
    type: SELECTED_OBJECTS_CHANGED,
    payload: {
        [widgetId]: [
            ...selectedObjects
        ]
    }
});

export default selectedObjectsChanged;