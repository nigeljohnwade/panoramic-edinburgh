import React, {
    useReducer,
    useState,
} from 'react';
import { Redirect } from 'react-router-dom';

import apiCalls from '../../api/utilities';
import InputGroup from '../molecules/InputGroup';
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
                        onChange={(e) => dispatchFormState({
                            type: 'onChangeStringValue',
                            payload: {
                                name: e.target.name,
                                value: e.target.value,
                            },
                        })}
                        value={formState.title}
                    />
                    <div className='form-group select-group'>
                        <select
                            name='type'
                            id='type'
                            value={formState.type}
                            onChange={(e) => dispatchFormState({
                                type: 'onChangeStringValue',
                                payload: {
                                    name: e.target.name,
                                    value: e.target.value,
                                },
                            })}
                        >
                            <option value=''>Please select...</option>
                            <option value='PANORAMA'>Panorama</option>
                            <option value='SITE'>Site</option>
                            <option value='JOURNEY'>Journey</option>
                            <option value='TOUR'>Tour</option>
                        </select>
                        <label htmlFor='type'>
                            Type
                        </label>
                    </div>
                    <InputGroup
                        field='shortText'
                        label='Short Text'
                        onChange={(e) => dispatchFormState({
                            type: 'onChangeStringValue',
                            payload: {
                                name: e.target.name,
                                value: e.target.value,
                            },
                        })}
                        value={formState.shortText}
                    />
                    <div className='form-group input-group'>
                        <textarea
                            name='descriptiveText'
                            id='descriptiveText'
                            value={formState.descriptiveText}
                            onChange={(e) => dispatchFormState({
                                type: 'onChangeStringValue',
                                payload: {
                                    name: e.target.name,
                                    value: e.target.value,
                                },
                            })}
                        />
                        <label htmlFor='descriptiveText'>
                            Descriptive Text
                        </label>
                    </div>
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