import React from 'react';
import PropTypes from 'prop-types';

const InputGroup =  ({
    field,
    label,
    onChange,
    options,
    value,
}) =>{
    return (
        <div className='form-group select-group'>
            <select
                name={field}
                id={field}
                value={value}
                onChange={onChange}
            >
                {
                    options && options.map(item => (
                        <option
                            key={item.value}
                            value={item.value}
                        >
                            {item.label}
                        </option>)
                    )
                }
            </select>
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