import React, { useState } from 'react';
import {Stage, Layer} from "react-konva";
import PropTypes from 'prop-types';

import WeddingGuests from "../WeddingGuests/WeddingGuests";
import ContextMenu from "../ContextMenu/ContextMenu";
import "./css/GeneralStage.css";

const GeneralStage = (props) => {

    const {t} = props;

    const [data, setData] = useState({
        "t1": {
            id: "t1",
            label: "Stolik Pierwszy",
            type: "RoundTable",
            chairs: [
                {id: "ch1", label: "Chair1", type: "RoundChair"},
                {id: "ch2", label: "Chair2", type: "RoundChair"},
                {id: "ch3", label: "Chair3", type: "RoundChair"},
                {id: "ch4", label: "Chair4", type: "RoundChair"},
                {id: "ch5", label: "Chair5", type: "RoundChair"},
                {id: "ch6", label: "Chair6", type: "RoundChair"},
                {id: "ch7", label: "Chair7", type: "RoundChair"},
                {id: "ch8", label: "Chair8", type: "RoundChair"}
            ]
        }
    });
    const [selection, setSelection] = useState([]);

    const updateSelection = (key, append = false) => {
        if (key && append === true) {
            setSelection([...selection, key]);
        } else if (key) {
            setSelection([key]);
        } else {
            setSelection([]);
        }
    };

    const isSelected = (key) => {
        const selected = key ? !!~selection.indexOf(key) : false;
        console.log(key + ' selected: ' + selected);
        return selected === true;
    };

    const withMenu = () => {
        return selection.length === 1;
    };

    const getFirstSelected = () => {
        const firstSelected = selection.find(entity => entity);
        return data[firstSelected];
    };

    return (
        <div>
            {withMenu() === true ? <ContextMenu data={getFirstSelected()} t={t}/> : null}
            <div id="container"/>
            <Stage width={1200} height={800} fill={'blue'} container={'container'} onClick={() => updateSelection()}>
                <Layer>
                    <WeddingGuests
                        data={Object.values(data)}
                        updateSelection={updateSelection}
                        isSelected={isSelected}
                    />
                </Layer>
            </Stage>
        </div>
    );
};

GeneralStage.propTypes = {
    t: PropTypes.func
};

export default GeneralStage;