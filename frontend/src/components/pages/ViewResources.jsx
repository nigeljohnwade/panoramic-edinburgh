import React, {
    useState,
    useEffect,
} from 'react';

import apiCalls from '../../api/utilities';

const ViewResources = () => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        apiCalls.listResources()
            .then(resources => setResources(resources));
    }, []);

    return (
        <div className='panel flex-filler'>
            {
                resources.length > 0 &&
                resources.map(item => (
                    <div
                        className='resource'
                        key={item.id}
                    >
                        <div className='card'>
                            <div className='card-content'>
                                <div className='card-header'>
                                    <h3 className='h4'>{item.title}</h3>
                                </div>
                                <div className='card-footer'>
                                    <p>{item.type}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ViewResources;