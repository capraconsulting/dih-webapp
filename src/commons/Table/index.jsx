import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import moment from 'moment';

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
* link: is an object describing the links to be created on the table, it needs a
* prefix and a columnName name, to create a link with the prefix url  followed by the
* itemKey value for the object.
*
* search (optional): Boolean. Add as a parameter if you want the table to be searchable
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
            sorted: this.props.itemKey,
            order: 'ascending',
            searchText: '',
            activeFilter: null,
            fromDate: null,
            toDate: null
        };
    }

    filter(array) {
        const { field, value } = this.state.activeFilter;
        return _.filter(array, [field, value]);
    }

    filterDate(array) {
        const { fromDate, toDate } = this.state;

        return array.filter(row => {
            const rowStartDate = moment(row[this.props.dateFields.from]);
            const rowEndDate = moment(row[this.props.dateFields.to]);

            if (fromDate && toDate) {
                return rowStartDate.isSameOrAfter(fromDate)
                    && rowEndDate.isSameOrBefore(toDate);
            }
            if (fromDate && !toDate) return rowStartDate.isSameOrAfter(fromDate);
            if (!fromDate && toDate) return rowEndDate.isSameOrBefore(toDate);
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

    handleSearchChange(searchText) {
        this.setState({ searchText });
    }

    handleFilterChange(activeFilter) {
        this.setState({ activeFilter });
    }

    handleDateFilterChange(fromDate, toDate) {
        this.setState({ fromDate, toDate });
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

    renderCell(item, columnNameKey, itemKey, link) {
        let element = (<td>{item[columnNameKey]}</td>);
        if (link && link.columnName === columnNameKey) {
            element = (
                <td>
                    <Link to={link.prefix + item[itemKey]} activeClassName="item-active">
                        {item[columnNameKey]}
                    </Link>
                </td>
            );
        }
        return element;
    }

    renderRow(columnNames, itemKey, item, link) {
        return (
            <tr key={item[itemKey]}>
                {Object.keys(columnNames).map(columnNameKey =>
                    this.renderCell(item, columnNameKey, itemKey, link))}
            </tr>
        );
    }

    renderFiltersBar() {
        return (
            <div className="filterBar">
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

    render() {
        return (
            <div>
                {this.renderFiltersBar()}
                <table className="ui fixed single sortable line very basic table unstackable">
                    <thead>
                        <tr>
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
                        {this.applyFilters(this.props.items).map(item =>
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
    link: PropTypes.object,
    search: PropTypes.bool,
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
