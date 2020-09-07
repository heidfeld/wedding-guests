import React, {useLayoutEffect, useRef, useState} from 'react';
import {Layer, Stage} from "react-konva";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import DiagramElements from './DiagramElements';
import {isChair, isRectTable, isRoundTable, isTable, TYPES} from './TypeConstants';
import ContextMenu from '../../components/ContextMenu/ContextMenu';
import './less/WeddingGuests.less';
import DefaultMenu from '../../components/ContextMenu/DefaultMenu';
import {getAllChairs, getSelectedEntities} from './DataHelper';
import DockedPanel from '../../components/DockedPanel/DockedPanel';
import {PANEL_SIDE} from '../../components/DockedPanel/PanelConstants';
import GuestTable from '../../widgets/GuestTable/GuestTable';
import {exportPDF, exportPNG, exportSVG} from '../../utils/ExportKonva';
import selectedObjectsChanged from '../../config/redux/actions/widgets/selectedObjectsChanged';
import ReduxStateHelper from '../../config/redux/helpers/ReduxStateHelper';

const WEDDING_GUESTS_WIDGET_ID = 'wedding-guests-widget-id';

const WeddingGuests = (props) => {

    const {t, selectedObjects, selectedObjectsChanged} = props;

    const containerRef = useRef(null);
    const stageRef = useRef(null);

    const [data, setData] = useState({});
    const [size, setSize] = useState([1, 1]);

    useLayoutEffect(() => {
        const updateSize = () => {
            const {width, height} = containerRef.current.getBoundingClientRect();
            const elementWidth = width < 10 ? window.innerWidth : width;
            const elementHeight = height < 10 ? window.innerHeight : height;
            setSize([elementWidth, elementHeight]);
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
            selectedObjectsChanged(WEDDING_GUESTS_WIDGET_ID, [...selectedObjects, id]);
        } else if (id) {
            selectedObjectsChanged(WEDDING_GUESTS_WIDGET_ID, [id]);
        } else {
            selectedObjectsChanged(WEDDING_GUESTS_WIDGET_ID, []);
        }
    };

    const isSelected = (id) => {
        const selected = id ? !!~selectedObjects.indexOf(id) : false;
        return selected === true;
    };

    const withMenu = () => {
        return !!selectedObjects.length;
    };

    const getFirstSelected = () => {
        const firstSelected = selectedObjects.find(entity => entity);
        return data[firstSelected];
    };

    const removeElement = (id) => {
        const dataCopy = {...data};
        const cachedElement = dataCopy[id];
        const {type} = cachedElement;
        if (cachedElement) {
            delete dataCopy[id];
            if (isTable(type)) {
                getAllChairs(dataCopy, id).forEach(chair => {
                    const {id: chairId} = chair;
                    if (chairId && dataCopy[chairId]) {
                        delete dataCopy[chairId];
                    }
                });
            }
        }
        setData(dataCopy);
    };

    const onRemove = (evt, config = {}) => {
        const {id} = config;
        if (id) {
            removeElement(id);
        }
    };

    const addRoundTable = () => {
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

    const addRectTable = () => {
        const randomId = guid();
        const tableConfig = {
            id: randomId,
            label: "Table",
            type: TYPES.RECT_TABLE,
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

    const onAdd = (evt, config = {}, parentConfig = {}) => {
        const {type} = config;
        const {id: parentId, type: parentType} = parentConfig;
        if (parentType && isTable(parentType)) {
            addChair(parentId);
        } else if (isRoundTable(type)) {
            addRoundTable();
        } else if (isRectTable(type)) {
            addRectTable();
        }
    };

    const onSwitch = () => {
        const selectedEntities = getSelectedEntities(selectedObjects, data);
        const selectedTable = selectedEntities.find(({type}) => isTable(type));
        const selectedChair = selectedEntities.find(({type}) => isChair(type));
        if (selectedTable && selectedChair) {
            const {id: tableId} = selectedTable;
            const {id: chairId} = selectedChair;
            const dataCopy = {...data};
            dataCopy[chairId] = {...(dataCopy[chairId] || {}), parent: tableId};
            setData(dataCopy);
        }
    };

    const renderContextMenu = () => {
        return (
            <ContextMenu
                data={getFirstSelected()}
                selectedEntities={getSelectedEntities(selectedObjects, data)}
                onRemove={onRemove}
                onAdd={onAdd}
                onSwitch={onSwitch}
                t={t}
            />
        );
    };

    const renderDefaultMenu = () => {
        return (
            <DefaultMenu
                onAdd={onAdd}
                exportPDF={() => exportPDF(stageRef.current, 6)}
                exportPNG={() => exportPNG(stageRef.current, 6)}
                exportSVG={() => exportSVG(stageRef.current)}
                t={t}
            />
        );
    };

    const renderGuestTable = () => {
        return (
            <GuestTable t={t} data={data} updateData={updateData}/>
        );
    };

    const [width, height] = size;

    return (
        <div>
            {withMenu() ? renderContextMenu() : renderDefaultMenu()}
            <div id="container" ref={containerRef}>
                <DockedPanel side={PANEL_SIDE.RIGHT} parentHeight={height} parentWidth={width} t={t}>
                    {renderGuestTable()}
                </DockedPanel>
            </div>
            <Stage
                width={width}
                height={height}
                fill={'blue'}
                container={'container'}
                onClick={() => updateSelection()}
                ref={stageRef}
            >
                <Layer>
                    <DiagramElements
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

WeddingGuests.defaultProps = {
    selectedObjects: []
};

WeddingGuests.propTypes = {
    t: PropTypes.func,
    selectedObjects: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = (state = {}, props) => {
    const selectedObjects = ReduxStateHelper.getSelectedObjectsForId(state, WEDDING_GUESTS_WIDGET_ID);
    return {
        selectedObjects
    };
};

const mapDispatchToProps = {
    selectedObjectsChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(WeddingGuests);