import React from 'react';
import PropTypes from 'prop-types';

import './css/ContextMenu.css';

const ContextMenu = (props) => {

    const {data = {}, t} = props;
    const {id, label, type} = data;

    return (
        <div className='ContextMenu'>
            <span>{`${label}`}</span>
            <button>{t('buttons.removeTable')}</button>
        </div>
    );

};

ContextMenu.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
        type: PropTypes.string
    }),
    t: PropTypes.func
};

export default ContextMenu;