/**
 * Rectangle edge name
 * @type {{LEFT: string, TOP: string, RIGHT: string, BOTTOM: string}}
 */
export const RECTANGLE_EDGE = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    TOP: 'TOP',
    BOTTOM: 'BOTTOM'
}

/**
 * Calculates distance between two points
 * @param {{x: number, y: number}} point1 - First input point
 * @param {{x: number, y: number}} point2 - Second input point
 * @returns {number} - Distance between two given points
 */
export const getDistance = (point1, point2) => {
    const {x: x1, y: y1} = point1;
    const {x: x2, y: y2} = point2;
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};

/**
 * Gets closest circle point to the given point
 * @param {{x: number, y: number}} point - Input point
 * @param {{x: number, y: number}} centerPoint - Center circle point
 * @param {number} radius - Circle radius
 * @returns {{x: number, y: number}} - Returns closest circle point to the given point
 */
export const getClosestCirclePoint = (point, centerPoint, radius) => {
    const {x: px, y: py} = point;
    const {x: cx, y: cy} = centerPoint;
    const vx = px - cx;
    const vy = py - cy;
    const magV = Math.sqrt(vx*vx + vy*vy);
    const ax = cx + vx / magV * radius;
    const ay = cy + vy / magV * radius;
    return {
        x: ax,
        y: ay
    }
};

/**
 * Detects if point intersects rectangle
 * @param {{x: number, y: number}} point - Input point
 * @param {{x: number, y: number, width: number, height: number}} rectangleBounds - Rectangle boundary points
 */
export const intersectRectangle = (point, rectangleBounds) => {
    const {x, y} = point;
    const {x: rx, y: ry, width, height} = rectangleBounds;
    return x >= rx && x <= rx + width && y >= ry && y <= ry + height;
};

/**
 * Gets closest rectangle edge to the given point
 * @param {{x: number, y: number}} point - Input point
 * @param {{x: number, y: number, width: number, height: number}} rectangleBounds - Rectangle boundary points
 * @returns {string} - Returns closest rectangle edge, one of [LEFT, RIGHT, TOP, BOTTOM]
 */
const getClosestRectangleEdge = (point, rectangleBounds) => {
    const {x, y} = point;
    const {x: rx, y: ry, width, height} = rectangleBounds;
    const toLeft = Math.abs(x - rx);
    const toRight = Math.abs(x - (rx + width));
    const toTop = Math.abs(y - ry);
    const toBottom = Math.abs(y - (ry + height));
    const minValue = Math.min(toLeft, toRight, toTop, toBottom);

    if (minValue === toLeft) {
        return RECTANGLE_EDGE.LEFT;
    }
    if (minValue === toRight) {
        return RECTANGLE_EDGE.RIGHT;
    }
    if (minValue === toTop) {
        return RECTANGLE_EDGE.TOP;
    }
    if (minValue === toBottom) {
        return RECTANGLE_EDGE.BOTTOM;
    }
}

/**
 * Gets closest (minimal distance) rectangle point to the given point.
 * @param {{x: number, y: number}} point - Input point
 * @param {{x: number, y: number, width: number, height: number}} rectangleBounds - Rectangle boundary points
 * @returns {{x: number, y: number}} - Returns closest point to the given point
 */
const getClosestDistanceRectanglePoint = (point, rectangleBounds) => {
    const {x, y} = point;
    const {x: rx, y: ry, width, height} = rectangleBounds;
    const closestRectEdge = getClosestRectangleEdge(point, rectangleBounds);
    const maxRectY = ry + height;
    const maxRectX = rx + width;
    const insideRectY = y < ry ? ry : (y > maxRectY ? maxRectY : y);
    const insideRectX = x < rx ? rx : (x > maxRectX ? maxRectX : x);
    if (closestRectEdge === RECTANGLE_EDGE.RIGHT) {
        return {x: maxRectX, y: insideRectY};
    }
    if (closestRectEdge === RECTANGLE_EDGE.LEFT) {
        return {x: rx, y: insideRectY};
    }
    if (closestRectEdge === RECTANGLE_EDGE.TOP) {
        return {x: insideRectX, y: ry};
    }
    if (closestRectEdge === RECTANGLE_EDGE.BOTTOM) {
        return {x: insideRectX, y: maxRectY};
    }
    return point;
}

/**
 * Gets closest rectangle point to the given point. Including inside/outside rectangle point logic.
 * @param {{x: number, y: number}} point - Input point
 * @param {{x: number, y: number, width: number, height: number}} rectangleBounds - Rectangle boundary points
 * @returns {{x: number, y: number}} - Returns closest point to the given point
 */
export const getClosestRectanglePoint = (point, rectangleBounds) => {
    if (intersectRectangle(point, rectangleBounds)) {
        return getClosestDistanceRectanglePoint(point, rectangleBounds);
    }
    const {x, y} = point;
    const {x: rx, y: ry, width, height} = rectangleBounds;
    const maxRectY = ry + height;
    const maxRectX = rx + width;
    const insideRectY = y < ry ? ry : (y > maxRectY ? maxRectY : y);
    const insideRectX = x < rx ? rx : (x > maxRectX ? maxRectX : x);
    if ((y < ry && (x < rx || x > maxRectX)) || (y > maxRectY && (x < rx || x > maxRectX))) {
        return {x: insideRectX, y: insideRectY};
    }
    if (x < rx) {
        return {x: rx, y: insideRectY};
    }
    if (x > maxRectX) {
        return {x: maxRectX, y: insideRectY};
    }
    if (y < ry) {
        return {x: insideRectX, y: ry};
    }
    if (y > maxRectY) {
        return {x: insideRectX, y: maxRectY}
    }
    return point;
};