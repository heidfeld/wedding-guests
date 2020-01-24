import React from 'react';
import PropTypes from 'prop-types';
import {Group, Text, Rect} from 'react-konva';

const Chair = (props) => {

    const {size, label, rotation, x, y} = props;

    return (
        <Group x={x} y={y} draggable={true} >
            <Group rotation={rotation}>
                <Rect
                    stroke={'black'}
                    strokeWidth={1}
                    width={size}
                    height={size / 5}
                    fill={'gray'}
                    x={0}
                    y={0}
                />
                <Rect
                    stroke={'black'}
                    strokeWidth={1}
                    width={size}
                    height={size - (size / 5)}
                    x={0}
                    y={size / 5}
                    fill={'white'}
                />
            </Group>
            <Text
                text={label}
                fontSize={12}
                align={'center'}
                verticalAlign={'middle'}
                x={0}
                y={rotation > 180 ? 0 : -12}
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