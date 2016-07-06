import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { list } from '../../../../actions/destinationActions';

import DestinationInfo from '../components/DestinationInfo';

const createHandlers = (dispatch) => () => dispatch(list());

class DestinationInfoContainer extends React.Component {

    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers();
    }

    render() {
        return (
            <DestinationInfo
                destination={
                    this.props.destination
                }
            />
        );
    }
}

const mapStateToProps = store => ({
    destination: store.destinationState.destination
});

DestinationInfoContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    destination: React.PropTypes.array.isRequired
};

export default connect(mapStateToProps)(DestinationInfoContainer);
