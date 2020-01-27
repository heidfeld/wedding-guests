import React from 'react';
import {Group} from 'react-konva';

import RoundTable from "../RoundTable/RoundTable";
import Chair from "../Chair/Chair";
import {isChair, isTable} from "./TypeConstants";

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
                id={id}
                type={type}
                isSelected={isSelected}
                updateSelection={updateSelection}
                x={x}
                y={y}
                rotation={angle}
                label={label}
            />
        );
    };

    const getAllTables = () => {
        return Object.values(data).filter(({type}) => isTable(type));
    };

    const getAllChairs = (parentId) => {
        return Object.values(data).filter(({parent, type}) => parent && parent === parentId && isChair(type));
    };

    const renderTable = (config) => {
        const {id, label, type} = config;
        const radius = 80;
        const chairs = getAllChairs(id);
        const allChairs = chairs.map((chair, idx) => {
            return renderChair({...chair, idx, max: chairs.length, radius: radius + 10});
        });

        return (
            <RoundTable
                id={id}
                type={type}
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
            {getAllTables().map(table => renderTable(table))}
        </Group>
    );

};

export default WeddingGuests;
