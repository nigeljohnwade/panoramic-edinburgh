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