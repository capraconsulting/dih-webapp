import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';
import './navbar.scss';

const navbar = (props) => (
    <div className="ui pointing secondary menu">
        {props.pages.map(page => (
            <IndexLink
                key={page.name}
                to={page.uri}
                activeClassName="active"
                className="item"
            >
            {page.name}
            </IndexLink>
        ))}
    </div>
);

navbar.propTypes = {
    pages: PropTypes.array
};

export default navbar;
