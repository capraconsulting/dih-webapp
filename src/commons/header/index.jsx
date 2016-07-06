import React, { PropTypes } from 'react';
import Breadcrumbs from 'react-breadcrumbs';
import './header.scss';


const Header = (props) => (
    <header className={props.isMobile ? 'isMobile' : ''}>
        {props.isMobile &&
            <i className="content big icon" onClick={(e) => props.toggleSidebar(e)} ></i>}
        <div>
            <Breadcrumbs
                routes={props.routes}
                params={props.params}
            />
        </div>
    </header>
);

Header.propTypes = {
    routes: PropTypes.array,
    isMobile: PropTypes.bool,
    params: PropTypes.object,
    toggleSidebar: PropTypes.func
};

export default Header;
