import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

import SearchField from './searchField';
import Filter from './filter';
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
*/

const createElement = (item, columnNameKey, itemKey, link) => {
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
};

const createRow = (columnNames, itemKey, item, link) => (
    <tr key={item[itemKey]}>
        {Object.keys(columnNames).map(columnNameKey =>
            createElement(item, columnNameKey, itemKey, link))}
    </tr>
);

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sorted: this.props.itemKey,
            order: 'ascending',
            searchText: '',
            activeFilter: null
        };
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

    filter(array) {
        const { field, value } = this.state.activeFilter;
        return _.filter(array, [field, value]);
    }

    sort(array) {
        let filteredArray = array;
        if (this.state.activeFilter) filteredArray = this.filter(array);
        const searchResultArray = this.search(filteredArray);
        const sorted = _.sortBy(searchResultArray, this.state.sorted);
        if (this.state.order === 'descending') return _.reverse(sorted);
        return sorted;
    }

    search(array) {
        const searchText = this.state.searchText.toLowerCase();
        if (searchText.length === 0) return array;

        return _.filter(array, data => {
            const search = _.values(data).join().toLowerCase();
            return new RegExp(searchText).test(search);
        });
    }

    handleSearchChange(searchText) {
        this.setState({ searchText });
    }

    handleFilterChange(activeFilter) {
        this.setState({ activeFilter });
    }

    render() {
        return (
            <div>
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
                        {this.sort(this.props.items).map(item =>
                            createRow(
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
    filters: PropTypes.array
};

export default Table;
