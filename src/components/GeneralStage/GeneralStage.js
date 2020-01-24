import React, { Component } from 'react';
import {Stage, Layer, Text} from "react-konva";

import RoundTable from "../RoundTable/RoundTable";
import {generateAllChairs} from "./ChairGenerator";
import "./css/GeneralStage.css";

class GeneralStage extends Component {

    render() {
        return (
            <div>
                <div id="container"/>
                <Stage width={1200} height={800} fill={'blue'} container={'container'}>
                    <Layer>
                        <Text text="Try click on rect" />
                        <RoundTable label={'Stolik 1'} chairs={generateAllChairs(8)}/>
                        <RoundTable label={'Stolik 2'} chairs={generateAllChairs(2)}/>
                        <RoundTable label={'Stolik 3'} chairs={generateAllChairs(10)}/>
                        <RoundTable label={'Stolik 4'} chairs={generateAllChairs(4)}/>
                    </Layer>
                </Stage>
            </div>
        );
    }
}

export default GeneralStage;