import React, {
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
                <div
                    className='resource'
                >
                    <Link
                        className='panel-close'
                        to='/view-resources'
                    >
                        Close
                    </Link>
                    <div className='card'>
                        <div className='card-content'>
                            <div className='card-header'>
                                <h3 className='h4'>{resource.title}</h3>
                            </div>
                            <div className='card-footer'>
                                <p>{resource.type}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default withRouter(ViewResource);