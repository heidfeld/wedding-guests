import React from 'react';
import PropTypes from 'prop-types';
import {Group, Text, Circle} from 'react-konva';

const RoundTable = (props) => {

    const {radius, chairs, label, id, updateSelection, isSelected} = props;

    const handleSelection = (evt) => {
        const {evt: {ctrlKey} = {}} = evt;
        if (ctrlKey === true) {
            updateSelection(id, true);
        }
        updateSelection(id);
        evt.cancelBubble = true;
    };

    const selected = isSelected(id);

    return (
        <Group x={200} y={200} draggable={true} onClick={handleSelection}>
            <Circle
                stroke={selected === true ? 'blue' : 'black'}
                strokeWidth={selected === true ? 3 : 1}
                radius={radius}
                fill={'white'}
            />
            <Text
                text={label}
                fontSize={20}
                align={'center'}
                verticalAlign={'middle'}
                width={radius * 2}
                height={radius * 2}
                x={-radius}
                y={-radius}
                color={'black'}
            />
            {chairs}
        </Group>
    );

};

RoundTable.defaultProps = {
    chairs: null,
    radius: 80
};

RoundTable.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    chairs: PropTypes.arrayOf(PropTypes.element),
    updateSelection: PropTypes.func.isRequired,
    isSelected: PropTypes.func.isRequired
};

export default RoundTable;