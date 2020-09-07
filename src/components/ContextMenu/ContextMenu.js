import React from 'react';
import PropTypes from 'prop-types';

import './less/ContextMenu.less';
import {isChair, isTable, TYPES} from "../../widgets/WeddingGuests/TypeConstants";
import ReactTooltip from "react-tooltip";
import {isSingleSelection} from "../../widgets/WeddingGuests/DataHelper";

const ContextMenu = (props) => {

    const {data = {}, selectedEntities, t, onRemove, onAdd, onSwitch} = props;
    const {absX = 0, absY = 0, type} = data;

    const handleRemove = (evt) => {
        onRemove(evt, data);
    };

    const handleAdd = (evt) => {
        onAdd(evt, {type: TYPES.ROUND_CHAIR}, data);
    };

    const handleSwitch = (evt) => {
        onSwitch(evt, data);
    };

    const renderRemoveTableButton = () => {
        return (
            <button data-tip={t('buttons.removeTable')} className='btn btn-danger btn-sm' onClick={handleRemove}>
                <i className="fa fa-trash" aria-hidden="true"/>
            </button>
        );
    }

    const renderAddChairButton = () => {
        return (
            <button data-tip={t('buttons.addChair')} className='btn btn-info btn-sm' onClick={handleAdd}>
                <i className="fa fa-plus" aria-hidden="true"/>
            </button>
        );
    }

    const renderTableButtons = () => {
        return (
            <div>
                {isSingleSelection(selectedEntities) ? renderRemoveTableButton() : null}
                {isSingleSelection(selectedEntities) ? renderAddChairButton() : null}
            </div>
        );
    };

    const renderRemoveChairButton = () => {
        return (
            <button data-tip={t('buttons.removeChair')} className='btn btn-danger btn-sm' onClick={handleRemove}>
                <i className="fa fa-trash" aria-hidden="true"/>
            </button>
        );
    }

    const renderSwitchChairButton = () => {
        return (
            <button data-tip={t('buttons.changeTable')} className='btn btn-warning btn-sm' onClick={handleSwitch}>
                <i className="fa fa-exchange" aria-hidden="true"/>
            </button>
        );
    }

    const isTableAndChairSwitchPossible = () => {
        const selectedTables = selectedEntities.filter(({type}) => isTable(type));
        const selectedChairs = selectedEntities.filter(({type}) => isChair(type));
        return selectedChairs.length === 1 && selectedTables.length === 1;
    };

    const renderChairButtons = () => {
        return (
            <div>
                {isSingleSelection(selectedEntities) ? renderRemoveChairButton() : null}
                {isTableAndChairSwitchPossible() ? renderSwitchChairButton() : null}
            </div>
        );
    };

    const renderButtons = () => {
        if (isTable(type)) {
            return renderTableButtons();
        } else if (isChair(type)) {
            return renderChairButtons();
        }
        return null;
    };

    return (
        <div className='ContextMenu' style={{left: absX, top: absY}}>
            <ReactTooltip/>
            {renderButtons()}
        </div>
    );

};

ContextMenu.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        type: PropTypes.string,
        absX: PropTypes.number,
        absY: PropTypes.number
    }),
    t: PropTypes.func,
    onRemove: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onSwitch: PropTypes.func.isRequired,
    selectedEntities: PropTypes.arrayOf(PropTypes.string)
};

export default ContextMenu;