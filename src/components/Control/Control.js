import React, {memo} from 'react';
import PropTypes from 'prop-types';

const Control = (props) => {

    const {tooltipSide, callback, className, tooltip, icon} = props;

    return (
        <button
            data-place={tooltipSide}
            data-tip={tooltip}
            className={className}
            onClick={callback}
        >
            <i className={icon} aria-hidden="true"/>
        </button>
    );

};

Control.defaultProps = {
    tooltipSide: 'top',
    className: 'btn btn-primary'
};

Control.propTypes = {
    tooltipSide: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    callback: PropTypes.func,
    className: PropTypes.string,
    tooltip: PropTypes.string,
    icon: PropTypes.string.isRequired
};

export default memo(Control);
