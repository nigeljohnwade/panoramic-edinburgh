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
import CardContent from '../organisms/CardContent';
import CardBody from '../organisms/CardBody';
import CardHeader from '../organisms/CardHeader';
import CardFooter from '../organisms/CardFooter';
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
                            <CardContent>
                                <CardHeader>
                                    <Link to={`/view-resources/view-resource/${item.id}`}>
                                        <h3 className='h4'>{item.title}</h3>
                                    </Link>
                                </CardHeader>
                                <CardBody>
                                    <img
                                        alt=''
                                        className='card-image primary-image'
                                        src='http://placekitten.com/300/120'
                                    />
                                    {
                                        item.shortText &&
                                        <p className='card-description'>{item.shortText}</p>
                                    }
                                </CardBody>
                                <CardFooter>
                                    <p>{item.type}</p>
                                </CardFooter>
                            </CardContent>
                        </Card>
                    </div>
                ))
            }
        </div>
    );
};

export default withRouter(memo(ViewResources));