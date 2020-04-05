import React from 'react';
import PropTypes from 'prop-types';

import './less/DefaultMenu.less';
import ReactTooltip from "react-tooltip";

const DefaultMenu = (props) => {

    const {t, onAdd} = props;

    const handleAdd = (evt) => {
        onAdd(evt);
    };

    return (
        <div className='ContextMenu'>
            <ReactTooltip/>
            <button
                data-place={'right'}
                data-tip={t('buttons.addTable')}
                className='btn btn-primary'
                onClick={handleAdd}
            >
                <i className="fa fa-plus" aria-hidden="true"/>
            </button>
        </div>
    );

};


DefaultMenu.propTypes = {
    onAdd: PropTypes.func.isRequired
};

export default DefaultMenu;