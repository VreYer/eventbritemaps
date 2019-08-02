import React from 'react';
import { connect } from 'react-redux';
import { logoutRequest } from '../../store/actions/authActions';
import PropTypes from 'prop-types';

const Navbar = ({ logoutRequest }) => {
    
    return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
            <h5 className="my-0 mr-md-auto font-weight-normal">Eventbrite Maps</h5>
            <button onClick={logoutRequest} className="btn btn-outline-primary">Logout</button>
        </div>
    )
}

Navbar.propTypes = {
    logoutRequest: PropTypes.func.isRequired
}

export default connect(null, { logoutRequest })(Navbar);
