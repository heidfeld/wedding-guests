import React, {memo, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {Circle, Group, Text} from 'react-konva';

import {getClosestTablePoint, handleSelection, updateElement} from '../DiagramElementsHelper';
import {TYPES} from "../../../widgets/WeddingGuests/TypeConstants";

const Chair = (props) => {

    const {id, size, label, x, y, updateSelection, isSelected, updateData, tableType, tableDimensions} = props;

    const shapeRef = useRef(null);

    useEffect(() => {
        updateElement(id, updateData, shapeRef, {});
    }, [x, y]);

    const handleDragEnd = () => {
        updateElement(id, updateData, shapeRef, {});
    };

    const radius = 15;
    const selected = isSelected(id);

    const handleDragging = (position) => {
        if (tableType === TYPES.RECT_TABLE) {
            return position;
        }
        if (tableType === TYPES.ROUND_TABLE) {
            return getClosestTablePoint(position, tableDimensions);
        }
        return position;
    };

    return (
        <Group
            x={x}
            y={y}
            draggable={true}
            onClick={(evt) => handleSelection(id, updateSelection, evt)}
            onDragEnd={handleDragEnd}
            ref={shapeRef}
            dragBoundFunc={handleDragging}
        >
            <Circle
                stroke={selected === true ? 'blue' : 'black'}
                strokeWidth={selected === true ? 3 : 1}
                width={size}
                height={size / 5}
                fill={'lightgray'}
                x={0}
                y={0}
                radius={radius}
            />
            <Text
                text={label}
                fontSize={10}
                fontFamily={'Shadows Into Light Two'}
                align={'center'}
                verticalAlign={'middle'}
                width={radius * 2}
                height={radius * 2}
                x={-radius}
                y={-radius}
            />
        </Group>
    );

};

Chair.defaultProps = {
    size: 25
};

Chair.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    tableType: PropTypes.string.isRequired,
    tableDimensions: PropTypes.shape({
        radius: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number
    }),
    label: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    size: PropTypes.number,
    updateSelection: PropTypes.func.isRequired,
    isSelected: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired
};

export default memo(Chair);