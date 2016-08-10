import React, { PropTypes } from 'react';
import Loader from './Loader';

const createClasses = (props) => {
    const classes = ['ui', 'segments'];
    if (props.clearing) classes.push('clearing');
    return classes;
};

const Segments = (props) => (
    <div className={createClasses(props).join(' ')}>
        <Loader active={props.loading} />
        {props.children}
    </div>
);


Segments.propTypes = {
    clearing: PropTypes.bool,
    children: PropTypes.object,
    loading: PropTypes.bool
};

export default Segments;
