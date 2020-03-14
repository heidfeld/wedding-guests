import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from "react-tooltip";

import './css/ContextMenu.css';
import {isChair, isTable} from "../WeddingGuests/TypeConstants";

const ContextMenu = (props) => {

    const {data = {}, t, onRemove, onAdd} = props;
    const {absX = 0, absY = 0, type} = data;

    const handleRemove = (evt) => {
        onRemove(evt, data);
    };

    const handleAdd = (evt) => {
        onAdd(evt, data);
    };

    const renderTableButtons = () => {
        return (
            <div>
                <button data-tip={t('buttons.removeTable')} className='btn btn-danger btn-sm' onClick={handleRemove}>
                    <i className="fa fa-trash" aria-hidden="true"/>
                </button>
                <button data-tip={t('buttons.addChair')} className='btn btn-info btn-sm' onClick={handleAdd}>
                    <i className="fa fa-plus" aria-hidden="true"/>
                </button>
            </div>
        );
    };

    const renderChairButtons = () => {
        return (
            <div>
                <button data-tip={t('buttons.removeChair')} className='btn btn-danger btn-sm' onClick={handleRemove}>
                    <i className="fa fa-trash" aria-hidden="true"/>
                </button>
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
    onAdd: PropTypes.func.isRequired
};

export default ContextMenu;