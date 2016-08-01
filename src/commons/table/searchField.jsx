import React, { Component, PropTypes } from 'react';

class SearchField extends Component {
    handleChange() {
        this.props.onChange(this.refs.searchInput.value);
    }

    render() {
        return (
            <div className="ui icon input search">
                <i className="search icon"></i>
                <input
                    type="text"
                    placeholder="Search"
                    value={this.props.value}
                    ref="searchInput"
                    onChange={e => this.handleChange(e)}
                />
            </div>
        );
    }
}


SearchField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SearchField;
