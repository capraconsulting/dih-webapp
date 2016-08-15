import React, { Component, PropTypes, Children, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { KEY_CODES } from '../../constants';
import './dropdown.scss';

/*
* commons.Form/SelectField
*
* children - array: Array of DropdownItems
*
* type - string: the type of input field.
*
* label - string: the label of input field.
*
* values - array: of possible options.
*
* valueKey - string: the key to be selected as data value from options
*
* valueLabel - string: the field from the values to be used as label.
*
* placeholder - string: the placeholder of input field.
*
* disabled - boolean: if the button is disabled.
*
* onSelect - function: called when selected value is changed
*/

const createIconClassnames = elem => {
    if (elem && elem.indexOf('flag') !== -1) return elem;
    else if (elem) return `${elem} icon`;
    return '';
};


class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            visible: false,
            active: false,
            search: '',
            selected: this.getIntialValue(props),
            initialValue: props.initialValue,
            initialValueSat: false
        };
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillReceiveProps(props) {
        if (!this.state.initialValueSat) {
            if (props.initialValue !== this.state.initialValue) {
                const selected = this.getIntialValue(props);
                this.setState({
                    selected,
                    initialValue: props.initialValue,
                    initialValueSat: true
                });
            }
        }
        if (!props.value) {
            const selectNullValue = (props.value === null);
            if (!selectNullValue) this.setState({ selected: null });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);
    }

    getIntialValue(props) {
        let selected = null;
        if (props.noInitalValue) return null;
        if (props.initialValue) {
            selected = _.filter(props.children, data =>
                (data.props.item[props.valueKey] === props.initialValue));
        }
        if (selected) {
            if (selected.length) selected = selected[0].props.item;
        }
        return selected;
    }

    toggleMenu() {
        const focus = !this.state.active;
        this.setState({
            visible: !this.state.visible,
            active: !this.state.active,
            placeholder: false,
            search: ''
        });
        if (focus) ReactDOM.findDOMNode(this.refs.searchInput).focus();
        else ReactDOM.findDOMNode(this.refs.searchInput).blur();
    }

    createMenuClasses() {
        const classes = ['menu'];
        if (this.state.visible) classes.push('visible');
        return classes;
    }

    handleKeyPress(e) {
        if (this.state.active) {
            switch (e.keyCode) {
            case KEY_CODES.ENTER:
            case KEY_CODES.ESCAPE:
                this.toggleMenu();
                e.preventDefault();
                break;
            case KEY_CODES.LEFT_ARROW:
            case KEY_CODES.UP_ARROW:
                this.selectedPrevious();
                e.preventDefault();
                break;
            case KEY_CODES.RIGHT_ARROW:
            case KEY_CODES.DOWN_ARROW:
                this.selectNext();
                e.preventDefault();
                break;
            default:
                break;
            }
        }
    }

    handleSelect(selected) {
        this.setState({ selected });
        this.props.onSelect(selected[this.props.valueKey]);
        this.toggleMenu();
    }

    selectedPrevious() {
        let selected;
        const items = this.search(this.props.children)
            .map(child => child.props.item[this.props.valueKey]);
        if (!this.state.selected) {
            selected = _.last(items);
        } else {
            selected = items[items.indexOf(this.state.selected[this.props.valueKey]) - 1];
            if (!selected) selected = _.last(items);
        }
        selected = _.filter(this.props.children, data =>
            (data.props.item[this.props.valueKey] === selected));
        selected = selected[0].props.item;
        this.setState({ selected });
    }

    selectNext() {
        let selected;
        const items = this.search(this.props.children)
            .map(child => child.props.item[this.props.valueKey]);
        if (!this.state.selected) {
            selected = _.head(items);
        } else {
            selected = items[items.indexOf(this.state.selected[this.props.valueKey]) + 1];
            if (!selected) selected = _.head(items);
        }
        selected = _.filter(this.props.children, data =>
            (data.props.item[this.props.valueKey] === selected));
        selected = selected[0].props.item;
        this.setState({ selected });
    }

    handleSearch(event) {
        this.setState({ search: event.target.value });
    }

    search(array) {
        const searchText = this.state.search.toLowerCase();
        if (searchText.length === 0) return array;

        return _.filter(array, data => {
            const search = _.values(data.props.item).join().toLowerCase();
            return new RegExp(searchText).test(search);
        });
    }

    createClasses() {
        const classes = [
            'ui',
            'dropdown'
        ];
        if (this.props.icon) classes.push('icon');
        if (this.props.button) classes.push('button');
        if (this.props.top) classes.push('top');
        if (this.props.right) classes.push('right');
        if (this.props.fluid) classes.push('fluid');
        if (this.props.selection) classes.push('selection');
        if (this.props.search) classes.push('search');
        if (this.props.error) classes.push('error');
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
                {(this.props.icon && this.props.button) &&
                    <i className={`${this.props.icon} icon`} />}
                {!this.props.button && <i className="dropdown icon"></i>}
                {this.props.search &&
                    <input
                        onChange={e => this.handleSearch(e)}
                        className="search"
                        value={this.state.search}
                        ref="searchInput"
                        autoComplete="off"
                        tabIndex="0"
                    />
                }
                {this.state.selected &&
                    <div
                        className={this.state.search.length > 0 ? 'text filtered' : 'text'}
                    >
                        {this.state.selected.icon &&
                            <i className={createIconClassnames(this.state.selected.icon)}></i>}
                        {(this.props.icon && !this.state.selected.icon) &&
                            <i className={createIconClassnames(this.props.icon)}></i>}
                        {this.state.selected[this.props.label]}
                    </div>}
                {!this.state.selected &&
                    <div
                        className={this.state.search.length > 0 ? 'text filtered' : 'text'}
                    >
                        {(this.props.icon && !this.props.button) &&
                            <i className={createIconClassnames(this.props.icon)} />}
                        {this.props.placeholder}
                    </div>}
                <div
                    className={this.createMenuClasses().join(' ')}
                    onClick={e => e.stopPropagation()}
                >
                    {Children.map(this.search(this.props.children), child => (
                        cloneElement(child, {
                            icon: child.props.icon || this.props.icon,
                            selected: this.state.selected,
                            handleSelect: this.handleSelect
                        })
                    ))}
                </div>
            </div>
        );
    }
}

Dropdown.propTypes = {
    children: PropTypes.array,
    icon: PropTypes.string,
    search: PropTypes.bool,
    button: PropTypes.bool,
    placeholder: PropTypes.string,
    initialValue: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.bool,
    noInitalValue: PropTypes.bool,
    disabled: PropTypes.bool,
    onSelect: PropTypes.func,
    fluid: PropTypes.bool,
    top: PropTypes.bool,
    selection: PropTypes.bool,
    left: PropTypes.bool,
    right: PropTypes.bool,
    class: PropTypes.string,
    valueKey: PropTypes.string
};

export default Dropdown;
