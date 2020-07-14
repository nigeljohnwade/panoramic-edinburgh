import React, {
    useEffect,
    useState,
} from 'react';
import { NavLink } from 'react-router-dom';
import { Auth } from 'aws-amplify';

export const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then(user => {
                setUser(user);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <header className="header stack">
            {
                user &&
                <NavLink
                    activeClassName={'active-link'}
                    className='link'
                    to={`/user/${user.username}`}
                >
                    {user && user.attributes && user.attributes.email.charAt(0)}
                </NavLink>
            }
            <NavLink
                activeClassName={'active-link'}
                className="link"
                exact
                to="/"
            >
                <span>
                    Home
                </span>
            </NavLink>
            <NavLink
                activeClassName={'active-link'}
                className="link"
                to="/create-resource"
            >
                <span>
                    New Resource
                </span>
            </NavLink>
            <NavLink
                activeClassName={'active-link'}
                className="link"
                to="/view-panoramas"
            >
                <span>
                    View Panoramas
                </span>
            </NavLink>
            <NavLink
                activeClassName={'active-link'}
                className="link"
                to="/view-sites"
            >
                <span>
                    View Sites
                </span>
            </NavLink>
            <NavLink
                activeClassName={'active-link'}
                className="link"
                to="/view-tours"
            >
                <span>
                    View Tours
                </span>
            </NavLink>
            <NavLink
                activeClassName={'active-link'}
                className="link"
                to="/view-journeys"
            >
                <span>
                    View Journeys
                </span>
            </NavLink>
            <NavLink
                activeClassName={'active-link'}
                className="link"
                to="/mapbox-map"
            >
                <span>
                    View Mapbox Map
                </span>
            </NavLink>
            <NavLink
                activeClassName={'active-link'}
                className="link"
                to="/vr-viewer"
            >
                <span>
                    VR Viewer
                </span>
            </NavLink>
            <NavLink
                activeClassName={'active-link'}
                className="link"
                to="/ar-viewer"
            >
                <span>
                    AR Viewer
                </span>
            </NavLink>
        </header>
    );
};

export default Header;