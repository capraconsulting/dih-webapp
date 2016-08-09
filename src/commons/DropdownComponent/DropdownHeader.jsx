import React, { PropTypes } from 'react';

const DropdownHeader = (props) => (
    <div className="header">
        {props.name}
    </div>
);

DropdownHeader.propTypes = {
    icon: PropTypes.string,
    name: PropTypes.string
};

export default DropdownHeader;
