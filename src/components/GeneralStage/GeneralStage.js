import React, { useState } from 'react';
import {Stage, Layer} from "react-konva";

import RoundTable from "../RoundTable/RoundTable";
import {generateAllChairs} from "./ChairGenerator";
import "./css/GeneralStage.css";

const GeneralStage = (props) => {

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
                    <RoundTable id={'t1'} isSelected={isSelected} updateSelection={updateSelection} label={'Stolik 1'} chairs={generateAllChairs(8)}/>
                    <RoundTable id={'t2'} isSelected={isSelected} updateSelection={updateSelection} label={'Stolik 2'} chairs={generateAllChairs(2)}/>
                    <RoundTable id={'t3'} isSelected={isSelected} updateSelection={updateSelection} label={'Stolik 3'} chairs={generateAllChairs(10)}/>
                    <RoundTable id={'t4'} isSelected={isSelected} updateSelection={updateSelection} label={'Stolik 4'} chairs={generateAllChairs(4)}/>
                </Layer>
            </Stage>
        </div>
    );
}

export default GeneralStage;