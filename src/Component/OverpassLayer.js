// import React, { useEffect, useState } from 'react';
// import { GeoJSON } from 'react-leaflet';

// const overpass = require("query-overpass");

// const OverpassLayer = (props) => {

//     const [geojson, setGeojson] = useState(undefined);

//     useEffect(()=>{
//         makeQuery();
//     },[geojson]);

//     const makeQuery = () => {
//         const query = `[out:json];nwr["addr:city"="${props.city}"]["addr:street"="${props.street}"]["addr:housenumber"="${props.houseNumber}"][building];out geom;`;

//         const options = {
//             flatProperties: true,
//             overpassUrl: 'https://overpass-api.de/api/interpreter'
//         }
//         overpass(query, dataHandler, options);
//     }

//     const dataHandler = (error, osmData) => {
//         if (!error && osmData.features !== undefined) {
//             console.log(osmData);
//             setGeojson(osmData);
//         }
//       };

//     return(
//             geojson ? <GeoJSON data={geojson} /> : null
//     );
// }

// export default OverpassLayer;

import React from "react";
import { GeoJSON } from "react-leaflet";
const overpass = require("query-overpass");

export default class OverpassLayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geojson: undefined
    };
  }

  componentDidMount() {
      console.log(this.props.city);
      console.log(this.props.street);
      console.log(this.props.houseNumber);
    const query = `[out:json];nwr["addr:city"="${this.props.city}"]["addr:street"="${this.props.street}"]["addr:housenumber"="${this.props.houseNumber}"][building];out geom;`;
    const options = {
      flatProperties: true,
      overpassUrl: 'https://overpass-api.de/api/interpreter'
    };
    overpass(query, this.dataHandler, options);
  }

  dataHandler = (error, osmData) => {
    console.log(osmData);
    if (!error && osmData.features !== undefined) {
      this.setState({ geojson: osmData });
    }
  };

  render() {
    return this.state.geojson ? <GeoJSON data={this.state.geojson} /> : null;
  }
}
