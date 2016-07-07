import React, { PropTypes } from 'react';
import { Link } from 'react-router';

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

const table = (props) => (
    <table className="ui fixed single line very basic table unstackable">
        <thead>
            <tr>
            {Object.keys(props.columnNames).map(columnNameKey => (
                <th>{props.columnNames[columnNameKey]}</th>
            ))}
            </tr>
        </thead>
        <tbody>
            {props.items.map(item => createRow(props.columnNames, props.itemKey, item, props.link))}
        </tbody>
    </table>
);

table.propTypes = {
    columnNames: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    itemKey: PropTypes.string.isRequired,
    link: PropTypes.object
};

export default table;
