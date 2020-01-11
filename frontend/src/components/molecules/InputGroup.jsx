import React from 'react';
import PropTypes from 'prop-types';

const InputGroup =  ({
    field,
    label,
    onChange,
    value,
}) =>{
    return (
        <div className='form-group input-group'>
            <input
                type='text'
                name={field}
                id={field}
                value={value}
                onChange={onChange}
            />
            <label htmlFor={field}>
                {label}
            </label>
        </div>
    )
};

InputGroup.propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

};

export default InputGroup;