import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Segments from '../../../../commons/Segments';
import Navbar from '../../../../commons/navbar';
import { retrieve, update, list } from '../../../../actions/adminValuesActions';
import { pushNotification } from '../../../../actions/notificationActions';

const ADMIN_VALUE_TABLE_LOCATION = '/admin/values';
const createHandlers = (dispatch) => (
    {
        retrieve(id) {
            return dispatch(retrieve(id));
        },
        update(body) {
            return dispatch(update(body));
        },
        list() {
            return dispatch(list());
        },
        notification(message, level) {
            return dispatch(pushNotification(message, level));
        }
    }
);

class AdminValue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pages: [
                {
                    name: 'Value',
                    uri: `/admin/values/${this.props.params.adminValueId}`
                },
                {
                    name: 'Edit value',
                    uri: `/admin/values/${this.props.params.adminValueId}/edit`
                }
            ]
        };
        this.handlers = createHandlers(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers.retrieve(this.props.params.adminValueId)
        .then(() => {
            this.setState({ loading: false });
            return this.handlers.list();
        });
    }

    onUpdate(adminValue) {
        this.handlers.update({ id: this.props.params.adminValueId, ...adminValue })
            .then(response => {
                const message = 'Admin value changes saved!';
                const { error } = response;
                if (!error) this.handlers.notification(message, 'success');
                browserHistory.push(ADMIN_VALUE_TABLE_LOCATION);
                return this.handlers.retrieve(this.props.params.adminValueId);
            });
    }

    render() {
        return (
            <Segments loading={this.state.loading} >
                <Navbar pages={this.state.pages} />
                {React.cloneElement(this.props.children, {
                    initialValues: this.props.adminValue,
                    adminValue: this.props.adminValue,
                    editAdmin: true,
                    account: this.props.account,
                    onSubmit: e => this.onUpdate(e)
                })}
            </Segments>
        );
    }
}

const mapStateToProps = store => ({
    account: store.accountState.account,
    adminValue: store.adminValuesState.adminValue
});

AdminValue.propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    adminValue: PropTypes.object.isRequired,
    account: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(AdminValue);
