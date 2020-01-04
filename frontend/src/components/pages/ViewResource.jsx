import React, {
    memo,
    useState,
    useEffect,
} from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';

import apiCalls from '../../api/utilities';

const ViewResource = ({
    match,
}) => {
    const [resource, setResource] = useState(null);
    const id = match.params.id;

    useEffect(() => {
        id
            ? apiCalls.getResource(id)
                .then(resource => setResource(resource))
            : setResource(null);
    }, [id]);

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
                        <div>
                            <div>
                                <h3 className='h4'>{resource.title}</h3>
                            </div>
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
                            <div>
                                <p>{resource.type}</p>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default withRouter(memo(ViewResource));