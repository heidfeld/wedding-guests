import React from 'react';
import PropTypes from 'prop-types';

import {PANEL_SIDE} from './PanelConstants';
import './less/PanelControl.less';

const PanelControl = (props) => {

    const {dockedPanelRef, onExpand, side} = props;

    return (
        <div className={`panelControl ${side}`} onClick={onExpand}>
        </div>
    );

};

PanelControl.propTypes = {
    dockedPanelRef: PropTypes.shape({
        current: PropTypes.shape({
            getBoundingClientRect: PropTypes.func.isRequired
        })
    }),
    side: PropTypes.oneOf(Object.values(PANEL_SIDE)),
    onExpand: PropTypes.func.isRequired
};

export default PanelControl;
