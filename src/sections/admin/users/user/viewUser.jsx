import React, { PropTypes } from 'react';
import UserInfo from '../../../../commons/userInfo';

const ViewUser = (props) => (
    <UserInfo
        user={props.user}
        showAdminFields
    />
);

ViewUser.propTypes = {
    user: PropTypes.object
};


export default ViewUser;
