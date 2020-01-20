import React, {
    memo,
    useState,
    useEffect,
} from 'react';
import {
    Link,
    withRouter,
} from 'react-router-dom';

import Card from '../organisms/Card';
import apiCalls from '../../api/utilities';
import { Auth } from 'aws-amplify';

const ViewResources = ({
    match,
}) => {
    const [user, setUser] = useState(null);
    const [resources, setResources] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then(user => {
                console.log(user);
                setUser(user);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        setSelectedCard(match.params.id);
    }, [match.params.id]);

    useEffect(() => {
        apiCalls.listResources()
            .then(resources => setResources(resources));
    }, []);

    useEffect(() => {
        user && user.username &&
            apiCalls.resourceByOwnerByDateUpdated(user.username)
                .then(resources => console.log(resources));
    }, [user]);

    const identifiers = (item) => {
        const identifiers = [];
        if (selectedCard === item.id) identifiers.push('selected');
        if (user.username === item.owner) identifiers.push('owned');
        return identifiers;
    };

    return (
        <div className='panel flex-expander master'>
            {
                resources.length > 0 &&
                resources.map(item => (
                    <div
                        className='resource'
                        key={item.id}
                    >
                        <Card identifiers={identifiers(item)}>
                            <div className='card-content'>
                                <div className='card-header'>
                                    <Link to={`/view-resources/view-resource/${item.id}`}>
                                        <h3 className='h4'>{item.title}</h3>
                                    </Link>
                                </div>
                                <div className='card-body'>
                                    <img
                                        alt=''
                                        className='card-image primary-image'
                                        src='http://placekitten.com/300/120'
                                    />
                                    {
                                        item.shortText &&
                                        <p className='card-description'>{item.shortText}</p>
                                    }
                                </div>
                                <div className='card-footer'>
                                    <p>{item.type}</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))
            }
        </div>
    );
};

export default withRouter(memo(ViewResources));