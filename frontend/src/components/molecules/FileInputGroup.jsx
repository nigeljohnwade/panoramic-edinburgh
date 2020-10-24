import React from 'react';
import PropTypes from 'prop-types';

const FileInputGroup =  ({
    field,
    label,
    onChange,
    value,
}) =>{
    return (
        <div className='form-group input-group'>
            <input
                type='file'
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

FileInputGroup.propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default FileInputGroup;