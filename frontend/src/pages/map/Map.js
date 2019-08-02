import React, { Fragment } from 'react';
import CustomMap from '../../components/customMap/CustomMap';
import Search from '../../components/search/Search';
import Navbar from '../../components/layout/Navbar';

const Map = () => {
    return (
        <Fragment>
            <Navbar />
            <div className="container mt-5">
                <Search />
                <CustomMap />
            </div>
        </Fragment>
    )
}

export default Map;