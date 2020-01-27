import React from 'react';
import PropTypes from 'prop-types';

import './css/ContextMenu.css';
import {isChair, isTable} from "../WeddingGuests/TypeConstants";

const ContextMenu = (props) => {

    const {data = {}, t, onRemove, onAdd} = props;
    const {id, label, type} = data;

    const handleRemove = (evt) => {
        onRemove(evt, data);
    };

    const handleAdd = (evt) => {
        onAdd(evt, data);
    };

    const renderTableButtons = () => {
        return (
            <div>
                <span>{`${label}`}</span>
                <button onClick={handleRemove}>{t('buttons.removeTable')}</button>
                <button onClick={handleAdd}>{t('buttons.addChair')}</button>
            </div>
        );
    };

    const renderChairButtons = () => {
        return (
            <div>
                <span>{`${label}`}</span>
                <button onClick={handleRemove}>{t('buttons.removeChair')}</button>
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
        <div className='ContextMenu'>
            {renderButtons()}
        </div>
    );

};

ContextMenu.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        type: PropTypes.string
    }),
    t: PropTypes.func,
    onRemove: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired
};

export default ContextMenu;