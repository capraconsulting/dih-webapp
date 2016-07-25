import React, { PropTypes } from 'react';
import './form.scss';

/*
* commons.Form
*
* title - string: title of the button.
*
* handleSubmit - function: The function to be called on submit.
*
* successMessage - string: An success message to be displayed form wide.
*
* errorMessage - string: An error message to be displayed form wide.
*
* children - node: other components, like Button, Link, InputField, etc..
*
*/

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
