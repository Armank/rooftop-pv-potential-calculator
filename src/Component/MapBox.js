import React, { useEffect } from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import ChangeView from './ChangeView';
import OverpassLayer from './OverpassLayer';

const MapBox = (props) => {

    useEffect(()=>{
        updateMap();
    },[props.street, props.houseNumber]);

    const passStreet = props.street;
    const passHouseNumber = props.houseNumber;
    
    const updateMap = () => {
        return(
            <MapContainer center={[props.latitude, props.longitude]} zoom={20}>
                <ChangeView center={[props.latitude, props.longitude]} zoom={20} />
                <TileLayer
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <OverpassLayer street={passStreet} houseNumber={passHouseNumber} />
            </MapContainer>
        );
    }

    return(
        updateMap()
    );
}

export default MapBox;