import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import DateFilter from './dateFilter';

class DateInterval extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fromDate: this.props.fromDate ? moment(this.props.fromDate) : null,
            toDate: this.props.toDate ? moment(this.props.toDate) : null
        };
    }

    updateDate(date, field) {
        const data = {
            fromDate: this.state.fromDate || null,
            toDate: this.state.toDate || null
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
    fromDate: PropTypes.String,
    toDate: PropTypes.String,
    onChange: PropTypes.func.isRequired
};

export default DateInterval;
