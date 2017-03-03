import React, { PropTypes } from 'react';
import Loader from './Loader';

const createClasses = (props) => {
    const classes = ['ui', 'segment'];
    if (props.clearing) classes.push('clearing');
    if (props.blue) classes.push('blue');
    if (props.center) classes.push('center aligned');
    return classes;
};

const Segment = (props) => (
    <div className={createClasses(props).join(' ')}>
        <Loader active={props.loading} />
        {props.children}
    </div>
);


Segment.propTypes = {
    clearing: PropTypes.bool,
    blue: PropTypes.bool,
    center: PropTypes.bool,
    children: PropTypes.node,
    loading: PropTypes.bool
};

export default Segment;
