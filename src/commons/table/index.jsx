import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';
import _ from 'lodash';
import { Link } from 'react-router';
import moment from 'moment';

import Actions from './actions';
import SearchField from './searchField';
import Filter from './filter';
import DateInterval from './dateInterval';
import './table.scss';

/*
* commons.Table
* @param {props} With properties items, columnNames. There's also an optional
* property key.
* Items is an array of objects.
*
* columnNames is an object on the form {propertyName : columnName}, where
*
* propertyName is a property in Object. Properties here are shown in the table.
*
* itemKey: needs to be a key on the objects, and needs to be unique.
*
* linkKey (optional): if you want to use another key than itemKey for links, specify here
*
* link: is an object describing the links to be created on the table, it needs a
* prefix and a columnName name, to create a link with the prefix url  followed by the
* itemKey value for the object. A suffix can also be specified, appending a given string
* in the end of the link, this is optional.
*
* search (optional): Boolean. Add as a parameter if you want the table to be searchable
*
* select (optional): Boolean. Add as a parameter if you want the table to have toggle fields
*
* actions (optional): Array. Add as a parameter if you want the table to be searchable
* Array must contain {name, icon, action}.
* Action.action is a function that returns the selected values.
*
* selected (optional): Array, if you have pre selected any values, input these as selected
*
* labels (optional): Object. Add as a parameter if you want to map values from text to labels
* Object keys map to itemKeys, which again map values from itemValue to Objectkey[itemKeys];
*
* filters (optional): Array. Lets the user view a subset of the table by selecting a filter
* Array must contain {label, value, color, field, group}.
*
* dateFields (optional): Object. Will display  'date interval' datepickers. dateFields must be
* strucutured {from: 'fromFieldName', to: 'toFieldName'}
*/

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sorted: props.itemKey,
            order: 'ascending',
            selected: props.selected || [],
            selectedAll: false,
            searchText: '',
            activeFilter: null,
            fromDate: null,
            toDate: null
        };
    }

    getLinkId() {
        if (this.props.linkKey) return this.props.linkKey;
        return this.props.itemKey;
    }

    filter(array) {
        const { field, value } = this.state.activeFilter;
        return _.filter(array, [field, value]);
    }

    filterDate(array) {
        const filterStart = this.state.fromDate;
        const filterEnd = this.state.toDate;

        return array.filter(row => {
            const rowStart = moment(row[this.props.dateFields.from]);
            const rowEnd = moment(row[this.props.dateFields.to]);


            if (filterStart && filterEnd) {
                return (
                    (rowStart.isSameOrBefore(filterStart) && rowEnd.isSameOrAfter(filterStart)) ||
                    (rowStart.isSameOrBefore(filterStart) && !rowEnd.isValid()) ||
                    (rowStart.isSameOrAfter(filterStart) && rowStart.isSameOrBefore(filterEnd))
                );
            }
            if (filterStart && !filterEnd) {
                return (
                    rowStart.isSameOrAfter(filterStart) ||
                    (rowStart.isBefore(filterStart) && rowEnd.isSameOrAfter(filterStart)) ||
                    (rowStart.isBefore(filterStart) && !rowEnd.isValid())
                );
            }
            if (!filterStart && filterEnd) {
                return (
                    rowEnd.isSameOrBefore(filterEnd) ||
                    (rowEnd.isAfter(filterEnd) && rowStart.isSameOrBefore(filterEnd)) ||
                    (!rowEnd.isValid() && rowStart.isSameOrBefore(filterEnd))
                );
            }
            return true;
        });
    }

    search(array) {
        const searchText = this.state.searchText.toLowerCase();
        if (searchText.length === 0) return array;

        return _.filter(array, data => {
            const search = _.values(data).join().toLowerCase();
            return new RegExp(searchText).test(search);
        });
    }

    sort(array) {
        let sorted = _.sortBy(array, this.state.sorted);
        if (this.state.order === 'descending') sorted = _.reverse(sorted);
        return sorted;
    }

    applyFilters(initialArray) {
        let array = initialArray;

        // Filter
        if (this.state.activeFilter) array = this.filter(array);
        // Date interval
        if (this.state.fromDate || this.state.toDate) array = this.filterDate(array);
        // Search
        array = this.search(array);
        // Sort
        return this.sort(array);
    }

    setStatePromise(newState) {
        return new Promise((resolve) => {
            this.setState(newState, () => {
                resolve();
            });
        });
    }

    handleSearchChange(searchText) {
        this.setStatePromise({
            searchText
        })
        .then(() => this.updateSelected());
    }

    handleFilterChange(activeFilter) {
        this.setStatePromise({
            activeFilter
        })
        .then(() => this.updateSelected());
    }

    handleDateFilterChange(fromDate, toDate) {
        this.setStatePromise({
            fromDate,
            toDate
        })
        .then(() => this.updateSelected());
    }

    updateSelected() {
        this.setState({
            selected: this.applyFilters(this.state.selected)
        });
    }

    toggleSelectAll() {
        if (this.state.selectedAll) {
            this.setState({ selected: [] });
        } else {
            this.setState({ selected: this.applyFilters(this.props.items) });
        }
        this.setState({ selectedAll: !this.state.selectedAll });
    }

    handleToggle(e, item) {
        const index = _.findIndex(this.state.selected, (obj) => (obj.id === item.id));
        if (index < 0) {
            this.setState({ selected: this.state.selected.concat([item]) });
        } else {
            this.setState({ selected: update(this.state.selected, { $splice: [[index, 1]] }) });
        }
    }

    toggleSort(columnName) {
        let { sorted, order } = this.state;
        if (columnName === sorted) {
            order = (order === 'ascending' ? 'descending' : 'ascending');
        } else {
            sorted = columnName;
        }
        this.setState({
            sorted,
            order
        });
    }

    renderCell(item, columnNameKey, itemKey, link, labels) {
        const suffix = link.suffix || '';
        let element = (<td>{item[columnNameKey]}</td>);
        if (link && link.columnName === columnNameKey) {
            element = (
                <td>
                    <Link
                        to={link.prefix + item[this.getLinkId()] + suffix}
                        activeClassName="item-active"
                    >
                        {item[columnNameKey]}
                    </Link>
                </td>
            );
        }
        if (labels && labels[columnNameKey]) {
            element = (
                <td>
                    {labels[columnNameKey][item[columnNameKey]]}
                </td>
            );
        }
        return element;
    }

    renderRow(columnNames, itemKey, item, link) {
        return (
            <tr key={item[itemKey]}>
                {this.props.select && this.renderToggle(item)}
                {Object.keys(columnNames).map(columnNameKey =>
                    this.renderCell(item, columnNameKey, itemKey, link, this.props.labels))}
            </tr>
        );
    }

    renderFiltersBar(rowCount = 0) {
        return (
            <div className="filterBar">

                {this.props.rowCounter &&
                    <div className="ui label row-count">
                        {rowCount}/{this.props.items.length} {this.props.rowCounter}
                    </div>
                }


                {this.props.search &&
                    <SearchField
                        value={this.state.searchText}
                        onChange={data => this.handleSearchChange(data)}
                    />
                }

                {this.props.filters &&
                    <Filter
                        filters={this.props.filters}
                        onChange={data => this.handleFilterChange(data)}
                    />
                }

                {this.state.selected.length > 0 &&
                    <Actions
                        selected={this.state.selected}
                        actions={this.props.actions}
                    />
                }

                {this.props.dateFields &&
                    <DateInterval
                        onChange={
                            (fromDate, toDate) => this.handleDateFilterChange(fromDate, toDate)
                        }
                    />
                }
            </div>
        );
    }

    renderToggle(item) {
        return (
            <td className="one wide checkbox">
                <div className="ui fitted toggle checkbox">
                    <input
                        type="checkbox"
                        onClick={(e) => this.handleToggle(e, item)}
                        checked={_.findIndex(this.state.selected,
                            (obj) => (obj.id === item.id)) > -1 ? 'checked' : ''}
                    />
                    <label></label>
                </div>
            </td>
        );
    }

    renderToggleAll() {
        return (
            <th className="one wide checkbox">
                <div className="ui fitted toggle checkbox">
                    <input
                        type="checkbox"
                        onClick={() => this.toggleSelectAll()}
                        checked={this.state.selectedAll ? 'checked' : ''}
                    />
                    <label></label>
                </div>
            </th>
        );
    }
    render() {
        const rows = this.applyFilters(this.props.items);

        return (
            <div>
                {this.renderFiltersBar(rows.length)}
                <table className="ui fixed single sortable line very basic table unstackable">
                    <thead>
                        <tr>
                        {this.props.select && this.renderToggleAll()}
                        {Object.keys(this.props.columnNames).map(columnNameKey => (
                            <th
                                onClick={() => this.toggleSort(columnNameKey)}
                                className={
                                    (this.state.sorted === columnNameKey)
                                    ? `sorted ${this.state.order}` : ''
                                }
                            >
                                {this.props.columnNames[columnNameKey]}
                            </th>
                        ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(item =>
                            this.renderRow(
                                this.props.columnNames,
                                this.props.itemKey,
                                item,
                                this.props.link))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

Table.propTypes = {
    columnNames: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    itemKey: PropTypes.string.isRequired,
    linkKey: PropTypes.string,
    link: PropTypes.object,
    actions: PropTypes.array,
    selected: PropTypes.array,
    select: PropTypes.bool,
    search: PropTypes.bool,
    rowCounter: PropTypes.string,
    labels: PropTypes.object,
    filters: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        field: PropTypes.string.isRequired,
        group: PropTypes.string.isRequired
    })),
    dateFields: PropTypes.shape({
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired
    })
};

export default Table;
