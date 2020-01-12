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
import { Auth } from 'aws-amplify';

const ViewResourcesByType = ({
    match,
    type = 'PANORAMA',
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
        apiCalls.resourcesByType(type)
            .then(resources => setResources(resources));
    }, [type]);


    const classes = (item) => {
        const classes = ['card'];
        if(selectedCard === item.id) classes.push('card-selected');
        if(user.username === item.owner) classes.push('card-owned');
        return classes;
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
                        <div className={classes(item).join(' ' )}>
                            <div className='card-content'>
                                <div className='card-header'>
                                    <Link to={`/view-${type.toLocaleLowerCase()}s/view-resource/${item.id}`}>
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
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default withRouter(memo(ViewResourcesByType));