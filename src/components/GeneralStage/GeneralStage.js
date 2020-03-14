import React, {useState} from 'react';
import {Stage, Layer} from "react-konva";
import PropTypes from 'prop-types';

import WeddingGuests from "../WeddingGuests/WeddingGuests";
import {isTable, TYPES} from "../WeddingGuests/TypeConstants";
import ContextMenu from "../ContextMenu/ContextMenu";
import "./css/GeneralStage.css";
import DefaultMenu from "../ContextMenu/DefaultMenu";

const GeneralStage = (props) => {

    const {t} = props;

    const [data, setData] = useState({
        "t1": {id: "t1", label: "Stolik Pierwszy", type: TYPES.ROUND_TABLE, x: 200, y: 200},
        "ch1": {id: "ch1", label: "Chair1", type: TYPES.ROUND_CHAIR, parent: "t1"},
        "ch2": {id: "ch2", label: "Chair2", type: TYPES.ROUND_CHAIR, parent: "t1"},
        "ch3": {id: "ch3", label: "Chair3", type: TYPES.ROUND_CHAIR, parent: "t1"},
        "ch4": {id: "ch4", label: "Chair4", type: TYPES.ROUND_CHAIR, parent: "t1"},
        "ch5": {id: "ch5", label: "Chair5", type: TYPES.ROUND_CHAIR, parent: "t1"},
        "ch6": {id: "ch6", label: "Chair6", type: TYPES.ROUND_CHAIR, parent: "t1"},
        "ch7": {id: "ch7", label: "Chair7", type: TYPES.ROUND_CHAIR, parent: "t1"},
        "ch8": {id: "ch8", label: "Chair8", type: TYPES.ROUND_CHAIR, parent: "t1"}
    });
    const [selection, setSelection] = useState([]);

    const guid = () => {
        const S4 = () => {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };

    const updateData = (id, properties = {}) => {
        const dataCopy = {...data};
        const cachedElement = dataCopy[id];
        if (id && cachedElement) {
            dataCopy[id] = {...cachedElement, ...properties};
            setData(dataCopy)
        }
    };


    const updateSelection = (id, append = false) => {
        if (id && append === true) {
            setSelection([...selection, id]);
        } else if (id) {
            setSelection([id]);
        } else {
            setSelection([]);
        }
    };

    const isSelected = (id) => {
        const selected = id ? !!~selection.indexOf(id) : false;
        return selected === true;
    };

    const withMenu = () => {
        return selection.length === 1;
    };

    const getFirstSelected = () => {
        const firstSelected = selection.find(entity => entity);
        return data[firstSelected];
    };

    const removeElement = (id) => {
        const dataCopy = {...data};
        if (dataCopy[id]) {
            delete dataCopy[id];
        }
        setData(dataCopy);
    };

    const onRemove = (evt, config = {}) => {
        const {id} = config;
        if (id) {
            removeElement(id);
        }
    };

    const addTable = () => {
        const randomId = guid();
        const tableConfig = {
            id: randomId,
            label: "Table",
            type: TYPES.ROUND_TABLE,
            x: 200,
            y: 200
        };
        const newData = {...data, [randomId]: tableConfig};
        setData(newData);
    };

    const addChair = (parentId) => {
        const randomId = guid();
        const chairConfig = {
            id: randomId,
            label: "Chair",
            type: TYPES.ROUND_CHAIR,
            parent: parentId
        };
        const newData = {...data, [randomId]: chairConfig};
        setData(newData);
    };

    const onAdd = (evt, config = {}) => {
        const {id, type} = config;
        if (type && isTable(type)) {
            addChair(id);
        } else {
            addTable();
        }
    };

    const renderContextMenu = () => {
        return (
            <ContextMenu
                data={getFirstSelected()}
                onRemove={onRemove}
                onAdd={onAdd}
                t={t}
            />
        );
    };

    const renderDefaultMenu = () => {
        return (
            <DefaultMenu
                onAdd={onAdd}
                t={t}
            />
        );
    };

    return (
        <div>
            {withMenu() === true ? renderContextMenu() : renderDefaultMenu()}
            <div id="container"/>
            <Stage width={1200} height={800} fill={'blue'} container={'container'} onClick={() => updateSelection()}>
                <Layer>
                    <WeddingGuests
                        data={Object.values(data)}
                        updateSelection={updateSelection}
                        isSelected={isSelected}
                        updateData={updateData}
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