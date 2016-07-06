import React, { PropTypes } from 'react';

/*
* commons.Table
* @param {props} With properties items, columnNames. There's also an optional
* property key.
* Items is an array of objects.
* columnNames is an object on the form {propertyName : columnName}, where
* propertyName is a property in Object. Properties here are shown in the table.
* key: id is the default for table key, but if you want to use something else,
* set it as a string in key
*/
function Table(props) {
    return (
        <table className="ui fixed single line very basic table unstackable">
            <thead>
                <tr>
                {Object.keys(props.columnNames).map(columnNameKey => (
                    <th>{props.columnNames[columnNameKey]}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {props.items.map(item => (
                    <tr key={item.id ? item.id : item[props.key]}>
                    {Object.keys(props.columnNames).map(columnNameKey => (
                        <td>{item[columnNameKey]}</td>
                    ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

Table.propTypes = {
    columnNames: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    key: PropTypes.string
};

export default Table;
