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
            <div className="ui buttons dateIntervalButton">
                <DateFilter
                    datePrefix="From"
                    date={this.state.fromDate}
                    maxDate={this.state.toDate}
                    onChange={data => this.updateDate(data, 'fromDate')}
                />
                <DateFilter
                    datePrefix="To"
                    date={this.state.toDate}
                    minDate={this.state.fromDate}
                    onChange={data => this.updateDate(data, 'toDate')}
                />
            </div>
        );
    }
}

DateInterval.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default DateInterval;
