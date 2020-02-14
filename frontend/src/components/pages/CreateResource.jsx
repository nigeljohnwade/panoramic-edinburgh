import React, { useReducer, useState, } from 'react';
import { Redirect } from 'react-router-dom';

import apiCalls from '../../api/utilities';
import InputGroup from '../molecules/InputGroup';
import SelectGroup from '../molecules/SelectGroup';
import Fetching from '../organisms/Fetching';

const formStateReducer = (state, action) => {
    switch (action.type) {
        case 'onChangeStringValue':
            return {...state, [action.payload.name]: action.payload.value};
        default:
            return state;
    }
};

const initialArg = {
    title: '',
    type: '',
};

const CreateResource = () => {
    const [formState, dispatchFormState] = useReducer(formStateReducer, initialArg);
    const [fetching, setFetching] = useState(false);
    const [completed, setCompleted] = useState(false);

    const changeHandlerString = e => {
        dispatchFormState({
            type: 'onChangeStringValue',
            payload: {
                name: e.target.name,
                value: e.target.value,
            },
        });
    };

    return (
        <>
            {
                !fetching && !completed &&
                <form
                    className='stack create-resource'
                    onSubmit={(e) => {
                        setFetching(true);
                        e.preventDefault();
                        apiCalls.createResource({
                            ...formState
                        }).then(() => {
                            setFetching(false);
                            setCompleted(true);
                        });
                    }}
                >
                    <h1>Create New Resource</h1>
                    <InputGroup
                        field='title'
                        label='Title'
                        onChange={(e) => changeHandlerString(e)}
                        value={formState.title}
                    />
                    <SelectGroup
                        label='Type'
                        field='type'
                        value={formState.type}
                        onChange={(e) => changeHandlerString(e)}
                        options={[
                            {value: '', label: 'Please select...'},
                            {value: 'PANORAMA', label: 'Panorama'},
                            {value: 'SITE', label: 'Site'},
                            {value: 'JOURNEY', label: 'Journey'},
                            {value: 'TOUR', label: 'Tour'},
                        ]}
                    />
                    <InputGroup
                        field='shortText'
                        label='Short Text'
                        onChange={(e) => changeHandlerString(e)}
                        value={formState.shortText}
                    />
                    <div className='form-group input-group'>
                        <textarea
                            name='descriptiveText'
                            id='descriptiveText'
                            value={formState.descriptiveText}
                            onChange={(e) => changeHandlerString(e)}
                        />
                        <label htmlFor='descriptiveText'>
                            Descriptive Text
                        </label>
                    </div>
                    <InputGroup
                        field={'lat'}
                        label={'Latitude'}
                        onChange={(e) => changeHandlerString(e)}
                        value={formState.lat}
                    />
                    <InputGroup
                        field={'lng'}
                        label={'Longitude'}
                        onChange={(e) => changeHandlerString(e)}
                        value={formState.lng}
                    />
                    <div className='form group button-group'>
                        <button type="submit">Create</button>
                    </div>
                </form>
            }
            {
                fetching &&
                <Fetching/>
            }
            {
                completed &&
                <Redirect to='/'/>
            }
        </>
    );
};

export default CreateResource;