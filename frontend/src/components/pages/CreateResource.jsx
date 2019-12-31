import React from 'react';

import apiCalls from '../../api/utilities';

const CreateResource = () => {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            apiCalls.createResource();
        }}>
            <div className='input-group'>
                <label htmlFor='title'>
                    Title
                </label>
                <input
                    type='text'
                    name='title'
                    id='title'
                />
            </div>
            <div className='form-group'>
                <label htmlFor='type'>
                    Type
                </label>
                <select
                    name='title'
                    id='title'
                >
                    <option value='PANORAMA'>Panorama</option>
                    <option value='SITE'>Site</option>
                    <option value='JOURNEY'>Journey</option>
                    <option value='TOUR'>Tour</option>
                </select>
            </div>
            <div className='input-group'>
                <button type="submit">Create</button>
            </div>
        </form>
    );
};

export default CreateResource;