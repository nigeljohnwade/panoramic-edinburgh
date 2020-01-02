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

const ViewResourcesByType = ({
    match,
    type = 'PANORAMA',
}) => {
    const [resources, setResources] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        setSelectedCard(match.params.id);
    }, [match.params.id]);

    useEffect(() => {
        apiCalls.resourcesByType(type)
            .then(resources => setResources(resources));
    }, [type]);

    return (
        <div className='panel flex-expander master'>
            {
                resources.length > 0 &&
                resources.map(item => (
                    <div
                        className='resource'
                        key={item.id}
                    >
                        <div className={`card${selectedCard === item.id ? ' card-selected' : ''}`}>
                            <div className='card-content'>
                                <div className='card-header'>
                                    <Link to={`/view-${type.toLocaleLowerCase()}s/view-resource/${item.id}`}>
                                        <h3 className='h4'>{item.title}</h3>
                                    </Link>
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

export default withRouter(memo(ViewResourcesByType));