import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFilter: null,
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

    createButtonClasses() {
        const classes = [
            'ui',
            'labeled',
            'icon',
            'top',
            'right',
            'dropdown',
            'button',
            'filterButton'
        ];
        if (this.state.visible) classes.push('visible');
        if (this.state.active) classes.push('active');
        return classes;
    }

    createMenuClasses() {
        const classes = ['menu'];
        if (this.state.visible) classes.push('visible');
        return classes;
    }

    selectFilter(e, filter) {
        e.preventDefault();
        this.setState({
            activeFilter: filter
        });
        this.toggleMenu();
        this.props.onChange(filter);
    }

    clearFilter(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            activeFilter: null
        });
        this.props.onChange(null);
    }

    prepareFilterData() {
        const sortedFilters = _.sortBy(this.props.filters, 'group');
        const preparedFilters = [];
        let groupName = sortedFilters[0].group;
        preparedFilters.push({ groupName });
        sortedFilters.forEach(filter => {
            if (filter.group !== groupName) {
                groupName = filter.group;
                preparedFilters.push({ groupName });
                preparedFilters.push(filter);
            } else {
                preparedFilters.push(filter);
            }
        });
        return preparedFilters;
    }

    renderFilter(filter) {
        return (
            <div
                className={(this.state.activeFilter === filter ? 'item active selected' : 'item')}
                onClick={e => this.selectFilter(e, filter)}
            >
                <div className={`ui ${filter.color} empty circular label`}></div>
                {filter.label}
            </div>
        );
    }

    renderHeader(data) {
        return (
            <div className="header">
                <i className="tags icon"></i>
                {data.groupName}
            </div>
        );
    }

    renderActiveFilter() {
        return (
            <span className="text">
                <div className={`ui ${this.state.activeFilter.color} empty circular label`}></div>
                {this.state.activeFilter.label}
                <i className="icon close" onClick={e => this.clearFilter(e)} />
            </span>

        );
    }

    render() {
        return (
            <div
                className={this.createButtonClasses().join(' ')}
                onClick={e => this.toggleMenu(e)}
            >
                <i className="filter icon" />
                {!this.state.activeFilter && <span className="text">Filter rows</span>}
                {this.state.activeFilter && this.renderActiveFilter()}
                <div
                    className={this.createMenuClasses().join(' ')}
                    onClick={e => e.stopPropagation()}
                >
                    {this.prepareFilterData().map(data => (
                        (data.groupName ? this.renderHeader(data) : this.renderFilter(data))
                    ))}
                </div>
            </div>
        );
    }
}

Filter.propTypes = {
    filters: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Filter;
