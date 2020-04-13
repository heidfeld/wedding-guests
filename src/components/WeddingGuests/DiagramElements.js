import React from 'react';
import PropTypes from 'prop-types';
import {Group} from 'react-konva';

import RoundTable from '../DiagramElements/RoundTable/RoundTable';
import RectTable from '../DiagramElements/RectTable/RectTable';
import Chair from '../DiagramElements/Chair/Chair';
import {getAllChairs, getAllTables} from './DataHelper';
import {TYPES} from "./TypeConstants";

const DiagramElements = (props) => {

    const {data, isSelected, updateSelection, updateData} = props;

    const degToRad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const renderRoundTableChair = (config) => {
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

    const renderRoundTable = (config) => {
        const {id, label, type, x, y} = config;
        const radius = 80;
        const chairs = getAllChairs(data, id);
        const allChairs = chairs.map((chair, idx) => {
            return renderRoundTableChair({...chair, idx, max: chairs.length, radius: radius + 10});
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
                radius={radius}
                updateData={updateData}
            >
                {allChairs}
            </RoundTable>
        );
    };

    const renderRectTableChair = (config) => {
        const {id, name = '', surname = '', type, tableWidth, tableHeight, idx, max} = config;
        const side = idx % 2;
        const sidePosition = Math.floor(idx / 2);
        const sideIdx = Math.ceil(max / 2);
        const isHorizontal = tableWidth > tableHeight;
        const offset = isHorizontal ? Math.round(tableWidth / sideIdx) : Math.round(tableHeight / sideIdx);
        const calculatedX = isHorizontal ? (sidePosition * offset) + (offset / 2) : side * tableWidth;
        const calculatedY = isHorizontal ? side * tableHeight : (sidePosition * offset) + (offset / 2);
        return (
            <Chair
                key={id}
                id={id}
                type={type}
                isSelected={isSelected}
                updateSelection={updateSelection}
                x={calculatedX}
                y={calculatedY}
                label={`${name} ${surname}`}
                updateData={updateData}
            />
        );
    };

    const renderRectTable = (config) => {
        const {id, label, type, x, y} = config;
        const width = 300;
        const height = 100;
        const chairs = getAllChairs(data, id);
        const allChairs = chairs.map((chair, idx) => {
            return renderRectTableChair({
                ...chair, idx, max: chairs.length, tableWidth: width, tableHeight: height
            });
        });
        return (
            <RectTable
                key={id}
                id={id}
                type={type}
                isSelected={isSelected}
                updateSelection={updateSelection}
                x={x}
                y={y}
                label={label}
                width={width}
                height={height}
                updateData={updateData}
            >
                {allChairs}
            </RectTable>
        );
    };

    const renderTable = (table) => {
        const {type} = table;
        if (type === TYPES.ROUND_TABLE) {
            return renderRoundTable(table);
        }
        return renderRectTable(table);
    };

    return (
        <Group>
            {getAllTables(data).map(table => renderTable(table))}
        </Group>
    );

};

DiagramElements.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape()),
    isSelected: PropTypes.func,
    updateSelection: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired
};

export default DiagramElements;
