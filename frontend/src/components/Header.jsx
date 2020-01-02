import { Link } from 'react-router-dom';
import React from 'react';

export const Header = () => {
    return (
        <header className="header stack">
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