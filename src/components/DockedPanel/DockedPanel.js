import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';

import {PANEL_SIDE} from './PanelConstants';
import PanelControl from './PanelControl';
import './less/DockedPanel.less';

const DockedPanel = (props) => {

    const {children, side, parentWidth, parentHeight, t} = props;

    const [expanded, setExpanded] = useState(true);

    const panelRef = useRef(null);

    const isVertical = (side) => side === PANEL_SIDE.RIGHT || side === PANEL_SIDE.LEFT;

    const getClassNames = () => {
        const baseClasses = 'dockedPanel';
        return `${baseClasses} ${side}${expanded ? ' expanded' : ''}`;
    };

    const onExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={getClassNames()} onClick={onExpand}>
            <div className={`content ${side}`}>
                <div className='contentBody' ref={panelRef}>
                    {children}
                </div>
            </div>
            <PanelControl
                onExpand={onExpand}
                dockedPanelRef={panelRef}
                side={side}
                t={t}
                expanded={expanded}
            />
        </div>
    );

};

DockedPanel.defaultProps = {
    parentWidth: 1,
    parentHeight: 1
};

DockedPanel.propTypes = {
    children: PropTypes.element || PropTypes.arrayOf(PropTypes.element),
    side: PropTypes.oneOf(Object.values(PANEL_SIDE)).isRequired,
    parentWidth: PropTypes.number,
    parentHeight: PropTypes.number,
    t: PropTypes.func.isRequired
};

export default DockedPanel;
