import React, {
    useReducer,
    useState,
} from 'react';
import { Redirect } from 'react-router-dom';
import apiCalls from '../../api/utilities';

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
                    className='stack'
                    onSubmit={(e) => {
                        setFetching(true);
                        e.preventDefault();
                        apiCalls.createResource({
                            type: formState.type,
                            title: formState.title,
                        }).then(() => {
                            setFetching(false);
                            setCompleted(true);
                        });
                    }}
                >
                    <h1>Create New Resource</h1>
                    <div className='input-group'>
                        <input
                            type='text'
                            name='title'
                            id='title'
                            value={formState.title}
                            onChange={(e) => dispatchFormState({
                                type: 'onChangeStringValue',
                                payload: {
                                    name: e.target.name,
                                    value: e.target.value,
                                },
                            })}
                        />
                        <label htmlFor='title'>
                            Title
                        </label>
                    </div>
                    <div className='form-group'>
                        <select
                            name='type'
                            id='title'
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
                    <div className='input-group'>
                        <button type="submit">Create</button>
                    </div>
                </form>
            }
            {
                completed &&
                <Redirect to='/'/>
            }
        </>
    );
};

export default CreateResource;