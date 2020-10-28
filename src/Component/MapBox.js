import React from 'react';
import {Map, TileLayer, Polygon} from 'react-leaflet';
import OverpassLayer from './OverpassLayer';

const MapBox = (props) => {
    return(
        <Map center={[props.latitude, props.longitude]} zoom={20}>
            <TileLayer
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Polygon positions={props.polygon} color="blue" />
            {/* <OverpassLayer/> */}
        </Map>
    );
}

export default MapBox;