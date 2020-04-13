import React, {useEffect, memo, useRef} from 'react';
import PropTypes from 'prop-types';
import {Group, Text, Rect, Circle} from 'react-konva';
import {handleSelection, updateElement} from "../DiagramElementsHelper";

const RectTable = (props) => {

    const {x, y, width, height, children, label, id, updateSelection, isSelected, updateData} = props;

    const shapeRef = useRef(null);

    useEffect(() => {
        updateElement(id, updateData, shapeRef, {});
    }, []);

    const handleDragEnd = () => {
        updateElement(id, updateData, shapeRef, {}, true);
    };

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
            <Rect
                stroke={selected === true ? 'blue' : 'black'}
                strokeWidth={selected === true ? 3 : 1}
                width={width}
                height={height}
                fill={'white'}
            />
            <Text
                text={label}
                fontSize={20}
                fontFamily={'Shadows Into Light Two'}
                fontStyle={'bold'}
                align={'center'}
                verticalAlign={'middle'}
                width={width}
                height={height}
                x={0}
                y={0}
                color={'black'}
            />
            {children}
        </Group>
    );

};

RectTable.defaultProps = {
    x: 0,
    y: 0,
    width: 100,
    height: 50
};

RectTable.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    children: (PropTypes.element || PropTypes.arrayOf(PropTypes.element)),
    updateSelection: PropTypes.func.isRequired,
    isSelected: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired
};

export default memo(RectTable);
