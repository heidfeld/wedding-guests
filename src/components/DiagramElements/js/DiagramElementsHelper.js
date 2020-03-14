export const updateElement = (id, updateCallback, shapeRef, properties = {}, updateChildren = false) => {
    const {current: shape} = shapeRef;
    if (shape) {
        const {x: absX, y: absY} = shape.getClientRect();
        const shapeX = shape.x();
        const shapeY = shape.y();

        updateCallback(id, {
            ...properties,
            x: shapeX,
            y: shapeY,
            absX,
            absY
        }, updateChildren);
    }
};

export const handleSelection = (id, updateCallback, evt) => {
    const {evt: {ctrlKey} = {}} = evt;
    if (ctrlKey === true) {
        updateCallback(id, true);
    }
    updateCallback(id);
    evt.cancelBubble = true;
};
