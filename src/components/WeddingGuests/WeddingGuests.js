import React from 'react';
import PropTypes from 'prop-types';
import {Group} from 'react-konva';

import RoundTable from '../DiagramElements/RoundTable/RoundTable';
import Chair from '../DiagramElements/Chair/Chair';
import {getAllChairs, getAllTables} from '../GeneralStage/DataHelper';

const WeddingGuests = (props) => {

    const {data, isSelected, updateSelection, updateData} = props;

    const degToRad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const renderChair = (config) => {
        const {id, name = '', surname = '', type, idx, max, radius} = config;

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
                x={calculatedX}
                y={calculatedY}
                rotation={angle}
                label={`${name} ${surname}`}
                updateData={updateData}
            />
        );
    };

    const renderTable = (config) => {
        const {id, label, type, x, y} = config;
        const radius = 80;
        const chairs = getAllChairs(data, id);
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
            {getAllTables(data).map(table => renderTable(table))}
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
