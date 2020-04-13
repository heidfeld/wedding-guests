import React from 'react';
import PropTypes from 'prop-types';

import './less/Inputs.less';

const TextInput = (props) => {

    const {value, onChange, onBlur, className, placeholder} = props;

    return (
        <input
            placeholder={placeholder}
            className={`${className} textInput form-control`}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
    );

};

TextInput.defaultProps = {
    placeholder: '',
    value: ''
};

TextInput.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: (PropTypes.string || PropTypes.number || PropTypes.shape()),
    className: PropTypes.string
};

export default TextInput;
