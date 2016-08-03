import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { USER_ROLES } from '../../../../constants';

import AddCoordinatorForm from './addCoordinatorForm';
import { list } from '../../../../actions/userActions';

const createHandlers = (dispatch) => () => dispatch(list());

class Coordinators extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers();
    }

    filterModerators(items) {
        const cleanObjects = [];
        _.mapKeys(items, value => {
            if (value.role === USER_ROLES.MODERATOR || value.role === USER_ROLES.ADMIN) {
                cleanObjects.push({
                    id: value.id,
                    name: `${value.firstname} ${value.lastname}`
                });
            }
        });
        return cleanObjects;
    }

    handleSubmit(data) {
        console.log(data);
    }

    render() {
        const moderators = this.filterModerators(this.props.users);
        return (
            <div>
                <AddCoordinatorForm
                    moderators={moderators}
                />
            </div>
        );
    }
}

const mapStateToProps = store => ({
    users: store.userState.users
});

Coordinators.propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: React.PropTypes.array
};

export default connect(mapStateToProps)(Coordinators);
