import React, { Component } from 'react';
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
        this.setState({ [field]: date });
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

export default DateInterval;
