import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerRequest } from '../../store/actions/authActions';

const Signup = ({ auth: { isAuthenticated, loading, error }, registerRequest }) => {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const { username, email, password } = user;

    const onSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);
        
        if (username !== '' && email !== '' && password !== '') {
            registerRequest(user);
        }
    }

    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    if (loading) {
        return null;
    }

    if (isAuthenticated && !loading) {
        return <Redirect to="/" />
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-md-center">
                <div className="col col-lg-4">
                    <h1 className="pb-2 text-center">Welcome</h1>
                    <h3 className="pb-5 text-center">Signup</h3>

                    {error ? <div className="alert alert-danger">{error}</div> : ''}

                    <form onSubmit={onSubmit} className="form mb-2">
                        <div className="form-group">
                            <input 
                                type="text" 
                                className={'form-control' + (submitted && !username ? ' is-invalid' : '')}
                                name="username"
                                value={username}
                                onChange={onChange}
                                placeholder="Name" />
                                {submitted && !username && <div className="invalid-feedback">Name is required</div>}
                        </div>
                        <div className="form-group">
                            <input 
                                type="email" 
                                className={'form-control' + (submitted && !email ? ' is-invalid' : '')}
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="Email" />
                                {submitted && !email && <div className="invalid-feedback">Email is required</div>}
                        </div>
                        <div className="form-group pb-3">
                            <input 
                                type="password" 
                                className={'form-control' + (submitted && !password ? ' is-invalid' : '')}
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Password" />
                                {submitted && !password && <div className="invalid-feedback">Password is required</div>}
                        </div>
                        <button type="submit" className="btn btn-success btn-block">Login</button>
                    </form>

                    <div className="alert alert-light text-center mt-5" role="alert">
                        Already registered? <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

Signup.propTypes = {
    registerRequest: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { registerRequest })(Signup);