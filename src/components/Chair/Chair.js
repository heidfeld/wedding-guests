import React from 'react';
import PropTypes from 'prop-types';
import {Group, Text, Circle} from 'react-konva';

const Chair = (props) => {

    const {id, size, label, rotation, x, y, updateSelection, isSelected} = props;

    const handleSelection = (evt) => {
        const {evt: {ctrlKey} = {}} = evt;
        if (ctrlKey === true) {
            updateSelection(id, true);
        }
        updateSelection(id);
        evt.cancelBubble = true;
    };

    const radius = 15;
    const selected = isSelected(id);

    return (
        <Group x={x} y={y} draggable={true} onClick={handleSelection}>
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
    isSelected: PropTypes.func.isRequired
};

export default Chair;