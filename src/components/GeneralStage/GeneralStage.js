import React, { useState } from 'react';
import {Stage, Layer} from "react-konva";

import WeddingGuests from "../WeddingGuests/WeddingGuests";
import "./css/GeneralStage.css";

const GeneralStage = (props) => {

    const [data, setData] = useState({
        "t1": {
            id: "t1",
            label: "Stolik Pierwszy",
            type: "RoundTable"
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
    }

    const isSelected = (key) => {
        const selected = key ? !!~selection.indexOf(key) : false;
        console.log(key + ' selected: ' + selected);
        return selected === true;
    }

    return (
        <div>
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
}

export default GeneralStage;