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

    return(
    <div className='panel'>
        {
            resources.length > 0 &&
                resources.map(item => (
                    <div
                        className='resource'
                        key={item.id}
                    >
                        <p>{item.title}</p>
                        <p>{item.type}</p>
                    </div>
                ))
        }
    </div>
    )
};

export default ViewResources;