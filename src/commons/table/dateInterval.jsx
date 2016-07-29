import React, { Component, PropTypes } from 'react';
import DateFilter from './dateFilter';

class DateInterval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromDate: null,
            toDate: null
        };
    }

    updateDate(date, field) {
        const data = {
            fromDate: this.state.fromDate,
            toDate: this.state.toDate
        };
        this.setState({ [field]: date });
        data[field] = date;
        this.props.onChange(data.fromDate, data.toDate);
    }

    render() {
        return (
            <div className="ui buttons">
                <DateFilter
                    onChange={data => this.updateDate(data, 'fromDate')}
                    datePrefix="From"
                    maxDate={this.state.toDate}
                    date={this.state.fromDate}
                />
                <DateFilter
                    onChange={data => this.updateDate(data, 'toDate')}
                    datePrefix="To"
                    minDate={this.state.fromDate}
                    date={this.state.toDate}
                />
            </div>
        );
    }
}

DateInterval.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default DateInterval;
