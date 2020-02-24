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
import target360_8192x4096 from '../../resources/target360_8192x4096.jpg';

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

    return (
        <div className='panel flex-filler detail'>
            {
                resource && user &&
                <>
                    <Link
                        className='button panel-close-link'
                        to={`${pathname.split('/').slice(0, -2).join('/')}`}
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
                                                <Link
                                                    className={'button edit-link'}
                                                    to={`${pathname}/edit`}
                                                >
                                                    Edit
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    className={'delete-button'}
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
                                    src={target360_8192x4096}
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