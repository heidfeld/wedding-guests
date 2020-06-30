class ReduxStateHelper {

    static getWidgetId(props) {
        const {widgetId} = props;
        if (widgetId) {
            return widgetId;
        }
    }

    static getSelectedObjectsForId(state, id) {
        const {widgets = {}} = state;
        return widgets[id] && widgets[id].selectedObjects ? widgets[id].selectedObjects : [];
    }

    static getSelectedObjects(state, props) {
        const id = ReduxStateHelper.getWidgetId(props);
        return ReduxStateHelper.getSelectedObjectsForId(state, id);
    }

}

export default ReduxStateHelper;
