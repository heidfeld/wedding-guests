import React from 'react';
import PropTypes from 'prop-types';
import {Group} from 'react-konva';

import RoundTable from '../../components/DiagramElements/RoundTable/RoundTable';
import RectTable from '../../components/DiagramElements/RectTable/RectTable';
import Chair from '../../components/DiagramElements/Chair/Chair';
import {getAllChairs, getAllTables} from './DataHelper';
import {TYPES} from "./TypeConstants";
import {getClosestTablePoint} from "../../components/DiagramElements/DiagramElementsHelper";

const DiagramElements = (props) => {

    const {data, isSelected, updateSelection, updateData} = props;

    const degToRad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const renderRoundTableChair = (config) => {
        const {id, name = '', surname = '', type, idx, max, radius, tableDimensions} = config;

        const {x: tableX, y: tableY} = tableDimensions;
        const angle = idx * 360 / max;
        const radians = degToRad(angle - 90);
        const absChairX = (radius) * Math.cos(radians) + tableX;
        const absChairY = (radius) * Math.sin(radians) + tableY;
        const {x, y} = getClosestTablePoint({x: absChairX, y: absChairY}, tableDimensions);
        return (
            <Chair
                key={id}
                id={id}
                type={type}
                tableType={TYPES.ROUND_TABLE}
                tableDimensions={tableDimensions}
                isSelected={isSelected}
                updateSelection={updateSelection}
                x={x - tableX}
                y={y - tableY}
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
        const tableDimensions = {radius, x, y};
        const allChairs = chairs.map((chair, idx) => {
            return renderRoundTableChair({
                ...chair, idx, max: chairs.length, radius: radius + 10, tableDimensions
            });
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
                tableType={TYPES.RECT_TABLE}
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
