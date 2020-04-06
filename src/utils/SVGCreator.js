import {getAllStageChildren, getGraphBounds} from './KonvaHelpers';
import SVGFontIcons from './SVGFontIcons';

class SVGCreator {

    //eslint-disable-next-line no-control-regex
    static NEW_LINE_BREAK = /\u000D\u000A|[\u000A\u000B\u000C\u000D\u0085\u2028\u2029]/;
    static escapedCharacters = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;'
    };

    static escapeSpecialChar = (text) => {
        return text.replace(new RegExp(`[${Object.keys(SVGCreator.escapedCharacters).join()}]`, 'g'), (key) => {
            return SVGCreator.escapedCharacters[key] || key;
        });
    };

    static createFromStage(stage) {
        const stageCopy = stage.clone();

        const shapes = getAllStageChildren(stageCopy);

        const {width, height} = SVGCreator.prepareStageDimensions(stageCopy, shapes);
        const svgElements = shapes.map(SVGCreator.createSvgElement);

        let svgText = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;
        svgText = svgElements.reduce((result, svgElement) => `${result}\n${svgElement}`, svgText);
        return `${svgText}\n</svg>`;
    }

    static getComparedValue(comparator, oldValue, newValue) {
        if (!comparator(oldValue, newValue) || typeof oldValue === 'undefined') {
            return newValue;
        }
        return oldValue;
    }

    static removeSpaces(string) {
        return string.trim().replace(/  +/g, ' ');
    }

    static prepareStageDimensions(stage, shapes) {
        const {minX, maxX, minY, maxY} = getGraphBounds(stage, shapes);
        shapes.forEach((shape) => {
            shape.x(shape.x() - minX);
            shape.y(shape.y() - minY);
        });
        const width = maxX - minX;
        const height = maxY - minY;
        stage.width(width);
        stage.height(height);
        return {
            width,
            height
        };
    }

    static createSvgElement(shape, additionalAttrs = {}) {
        const {visible} = shape.getAttrs();
        if (visible === false) {
            return '';
        }
        const className = shape.getClassName();
        switch (className) {
            case 'Group':
                return SVGCreator.createGroup(shape, additionalAttrs);
            case 'Text':
                return SVGCreator.createText(shape, additionalAttrs);
            case 'Line':
                return SVGCreator.createLine(shape, additionalAttrs);
            case 'Rect' :
                return SVGCreator.createRect(shape, additionalAttrs);
            case 'Circle' :
                return SVGCreator.createCircle(shape, additionalAttrs);
        }
    }

    static getTransformAttribute(attrs) {
        const {x = 0, y = 0, offsetX = 0, offsetY = 0, rotation, rotationX = 0, rotationY = 0, scale} = attrs;
        const translate = (x || y || offsetX || offsetY) ? `translate(${x - offsetX}, ${y - offsetY})` : '';
        const rotate = rotation ? `rotate(${rotation}, ${rotationX}, ${rotationY})` : '';
        const scaleAttr = scale ? `scale(${scale})` : '';
        const transform = SVGCreator.removeSpaces(`${translate} ${rotate} ${scaleAttr}`);
        return transform ? `transform="${transform}"` : '';
    }

    static getStyle({fill = 'none', stroke = 'none', strokeWidth, dash}) {
        const fillAttr = fill ? `fill:${fill};` : '';
        const strokeAttr = stroke ? `stroke:${stroke};` : '';
        const strokeWidthAttr = strokeWidth ? `stroke-width:${strokeWidth};` : '';
        const dashArray = Array.isArray(dash) && dash.length ? `stroke-dasharray:${dash.join(' ')};` : '';
        const style = SVGCreator.removeSpaces(`${fillAttr} ${strokeAttr} ${strokeWidthAttr} ${dashArray}`);
        return `style="${style}"`;
    }

    static getBaseAttributes({offsetX = 0, offsetY = 0, rotation = 0, scale = 0, ...attrs}) {
        const style = SVGCreator.getStyle(attrs);
        const transform = SVGCreator.getTransformAttribute({offsetX, offsetY, rotation, scale});
        return SVGCreator.removeSpaces(`${style} ${transform}`);
    }

    static createGroup(shape) {
        const {x = 0, y = 0, offsetX = 0, offsetY = 0, rotation = 0, scaleX = 1, scaleY = 1} = shape.getAttrs();
        const children = shape.getChildren();
        const elements = children.map(child => SVGCreator.createSvgElement(child, {rotation}));
        const filteredElements = elements.filter(element => element);
        const transform = SVGCreator.getTransformAttribute({
            x,
            y,
            offsetX: offsetX * scaleX,
            offsetY: offsetY * scaleY,
            scale: scaleX
        });
        return `<g ${transform}>\n${filteredElements.join('\n')}\n</g>`;
    }

    static createText(shape, {rotation}) {
        const {fontSize, text, symbol, x, y, ...rest} = shape.getAttrs();
        if (symbol) {
            return SVGCreator.createSymbol(shape);
        }
        const baseAttrs = SVGCreator.getBaseAttributes(rest);
        if (text) {
            const textArray = text.split(SVGCreator.NEW_LINE_BREAK);
            let innerText = text;
            if (textArray.length > 1) {
                innerText = textArray.map((msg, idx) => {
                    return `<tspan x="0" dy="${fontSize * idx}">${SVGCreator.escapeSpecialChar(msg)}</tspan>`;
                });
            }
            const escapedText = SVGCreator.escapeSpecialChar(innerText);
            const svgText = `<text font-size="${fontSize}" ${baseAttrs}>${escapedText}</text>`;
            const transform = SVGCreator.getTransformAttribute({
                x,
                y,
                offsetY: -fontSize,
                rotation,
                rotationX: shape.textWidth / 2,
                rotationY: shape.textHeight / 2
            });
            return `<g ${transform}>\n${svgText}\n</g>`;
        }
        return '';
    }

    static createSymbol(shape) {
        const {symbol, fontSize, offsetX, offsetY, rotation, ...rest} = shape.getAttrs();
        const {svgPath, height} = SVGFontIcons[symbol];
        const style = SVGCreator.getStyle(rest);
        const scale = fontSize / height;
        const transform = SVGCreator.getTransformAttribute({offsetX, offsetY, rotation, scale});
        const path = `<path ${style} d="${svgPath}"/>`;
        return `<g ${transform}>\n${path}\n</g>`;
    }

    static factorion(n) {
        return n === 0 || n === 1 ? 1 : (n * SVGCreator.factorion(n - 1));
    }

    static calculateBezierNCurvePoint(t, points) {
        let resultX = 0;
        let resultY = 0;
        const n = points.length / 2 - 1;
        const factorian = SVGCreator.factorion;
        for (let i = 0; i <= n; i++) {
            /**
             *  ( n )             n!
             *  (   )    =   ___________
             *  ( k )        k! (n - k)!
             *
             * where n! = factorian(n)
             * @type {number}
             */
            const binomialCoefficient = factorian(n) / (factorian(i) * factorian(n - i));
            const curveFactor = binomialCoefficient * (1 - t) ** (n - i) * (t ** i);
            resultX += curveFactor * points[2 * i];
            resultY += curveFactor * points[2 * i + 1];
        }
        return [resultX, resultY];
    }

    static calculateBezierNCurve(points) {
        const dt = 0.01;
        const result = [...points.slice(0, 2)];
        for (let t = dt; t < 1; t += dt) {
            const bezierPoints = SVGCreator.calculateBezierNCurvePoint(t, points);
            result.push(...bezierPoints);
        }
        result.push(...points.slice(-1, 2));
        return result;
    }

    static calculateBezierControlPoint([sx, sy], [mx, my], [ex, ey]) {
        const t = 0.5;
        const cx = (mx - (1 - t) * (1 - t) * sx - t * t * ex) / (2 * (1 - t) * t);
        const cy = (my - (1 - t) * (1 - t) * sy - t * t * ey) / (2 * (1 - t) * t);
        return [cx, cy];
    }

    static calculateBezierCurve(points) {
        const start = [points[0], points[1]];
        const middle = [points[2], points[3]];
        const end = [points[4], points[5]];
        const controlPoint = SVGCreator.calculateBezierControlPoint(start, middle, end);
        return SVGCreator.calculateBezierNCurve([...start, ...controlPoint, ...end]);
    }

    //Logical View specific bend lines with deviation, it should be changed to tension algorithm
    static handleBezierCurve(points) {
        if (points.length === 10) {
            const firstSegment = SVGCreator.calculateBezierCurve(points.slice(0, 6));
            const secondSegment = SVGCreator.calculateBezierCurve(points.slice(4, 10));
            return [...firstSegment, ...secondSegment];
        }
        //default
        return SVGCreator.calculateBezierCurve(points);
    }

    static createLine(shape) {
        const {points, deviation, ...rest} = shape.getAttrs();
        let preparedPoints = points;
        const baseAttrs = SVGCreator.getBaseAttributes(rest);
        if (deviation) {
            preparedPoints = SVGCreator.handleBezierCurve(points);
        }
        return `<polyline points="${preparedPoints}" ${baseAttrs}/>`;
    }

    static createRect(shape) {
        const {x = 0, y = 0, width, height, ...rest} = shape.getAttrs();
        const baseAttrs = SVGCreator.getBaseAttributes(rest);
        return `<rect x="${x}" y="${y}" width="${width}" height="${height}" ${baseAttrs}/>`;
    }

    static createCircle(shape) {
        const {x = 0, y = 0, radius = 0, ...rest} = shape.getAttrs();
        const baseAttrs = SVGCreator.getBaseAttributes(rest);
        return `<circle cx="${x}" cy="${y}" r="${radius}" ${baseAttrs}/>`;
    }

}

export default SVGCreator;
