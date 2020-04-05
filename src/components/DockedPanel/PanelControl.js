import React from 'react';
import PropTypes from 'prop-types';

import {PANEL_SIDE} from './PanelConstants';
import './less/PanelControl.less';

const PanelControl = (props) => {

    const {dockedPanelRef, onExpand, side, expanded, t} = props;

    const oppositeSide = (side) => {
        switch (side) {
            case PANEL_SIDE.LEFT: {
                return PANEL_SIDE.RIGHT;
            }
            case PANEL_SIDE.RIGHT: {
                return PANEL_SIDE.LEFT;
            }
            case PANEL_SIDE.TOP: {
                return PANEL_SIDE.BOTTOM;
            }
            case PANEL_SIDE.BOTTOM: {
                return PANEL_SIDE.TOP;
            }
        }
    };

    return (
        <div>
            <div
                data-tip={expanded ? t('dockedPanel.collapse') : t('dockedPanel.expand')}
                data-place={oppositeSide(side)}
                className={`panelControl ${side}`}
                onClick={onExpand}
            >
                <i className='fa fa-bars ' aria-hidden='true'/>
            </div>
        </div>
    );

};

PanelControl.propTypes = {
    t: PropTypes.func.isRequired,
    dockedPanelRef: PropTypes.shape({
        current: PropTypes.shape({
            getBoundingClientRect: PropTypes.func.isRequired
        })
    }),
    side: PropTypes.oneOf(Object.values(PANEL_SIDE)),
    onExpand: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired
};

export default PanelControl;
