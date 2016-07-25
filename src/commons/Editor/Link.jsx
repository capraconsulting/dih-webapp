import React, { PropTypes } from 'react';
import { Entity } from 'draft-js';

function Link(props) {
    const { href } = Entity.get(props.entityKey).getData();
    return (
        <a href={href} className="drafjs-bhe_link">
            {props.children}
        </a>
    );
}


Link.propTypes = {
    children: PropTypes.object,
    entityKey: PropTypes.string
};

export default Link;
