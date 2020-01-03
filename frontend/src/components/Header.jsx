import React, {
    useEffect,
    useState,
} from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

export const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then(user => {
                console.log(user)
                setUser(user)
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <header className="header stack">
            <p>{user && user.attributes && user.attributes.email}</p>
            <Link
                className="link"
                to="/"
            >
                <span>
                    Home
                </span>
            </Link>
            <Link
                className="link"
                to="/create-resource"
            >
                <span>
                    New Resource
                </span>
            </Link>
            <Link
                className="link"
                to="/view-resources"
            >
                <span>
                    View Resources
                </span>
            </Link>
            <Link
                className="link"
                to="/view-panoramas"
            >
                <span>
                    View Panoramas
                </span>
            </Link>
            <Link
                className="link"
                to="/view-sites"
            >
                <span>
                    View Sites
                </span>
            </Link>
            <Link
                className="link"
                to="/view-tours"
            >
                <span>
                    View Tours
                </span>
            </Link>
            <Link
                className="link"
                to="/view-journeys"
            >
                <span>
                    View Journeys
                </span>
            </Link>
        </header>
    );
};