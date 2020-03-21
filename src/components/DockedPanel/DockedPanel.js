import React from 'react';
import PropTypes from 'prop-types';

import './css/DockedPanel.css';

export const PANEL_SIDE = {
    LEFT: 'Left',
    RIGHT: 'Right',
    BOTTOM: 'Bottom',
    TOP: 'Top'
};

const DockedPanel = (props) => {

    const {component, side} = props;

    const getSideClassName = () => {
        switch (side) {
            case PANEL_SIDE.RIGHT:
                return 'rightPanel verticalPanel';
            case PANEL_SIDE.LEFT:
                return 'leftPanel verticalPanel';
            case PANEL_SIDE.TOP:
                return 'topPanel horizontalPanel';
            case PANEL_SIDE.BOTTOM:
                return 'bottomPanel horizontalPanel';
            default:
                return '';
        }
    };

    const getPanelClassName = () => {
        return `dockedPanel ${getSideClassName()}`;
    };

    const handleControlClick = () => {
        console.log('Docked panel hide');
    };

    return (
        <div>
            <div className='rightControl' onClick={handleControlClick}/>
            <div className={getPanelClassName()}>
                {component}
            </div>
        </div>
    );

};

DockedPanel.propTypes = {
    component: PropTypes.element.isRequired,
    side: PropTypes.oneOf(Object.values(PANEL_SIDE)).isRequired

};

export default DockedPanel;
