import React from 'react';
import PropTypes from 'prop-types';
import {Group, Text, Circle} from 'react-konva';

import RoundTable from "../RoundTable/RoundTable";
import Chair from "../Chair/Chair";

const WeddingGuests = (props) => {

    const {data, isSelected, updateSelection} = props;

    const degToRad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const renderChair = (config) => {
        const {id, label, type, idx, max, radius} = config;

        const angle = idx * 360 / max;
        const radians = degToRad(angle - 90);
        const x = (radius) * Math.cos(radians);
        const y = (radius) * Math.sin(radians);
        return (
            <Chair
                x={x}
                y={y}
                rotation={angle}
                label={label}
            />
        );
    };

    const renderTable = (config) => {
        const {id, label, type, chairs = []} = config;
        const radius = 80;
        const allChairs = chairs.map((chair, idx) => {
            return renderChair({...chair, idx, max: chairs.length, radius: radius + 10});
        });

        return (
            <RoundTable
                id={id}
                isSelected={isSelected}
                updateSelection={updateSelection}
                label={label}
                chairs={allChairs}
                radius={radius}
            />
        );
    };

    return (
        <Group>
            {data.map(table => renderTable(table))}
        </Group>
    );

};

export default WeddingGuests;
