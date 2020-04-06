export const MAX_EXPORT_WIDTH = 7680;
export const DEFAULT_MAX_ZOOM = 6;

/**
 * Get stage and return current mouse position on canvas (Takes in account stage positioning)
 * @param stage {Object}
 * @returns {[]} two dimensional array of [x, y]
 */
export const getCanvasMousePosition = (stage) => {
    const mousePosition = stage.getPointerPosition();
    if (!mousePosition) {
        return [0, 0];
    }
    const x = (mousePosition.x - stage.x()) / stage.scaleX();
    const y = (mousePosition.y - stage.y()) / stage.scaleY();
    return [x, y];
};

export const getAllStageChildren = (stage) => {
    const layers = stage.getLayers();
    return layers.reduce((result, layer) => {
        return [...result, ...layer.getChildren()];
    }, []);
};

export const getComparedValue = (comparator, oldValue, newValue) => {
    if (!comparator(oldValue, newValue) || typeof oldValue === 'undefined') {
        return newValue;
    }
    return oldValue;
};

export const getGraphBounds = (stage, inputShapes, margin = 10) => {
    let minX, maxX, minY, maxY;
    const shapes = inputShapes || getAllStageChildren(stage);
    shapes.forEach((shape) => {
        const {x, y, width, height} = shape.getClientRect({relativeTo: stage});
        if (Number.isNaN(x) || Number.isNaN(y) || Number.isNaN(width) || Number.isNaN(height)) {
            console.error('Couldn\'t get dimensions of object ', shape);
        } else {
            minX = getComparedValue((o, n) => o < n, minX, x);
            maxX = getComparedValue((o, n) => o > n, maxX, x + width);
            minY = getComparedValue((o, n) => o < n, minY, y);
            maxY = getComparedValue((o, n) => o > n, maxY, y + height);
        }
    });
    return {
        minX: (minX || 0) - margin,
        minY: (minY || 0) - margin,
        maxX: (maxX || stage.width()) + margin,
        maxY: (maxY || stage.height()) + margin
    };
};

export const getGraphExportData = (stage, maxZoom = DEFAULT_MAX_ZOOM) => {
    let resolutionRatio = maxZoom;
    const clonedStage = stage.clone();
    const {minX, maxX, minY, maxY} = getGraphBounds(stage);
    const width = maxX - minX;
    const height = maxY - minY;
    const maxResolutionRatio = Math.min(MAX_EXPORT_WIDTH / width, MAX_EXPORT_WIDTH / height);
    if (width * maxZoom > MAX_EXPORT_WIDTH || height * maxZoom > MAX_EXPORT_WIDTH) {
        resolutionRatio = maxResolutionRatio;
    }
    clonedStage.x(-minX * resolutionRatio);
    clonedStage.y(-minY * resolutionRatio);
    clonedStage.width(resolutionRatio * width);
    clonedStage.height(resolutionRatio * height);
    clonedStage.scale({
        x: resolutionRatio,
        y: resolutionRatio
    });
    clonedStage.draw();
    const data = clonedStage.toDataURL();
    return {
        data,
        stage: clonedStage,
        width: clonedStage.width(),
        height: clonedStage.height()
    };
};

export const getFileName = (fileName, extension = 'png') => {
    return `${fileName || (new Date().toLocaleString())}.${extension}`;
};

export const getDataBlob = (data) => {
    const binary = atob(data);
    const len = binary.length;
    const buffer = new ArrayBuffer(len);
    const view = new Uint8Array(buffer);
    // save unicode of binary data into 8-bit Array
    for (let i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i);
    }
    return new Blob([view], {type: 'image/png'});
};
