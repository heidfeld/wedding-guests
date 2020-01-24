import React from 'react';
import PropTypes from 'prop-types';
import {Group, Text, Circle} from 'react-konva';

const RoundTable = (props) => {

    const {radius, chairs, label} = props;

    return (
        <Group x={200} y={200} draggable={true}>
            <Circle
                stroke={'black'}
                strokeWidth={1}
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
    label: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    chairs: PropTypes.arrayOf(PropTypes.element)
};

export default RoundTable;