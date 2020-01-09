import React, {
    memo,
    useState,
    useEffect,
} from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';
import { Auth } from 'aws-amplify';

import apiCalls from '../../api/utilities';

const ViewResource = ({
    history,
    match,
    location: { pathname },
}) => {
    const [resource, setResource] = useState(null);
    const id = match.params.id;
    const [user, setUser] = useState(null);

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then(user => {
                console.log(user);
                setUser(user);
            })
            .catch(err => console.log(err));
    }, []);
    useEffect(() => {
        id
            ? apiCalls.getResource(id)
                .then(resource => setResource(resource))
            : setResource(null);
    }, [id]);

    console.log(resource && resource.owner);
    return (
        <div className='panel flex-filler detail'>
            {
                resource && user &&
                <>
                    <Link
                        className='panel-close'
                        to='/view-resources'
                    >
                        Close
                    </Link>
                    <div>
                        <article className='resource-detail'>
                            <header>
                                <h3 className='h4'>{resource.title}</h3>
                                <ul className='link-list row'>
                                    {
                                        user.username === resource.owner &&
                                        <>
                                            <li>
                                                <Link to={`${pathname}/edit`}>
                                                    Edit
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        apiCalls.deleteResource(resource.id)
                                                            .then(data => {
                                                                console.log(data);
                                                                history.push('/view-resources');
                                                            });
                                                    }}
                                                    type='button'
                                                >
                                                    Delete
                                            </button>
                                            </li>
                                        </>
                                    }
                                </ul>
                            </header>
                            <div>
                                {
                                    resource.descriptiveText &&
                                    <p>{resource.descriptiveText}</p>
                                }
                                <img
                                    alt=''
                                    className='primary-image'
                                    src='http://placekitten.com/600/300'
                                />
                            </div>
                            <footer>
                                <p>{resource.type}</p>
                            </footer>
                        </article>
                    </div>
                </>
            }
        </div>
    );
};

export default withRouter(memo(ViewResource));