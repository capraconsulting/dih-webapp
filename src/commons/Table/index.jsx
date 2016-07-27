import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
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
            order: 'ascending'
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

    sort(array) {
        const sorted = _.sortBy(array, this.state.sorted);
        if (this.state.order === 'descending') return _.reverse(sorted);
        return sorted;
    }

    render() {
        return (
            <table className="ui fixed single sortable line very basic table unstackable">
                <thead>
                    <tr>
                    {Object.keys(this.props.columnNames).map(columnNameKey => (
                        <th
                            onClick={() => this.toggleSort(columnNameKey)}
                            className={(this.state.sorted === columnNameKey) ? `sorted ${this.state.order}` : ''}
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
        );
    }
}

Table.propTypes = {
    columnNames: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    itemKey: PropTypes.string.isRequired,
    link: PropTypes.object
};

export default Table;
