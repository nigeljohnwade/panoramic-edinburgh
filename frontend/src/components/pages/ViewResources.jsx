import React, {
    useState,
    useEffect,
} from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';

import apiCalls from '../../api/utilities';

const ViewResources = ({
    match,
}) => {
    const [resources, setResources] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        setSelectedCard(match.params.id);
    }, [match.params.id]);

    useEffect(() => {
        apiCalls.listResources()
            .then(resources => setResources(resources));
    }, []);

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
                                    <Link
                                        // onClick={() => setSelectedCard(item.id)}
                                        to={`/view-resources/view-resource/${item.id}`}
                                    >
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

export default withRouter(ViewResources);