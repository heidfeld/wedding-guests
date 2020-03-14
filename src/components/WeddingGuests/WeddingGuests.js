import React from 'react';
import PropTypes from 'prop-types';
import {Group} from 'react-konva';

import RoundTable from "../RoundTable/RoundTable";
import Chair from "../Chair/Chair";
import {isChair, isTable} from "./TypeConstants";

const WeddingGuests = (props) => {

    const {data, isSelected, updateSelection, updateData} = props;

    const degToRad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const renderChair = (config) => {
        const {id, label, type, idx, max, radius, x, y} = config;

        const angle = idx * 360 / max;
        const radians = degToRad(angle - 90);
        const calculatedX = (radius) * Math.cos(radians);
        const calculatedY = (radius) * Math.sin(radians);
        return (
            <Chair
                key={id}
                id={id}
                type={type}
                isSelected={isSelected}
                updateSelection={updateSelection}
                x={typeof x !== 'undefined' ? x : calculatedX}
                y={typeof y !== 'undefined' ? y : calculatedY}
                rotation={angle}
                label={label}
                updateData={updateData}
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
        const {id, label, type, x, y} = config;
        const radius = 80;
        const chairs = getAllChairs(id);
        const allChairs = chairs.map((chair, idx) => {
            return renderChair({...chair, idx, max: chairs.length, radius: radius + 10});
        });

        return (
            <RoundTable
                key={id}
                id={id}
                type={type}
                isSelected={isSelected}
                updateSelection={updateSelection}
                x={x}
                y={y}
                label={label}
                chairs={allChairs}
                radius={radius}
                updateData={updateData}
            />
        );
    };

    return (
        <Group>
            {getAllTables().map(table => renderTable(table))}
        </Group>
    );

};

WeddingGuests.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape()),
    isSelected: PropTypes.func,
    updateSelection: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired
};

export default WeddingGuests;
