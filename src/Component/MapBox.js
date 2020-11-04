import React, { useEffect } from 'react';
import {Map, TileLayer} from 'react-leaflet';
import OverpassLayer from './OverpassLayer';

const MapBox = (props) => {

    useEffect(()=>{
        updateMap();
    },[props.street, props.houseNumber]);

    // console.log(props.street);
    // console.log(props.houseNumber);
    const passStreet = props.street;
    const passHouseNumber = props.houseNumber;

    const updateMap = () => {
        return(
            <Map center={[props.latitude, props.longitude]} zoom={20}>
            <TileLayer
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <OverpassLayer street={passStreet} houseNumber={passHouseNumber} />
        </Map>
        );
    }

    return(
        updateMap()
    );
}

export default MapBox;