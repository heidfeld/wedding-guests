import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import './less/ControlChooser.less';

const ControlChooser = (props) => {

    const {children, vertical, preview} = props;

    const [expanded, setExpanded] = useState(false);

    const renderControl = (element, idx) => {
        let controlClassName = `controlWrapper ${vertical ? 'vertical' : 'horizontal'}`;
        return (
            <div className={controlClassName} key={`control_${idx}`}>
                <ReactTooltip/>
                {element}
            </div>
        );
    };

    const renderControlChooserList = () => {
        return children.map((child, idx) => renderControl(child, idx));
    };

    const onExpand = () => {
        setExpanded(!expanded);
    };

    const renderControlChooserPreview = () => {
        return (
            <div className={'controlPreviewWrapper'} onClick={onExpand}>
                {preview}
            </div>
        );
    };

    return (
        <div className={`controlChooser ${vertical ? 'vertical' : 'horizontal'}`}>
            {renderControlChooserPreview()}
            {expanded ? renderControlChooserList() : null}
        </div>
    );

};

ControlChooser.defaultProps = {
    vertical: true
};

ControlChooser.propTypes = {
    preview: PropTypes.element.isRequired,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    vertical: PropTypes.bool
};

export default ControlChooser;
