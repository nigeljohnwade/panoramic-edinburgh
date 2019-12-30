import React from 'react';

const CreateResource = () =>{
    return (
        <form>
            <div className='form-group'>
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
        </form>
    )
};

export default CreateResource;