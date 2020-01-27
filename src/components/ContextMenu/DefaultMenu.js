import React from 'react';
import PropTypes from 'prop-types';

import './css/DefaultMenu.css';

const DefaultMenu = (props) => {

    const {t, onAdd} = props;

    const handleAdd = (evt) => {
        onAdd(evt);
    };

    return (
        <div className='ContextMenu'>
            <button onClick={handleAdd}>{t('buttons.addTable')}</button>
        </div>
    );

};


DefaultMenu.propTypes = {
    onAdd: PropTypes.func.isRequired
};

export default DefaultMenu;