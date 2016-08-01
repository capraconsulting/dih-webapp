import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { list } from '../../../actions/destinationActions';
import Table from '../../../commons/table';

const createHandlers = (dispatch) => () => dispatch(list());

class DestinationsList extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers();
    }

    render() {
        return (
            <Table
                columnNames={{
                    name: 'Name',
                    minimumTripDurationInDays: 'Minimum trip duration'
                }}
                itemKey="id"
                link={{
                    columnName: 'name',
                    prefix: '/admin/destinations/'
                }}
                items={this.props.destinations}
            />
        );
    }
}

const mapStateToProps = store => ({
    destinations: store.destinationState.destinations
});

DestinationsList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    destinations: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(DestinationsList);
