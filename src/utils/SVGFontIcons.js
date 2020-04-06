import {
    width as cloudWidth,
    height as cloudHeight,
    svgPathData as cloudSvgPath
} from '@fortawesome/free-solid-svg-icons/faCloud';
import {
    width as questionCircleWidth,
    height as questionCircleHeight,
    svgPathData as questionCircleSvgPath
} from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import {
    width as mapMarkerWidth,
    height as mapMarkerHeight,
    svgPathData as mapMarkerSvgPath
} from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import {
    width as circleWidth,
    height as circleHeight,
    svgPathData as circleSvgPath
} from '@fortawesome/free-solid-svg-icons/faCircle';

export default {
    'f0c2': {
        name: 'cloud',
        width: cloudWidth,
        height: cloudHeight,
        svgPath: cloudSvgPath
    },
    'f096': {
        name: 'square-o',
        width: 448,
        height: 512,
        svgPath: 'M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z'
    },
    'f059': {
        name: 'questioncircle',
        width: questionCircleWidth,
        height: questionCircleHeight,
        svgPath: questionCircleSvgPath
    },
    'f041': {
        name: 'map-marker',
        width: mapMarkerWidth,
        height: mapMarkerHeight,
        svgPath: mapMarkerSvgPath
    },
    'f0a0': {
        name: 'hdd-o',
        width: 576,
        height: 512,
        svgPath: 'M567.403 235.642L462.323 84.589A48 48 0 0 0 422.919 64H153.081a48 48 0 0 0-39.404 20.589L8.597 235.642A48.001 48.001 0 0 0 0 263.054V400c0 26.51 21.49 48 48 48h480c26.51 0 48-21.49 48-48V263.054c0-9.801-3-19.366-8.597-27.412zM153.081 112h269.838l77.913 112H75.168l77.913-112zM528 400H48V272h480v128zm-32-64c0 17.673-14.327 32-32 32s-32-14.327-32-32 14.327-32 32-32 32 14.327 32 32zm-96 0c0 17.673-14.327 32-32 32s-32-14.327-32-32 14.327-32 32-32 32 14.327 32 32z'
    },
    'f111': {
        name: 'circle',
        width: circleWidth,
        height: circleHeight,
        svgPath: circleSvgPath
    },
    'f28e': {
        name: 'stop-circle',
        width: 512,
        height: 512,
        svgPath: 'M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm296-80v160c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h160c8.8 0 16 7.2 16 16z'
    },
    '192': {
        name: 'dot-circle-alt',
        width: 512,
        height: 512,
        svgPath: 'M256 56c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m0-48C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 168c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80z'
    }

};
