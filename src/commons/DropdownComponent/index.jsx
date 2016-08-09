import React, { Component, PropTypes } from 'react';
import './dropdown.scss';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            active: false
        };
    }

    toggleMenu() {
        this.setState({
            visible: !this.state.visible,
            active: !this.state.active
        });
    }

    createMenuClasses() {
        const classes = ['menu'];
        if (this.state.visible) classes.push('visible');
        return classes;
    }

    createClasses() {
        const classes = [
            'ui',
            'icon',
            'top',
            'right',
            'dropdown',
            'button'
        ];
        if (this.state.visible) classes.push('visible');
        if (this.state.active) classes.push('active');
        if (this.props.label) classes.push('labeled');
        if (this.props.class) classes.push(this.props.class);
        return classes;
    }

    render() {
        return (
            <div
                className={this.createClasses().join(' ')}
                onClick={e => this.toggleMenu(e)}
            >
                <i className={`${this.props.icon} icon`} />
                {this.props.label && <span className="text">{this.props.label}</span>}
                <div
                    className={this.createMenuClasses().join(' ')}
                    onClick={e => e.stopPropagation()}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Dropdown.propTypes = {
    children: PropTypes.object,
    icon: PropTypes.string,
    icon: PropTypes.class,
    label: PropTypes.string
};

export default Dropdown;
