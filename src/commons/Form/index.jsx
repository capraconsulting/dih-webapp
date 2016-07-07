import React, { PropTypes } from 'react';
import './form.scss';

const createClasses = (props) => {
    const classes = ['ui', 'form'];
    if (props.errorMessage) classes.push('error');
    if (props.successMessage) classes.push('success');
    return classes;
};

const Form = (props) => (
    <form noValidate className={createClasses(props).join(' ')} onSubmit={props.handleSubmit}>
        <h2>{props.title}</h2>
        <div id="messages" className="ui error message">
            <p>{props.errorMessage}</p>
        </div>
        <div id="messages" className="ui success message">
            <p>{props.successMessage}</p>
        </div>
        {props.children}
    </form>
);


Form.propTypes = {
    children: PropTypes.node.isRequired,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
    title: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired
};

export default Form;
