import React from 'react';
import PropTypes from 'prop-types';

import {PANEL_SIDE} from './PanelConstants';
import './less/PanelControl.less';

const PanelControl = (props) => {

    const {dockedPanelRef, onExpand} = props;

    return (
        <div className={'vertical right'} onClick={onExpand}>

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
    parentHeight: PropTypes.number,
    parentWidth: PropTypes.number,
    onExpand: PropTypes.func.isRequired
};

export default PanelControl;
