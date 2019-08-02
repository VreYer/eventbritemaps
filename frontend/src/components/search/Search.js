import React,  { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { eventsRequest } from '../../store/actions/eventActions';

const Search = ({ eventsRequest }) => {

    const [term, setTerm] = useState('');

    const onChange = (e) => setTerm(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();

        if (term !== '') {
            eventsRequest(term);
        }
    }

    return (
        <div className="mb-3">
            <form onSubmit={onSubmit} className="form mb-2">
                <div className="input-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        name="search"
                        value={term}
                        onChange={onChange}
                        placeholder="Please type city like Yerevan " />
                        
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="submit">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

Search.propTypes = {
    eventsRequest: PropTypes.func.isRequired
}

export default connect(null, { eventsRequest })(Search);
