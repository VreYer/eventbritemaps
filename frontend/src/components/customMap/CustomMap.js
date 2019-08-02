import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { connect } from 'react-redux';
import Spinner from '../spinner/Spinner';

const CustomMap = ({ events: {events: { events, location }, loading, error }}) => {

    const [position, setPosition] = useState(null);
    const [eventInfo, setEventInfo] = useState({});
    const [isWindoOpen, setIsWindoOpen] = useState(false);
    const [mapCenter, setMapCenter] = useState({
        lat: 40.1872023,
        lng: 44.51520900000003
    });

    useEffect(() => {
        
        if (location) {
            setMapCenter({
                lat: parseFloat(location.latitude),
                lng: parseFloat(location.longitude)
            });
        }

        return () => {
            
        }
        
    }, [location]);

    const handleToggle = (event) => {
        setIsWindoOpen(true);

        const { latitude, longitude, address: { localized_address_display } } = event.venue;
        const { name } = event;

        setPosition({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
        setEventInfo({ name: name.text, address: localized_address_display });
    }

    const handleToggleClose = () => setIsWindoOpen(false);

    if(loading) {
        return <Spinner />
    }

    return (
        <LoadScript
            id="script-loader"
            googleMapsApiKey="AIzaSyDfnDeuOc-u4Ne2N1PL6R5dkDOqoQan3MY" >

            {error ? <div className="alert alert-danger">{error}</div> : ''}

            <GoogleMap
                id='example-map'
                mapContainerStyle={{
                    height: "400px"
                }}
                zoom={12}
                center={mapCenter}
                onCenterChanged={() => (console.log('test'))}
            >
                
            {events && events.map((event) => {
                const { latitude, longitude } = event.venue;

                return (
                    <Marker
                        key={event.id}
                        position={{
                            lat: parseFloat(latitude),
                            lng: parseFloat(longitude)
                        }}
                        onClick={() => handleToggle(event)}
                    />
                )
            })}
            {position && isWindoOpen &&
                <InfoWindow
                    position={position}
                    onCloseClick={handleToggleClose} >
                    <div style={{
                        background: `white`,
                        border: `1px solid #ccc`,
                        padding: 15
                    }}>
                        <h5>{eventInfo.name}</h5>
                        <h6>{eventInfo.address}</h6>
                    </div>
                </InfoWindow>
            }
          </GoogleMap>
        </LoadScript>
    )
}

CustomMap.propTypes = {
    events: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        events: state.event
    }
}

export default connect(mapStateToProps)(CustomMap);
