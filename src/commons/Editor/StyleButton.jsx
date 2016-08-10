import React, { Component, PropTypes } from 'react';

class StyleButton extends Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) className += ' RichEditor-activeButton';

        return (
            <span className={className} onMouseDown={this.onToggle}>
            {this.props.label}
            </span>
        );
    }
}

StyleButton.propTypes = {
    active: PropTypes.bool,
    style: PropTypes.string,
    label: PropTypes.string,
    onToggle: PropTypes.func
};

export default StyleButton;
