import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../CommonInputFactory/TextInput'

const EditableCell = (props) => {

    const {cell: {value: initialValue} = {}, row, column, onValueChanged} = props;

    const [value, setValue] = React.useState(initialValue);

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue]);

    const onChange = event => {
        const {target: {value} = {}} = event;
        setValue(value);
    };

    const onBlur = () => {
        onValueChanged(row, column, value);
    };

    return <TextInput className={'editableCell'} value={value} onChange={onChange} onBlur={onBlur}/>
};

EditableCell.propTypes = {
    value: (PropTypes.string || PropTypes.number || PropTypes.shape()),
    onValueChanged: PropTypes.func.isRequired,
    row: PropTypes.shape(),
    column: PropTypes.shape()
};

export default EditableCell;
