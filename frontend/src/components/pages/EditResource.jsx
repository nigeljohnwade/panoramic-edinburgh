import React, {
    memo,
    useEffect,
    useReducer,
    useState,
} from 'react';
import {
    Link, Redirect,
    withRouter,
} from 'react-router-dom';

import apiCalls from '../../api/utilities';
import Fetching from '../organisms/Fetching';
import InputGroup from '../molecules/InputGroup';
import SelectGroup from '../molecules/SelectGroup';

const formStateReducer = (state, action) => {
    switch (action.type) {
        case 'onChangeStringValue':
            return {...state, [action.payload.name]: action.payload.value};
        case 'setState':{
            return {...state,  ...action.payload}
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
};


const EditResource = ({
    match,
}) => {
    const [resource, setResource] = useState(null);
    const [formState, dispatchFormState] = useReducer(formStateReducer, initialArg);
    const [fetching, setFetching] = useState(false);
    const [completed, setCompleted] = useState(false);
    const id = match && match.params && match.params.id || null;

    useEffect(() => {
        id
            ? apiCalls.getResource(id)
                .then(resource => setResource(resource))
            : setResource(null);
    }, [id]);

    useEffect(() =>{
        dispatchFormState({
            type: 'setState',
            payload: {
                ...resource,
            }
        });
    }, [resource]);

    return (
        <div className='panel flex-filler detail'>
            {
                resource &&
                <>
                    <Link
                        className='panel-close'
                        to='/view-resources'
                    >
                        Close
                    </Link>
                    <div>
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
                                            onChange={(e) => dispatchFormState({
                                                type: 'onChangeStringValue',
                                                payload: {
                                                    name: e.target.name,
                                                    value: e.target.value,
                                                },
                                            })}
                                            value={formState.title}
                                        />
                                        <SelectGroup
                                            label='Type'
                                            field='type'
                                            value={formState.type}
                                            onChange={(e) => dispatchFormState({
                                                type: 'onChangeStringValue',
                                                payload: {
                                                    name: e.target.name,
                                                    value: e.target.value,
                                                },
                                            })}
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
                                            <button type="submit">Edt</button>
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
                    </div>
                </>
            }
        </div>
    );
};

export default withRouter(memo(EditResource));