import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Table from '../../../commons/Table';
import { list } from '../../../actions/userActions';

const createHandlers = (dispatch) => () => dispatch(list());

class UsersTableContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers().then(() => { console.log(this.props.users);})
    }

    render() {
        return (
            <Table
                columnNames={{
                    firstname: 'First name',
                    lastname: 'Last name',
                    email: 'E-mail',
                    role: 'Role'
                }}
                items={this.props.users}
            />
        );
    }
}

const mapStateToProps = store => ({
    users: store.userState.users
});

UsersTableContainer.propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(UsersTableContainer);
