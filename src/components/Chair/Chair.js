import React from 'react';
import PropTypes from 'prop-types';
import {Group, Text, Circle} from 'react-konva';

const Chair = (props) => {

    const {size, label, rotation, x, y} = props;

    const radius = 15;

    return (
        <Group x={x} y={y} draggable={true} >
                <Circle
                    stroke={'black'}
                    strokeWidth={1}
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
    label: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    size: PropTypes.number
};

export default Chair;