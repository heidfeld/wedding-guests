import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {PANEL_SIDE} from './PanelConstants';
import PanelControl from './PanelControl';
import './less/DockedPanel.less';

const DockedPanel = (props) => {

    const {children, side, parentWidth, parentHeight} = props;

    const [expanded, setExpanded] = useState(true);

    const isVertical = (side) => side === PANEL_SIDE.RIGHT || side === PANEL_SIDE.LEFT;

    const getClassNames = () => {
        const baseClasses = 'dockedPanel';
        return `${baseClasses} ${side}${expanded ? ' expanded' : ''}`;
    };

    const getStyles = () => {
        if (side === PANEL_SIDE.TOP || side === PANEL_SIDE.BOTTOM) {
            return {
                height: 400
            };
        }
        return {
            width: 400
        };
    };

    const onExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={getClassNames()} onClick={onExpand}>
            <div className={`content ${side}`} style={getStyles()}>
                <div className='contentBody'>
                    {children}
                </div>
            </div>
            <PanelControl onExpand={onExpand}/>
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
    parentHeight: PropTypes.number

};

export default DockedPanel;
