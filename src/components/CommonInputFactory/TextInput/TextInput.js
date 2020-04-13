import React from 'react';
import PropTypes from 'prop-types';

const TextInput = (props) => {

    const {value, onChange, onBlur} = props;

    return (
        <input
            className={'editableCell'}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
    );

};

TextInput.defaultProps = {

};

TextInput.propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: (PropTypes.string || PropTypes.number || PropTypes.shape()),
    className: PropTypes.string
};

export default TextInput;
