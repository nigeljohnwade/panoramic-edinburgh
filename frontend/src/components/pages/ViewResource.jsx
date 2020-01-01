import React, {
    useState,
    useEffect,
} from 'react';
import { withRouter } from 'react-router-dom';
import apiCalls from '../../api/utilities';

const ViewResource = ({
    match,
}) => {
    const [resource, setResource] = useState(null);
    const id = match.params.id;
    useEffect(() => {
        console.log(id);
        apiCalls.getResource(id)
            .then(resource => setResource(resource));
    }, []);

    return (
        <div className='panel flex-filler'>
            {
                resource &&
                <div
                    className='resource'
                >
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