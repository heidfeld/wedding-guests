import React from 'react';
import PropTypes from 'prop-types';
import {Group, Text, Circle} from 'react-konva';

import {generateAllChairs} from "./ChairGenerator";
import RoundTable from "../RoundTable/RoundTable";

const WeddingGuests = (props) => {

    const {data, isSelected, updateSelection} = props;

    const renderChair = () => {
    }

    const renderTable = (config) => {

        const {id, label, type} = config;

        return (
            <RoundTable
                id={id}
                isSelected={isSelected}
                updateSelection={updateSelection}
                label={label}
                chairs={generateAllChairs(10)}
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
