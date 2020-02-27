import React, { memo, useEffect, useReducer, useState, } from 'react';
import { Link, Redirect, withRouter, } from 'react-router-dom';

import apiCalls from '../../api/utilities';
import Fetching from '../organisms/Fetching';
import InputGroup from '../molecules/InputGroup';
import SelectGroup from '../molecules/SelectGroup';

const formStateReducer = (state, action) => {
    switch (action.type) {
        case 'onChangeStringValue':
            return {...state, [action.payload.name]: action.payload.value};
        case 'setState': {
            return {...action.payload};
        }
        case 'mergeState': {
            return {...state, ...action.payload};
        }
        default:
            return state;
    }
};

const initialArg = {
    title: '',
    type: '',
    shortText: '',
    descriptiveText: '',
    primaryImageUrl: '',
    latitude: '',
    longitude: '',
};


const EditResource = ({
    match,
    location: {pathname},
}) => {
    const [resource, setResource] = useState(null);
    const [formState, dispatchFormState] = useReducer(formStateReducer, initialArg);
    const [fetching, setFetching] = useState(false);
    const [completed, setCompleted] = useState(false);
    const id = (match && match.params && match.params.id) || null;

    useEffect(() => {
        id
            ? apiCalls.getResource(id)
                .then(resource => setResource(resource))
            : setResource(null);
    }, [id]);

    useEffect(() => {
        dispatchFormState({
            type: 'setState',
            payload: {
                ...resource,
            }
        });
    }, [resource]);

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
        <div className='panel flex-filler detail'>
            {
                resource &&
                <>
                    <Link
                        className='button panel-close-link'
                        to={`${pathname.split('/').slice(0, -1).join('/')}`}
                    >
                        Cancel
                    </Link>
                    <article className='resource-detail'>
                        <>
                            {
                                !fetching && !completed &&
                                <form
                                    className='stack create-resource'
                                    onSubmit={(e) => {
                                        setFetching(true);
                                        e.preventDefault();
                                        apiCalls.updateResource({
                                            ...formState
                                        }).then(() => {
                                            setFetching(false);
                                            setCompleted(true);
                                        });
                                    }}
                                >
                                    <h1>Edit Resource</h1>
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
                                        field={'latitude'}
                                        label={'Latitude'}
                                        onChange={(e) => changeHandlerString(e)}
                                        value={formState.latitude}
                                    />
                                    <InputGroup
                                        field={'longitude'}
                                        label={'Longitude'}
                                        onChange={(e) => changeHandlerString(e)}
                                        value={formState.longitude}
                                    />
                                    <div className='form group button-group'>
                                        <button
                                            className={'save-button'}
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            }
                        </>
                        {
                            fetching &&
                            <Fetching/>
                        }
                        {
                            completed &&
                            <Redirect to={`/view-resources/view-resource/${id}`}/>
                        }
                        <footer>
                            <p> {resource.type}</p>
                        </footer>
                    </article>
                </>
            }
        </div>
    );
};

export default withRouter(memo(EditResource));