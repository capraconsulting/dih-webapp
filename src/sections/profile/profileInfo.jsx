import React, { PropTypes } from 'react';

import UserInfo from '../../commons/userInfo';

const ProfileInfo = (props) => (
    <UserInfo
        user={props.account}
    />
);

ProfileInfo.propTypes = {
    account: PropTypes.object
};

export default ProfileInfo;
