import React, { PropTypes } from 'react';
import './steps.scss';

const Steps = (props) => (
    <div className={`ui steps ${props.numberOfSteps}`}>
        {props.children}
    </div>
);

Steps.propTypes = {
    numberOfSteps: PropTypes.string,
    children: PropTypes.node
};


export default Steps;
