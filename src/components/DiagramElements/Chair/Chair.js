import React, {memo, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Group, Text, Circle} from 'react-konva';

import {updateElement, handleSelection} from '../js/DiagramElementsHelper';

const Chair = (props) => {

    const {id, size, label, x, y, updateSelection, isSelected, updateData} = props;

    const shapeRef = useRef(null);

    useEffect(() => {
        updateElement(id, updateData, shapeRef, {});
    }, [x, y]);

    const handleDragEnd = () => {
        updateElement(id, updateData, shapeRef, {});
    };

    const radius = 15;
    const selected = isSelected(id);

    return (
        <Group
            x={x}
            y={y}
            draggable={true}
            onClick={(evt) => handleSelection(id, updateSelection, evt)}
            onDragEnd={handleDragEnd}
            ref={shapeRef}
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
    label: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    size: PropTypes.number,
    updateSelection: PropTypes.func.isRequired,
    isSelected: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired
};

export default memo(Chair);