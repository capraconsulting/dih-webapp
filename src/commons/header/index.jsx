import React, { PropTypes } from 'react';
import Breadcrumbs from 'react-breadcrumbs';
import './header.scss';


const Header = (props) => (
    <header className={`header ${props.isMobile ? 'isMobile' : ''}`}>
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
    routes: PropTypes.array.isRequired,
    isMobile: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    toggleSidebar: PropTypes.func.isRequired
};

export default Header;
