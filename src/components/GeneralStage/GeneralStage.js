import React, {useState, useLayoutEffect} from 'react';
import {Stage, Layer} from "react-konva";
import PropTypes from 'prop-types';

import WeddingGuests from '../WeddingGuests/WeddingGuests';
import {isTable, TYPES} from '../WeddingGuests/TypeConstants';
import ContextMenu from '../ContextMenu/ContextMenu';
import './less/GeneralStage.less';
import DefaultMenu from '../ContextMenu/DefaultMenu';
import {getAllChairs} from './DataHelper';
import DockedPanel, {PANEL_SIDE} from "../DockedPanel/DockedPanel";
import EditableTable from '../EditableTable/EditableTable';

const GeneralStage = (props) => {

    const {t} = props;

    const [data, setData] = useState({});
    const [selection, setSelection] = useState([]);

    const [size, setSize] = useState([0, 0]);

    useLayoutEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const guid = () => {
        const S4 = () => {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };

    const updateChairs = (id, prevData, properties) => {
        const {absX, absY} = properties;
        const {absX: prevAbsX, absY: prevAbsY} = prevData[id];
        const chairs = getAllChairs(prevData, id);
        chairs.forEach((chair) => {
            const {id: chairId, absX: chAbsX, absY: chAbsY} = chair;
            prevData[chairId] = {
                ...chair,
                absX: chAbsX + absX - prevAbsX,
                absY: chAbsY + absY - prevAbsY
            };
        });

    };

    const updateData = (id, properties = {}, updateChildren = false) => {
        setData((prevData) => {
            const dataCopy = {...prevData};
            const cachedElement = dataCopy[id];
            if (id && cachedElement) {
                const {type} = cachedElement;
                if (updateChildren && isTable(type)) {
                    updateChairs(id, dataCopy, properties);
                }
                dataCopy[id] = {...cachedElement, ...properties};
                return dataCopy;
            }
            return prevData;
        });
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
            name: `${t('data.guest')} ${getAllChairs(data).length + 1}`,
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

    const renderGuestTable = () => {
        return (
            <EditableTable t={t} tableData={data}/>
        );
    };

    const [width, height] = size;

    return (
        <div>
            <DockedPanel component={renderGuestTable()} side={PANEL_SIDE.RIGHT}/>
            {withMenu() === true ? renderContextMenu() : renderDefaultMenu()}
            <div id="container"/>
            <Stage
                width={width}
                height={height}
                fill={'blue'}
                container={'container'}
                onClick={() => updateSelection()}>
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