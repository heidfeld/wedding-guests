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
    const {x: pX, y: pY} = point;
    const {x: cX, y: cY} = centerPoint;
    const vX = pX - cX;
    const vY = pY - cY;
    const magV = Math.sqrt(vX*vX + vY*vY);
    const aX = cX + vX / magV * radius;
    const aY = cY + vY / magV * radius;
    return {
        x: aX,
        y: aY
    }
};

/**
 * Gets closest rectangle point to the given point
 * @param {{x: number, y: number}} point - Input point
 * @param {{x: number, y: number, width: number, height: number}} rectangleBounds - Rectangle boundary points
 * @returns {{x: number, y: number}} - Returns closest point to the given point
 */
export const getClosestRectanglePoint = (point, rectangleBounds) => {

};