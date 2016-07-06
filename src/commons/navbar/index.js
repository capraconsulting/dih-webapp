import React, { PropTypes } from 'react';
import './navbar.scss';

const navbar = (props) => (
    <div className="ui pointing secondary menu">
        {props.pages.map(page => (
            <a key={page.name} className={`${page.active ? 'active' : ''} item`} >{page.name}</a>
        ))}
    </div>
);

navbar.propTypes = {
    pages: PropTypes.array
};

export default navbar;
