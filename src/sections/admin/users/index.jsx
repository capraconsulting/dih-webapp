import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Table from '../../../commons/table';
import { list } from '../../../actions/userActions';

const createHandlers = (dispatch) => () => dispatch(list());

class UsersTableContainer extends Component {
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
                    firstname: 'First name',
                    lastname: 'Last name',
                    email: 'E-mail',
                    role: 'Role'
                }}
                link={{
                    columnName: 'firstname',
                    prefix: '/admin/users/'
                }}
                itemKey="id"
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
