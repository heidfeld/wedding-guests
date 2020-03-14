import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from "react-tooltip";

import './css/ContextMenu.css';
import {isChair, isTable} from "../WeddingGuests/TypeConstants";

const ContextMenu = (props) => {

    const {data = {}, t, onRemove, onAdd} = props;
    const {x = 0, y = 0, type} = data;

    const handleRemove = (evt) => {
        onRemove(evt, data);
    };

    const handleAdd = (evt) => {
        onAdd(evt, data);
    };

    const renderTableButtons = () => {
        return (
            <div>
                <button data-tip={t('buttons.removeTable')} className='btn btn-danger' onClick={handleRemove}>
                    <i className="fa fa-trash" aria-hidden="true"/>
                </button>
                <button data-tip={t('buttons.addChair')} className='btn btn-info' onClick={handleAdd}>
                    <i className="fa fa-plus" aria-hidden="true"/>
                </button>
            </div>
        );
    };

    const renderChairButtons = () => {
        return (
            <div>
                <button data-tip={t('buttons.removeChair')} className='btn btn-danger' onClick={handleRemove}>
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
        <div className='ContextMenu' style={{left: x - 100, top: y - 20}}>
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
        x: PropTypes.number,
        y: PropTypes.number
    }),
    t: PropTypes.func,
    onRemove: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired
};

export default ContextMenu;