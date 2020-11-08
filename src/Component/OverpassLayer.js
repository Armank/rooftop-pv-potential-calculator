import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
var turf = require('@turf/turf');

const overpass = require("query-overpass");

const OverpassLayer = (props) => {

    const [geojson, setGeojson] = useState();
    useEffect(()=>{
      makeQuery();
    },[props.street, props.houseNumber]);

    const makeQuery = () => {
        const query = `[out:json];nwr["addr:street"="${props.street}"]["addr:housenumber"="${props.houseNumber}"][building](59.3518076,24.55017,59.5915769,24.9262831);out geom;`;

        const options = {
            flatProperties: true,
            overpassUrl: 'https://overpass-api.de/api/interpreter'
        }
        overpass(query, dataHandler, options);
    }

    const dataHandler = (error, osmData) => {
        if (!error && osmData.features !== undefined && osmData.features[0] !== undefined) {
          console.log(osmData.features[0]);
          let area = getArea(osmData.features[0].geometry.coordinates[0]);
          console.log(area);
          setGeojson(osmData);
        }
    };

    function keyFunction(geojson){
        if(geojson.features.length === 0){
          return "";
        }else{
          return geojson.features[0].id;
        }
    }

    function getArea(array){
      if(array){
        let arrayPolygon = array;
        let polygon = turf.polygon([arrayPolygon]);
        let area = turf.area(polygon);
        return area;
      }
      return 0;
    }

    return(
            geojson ? <GeoJSON key={keyFunction(geojson)}  data={geojson} /> : null
    );

}

export default OverpassLayer;

// import React from "react";
// import { GeoJSON } from "react-leaflet";
// const overpass = require("query-overpass");

// const deafult_street = "Kinga";
// const default_houseNumber = "1";

// export default class OverpassLayer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       geojson: undefined
//     };
//     // console.log(this.props.city);
//     console.log(this.props.street);
//     console.log(this.props.houseNumber);
//   }

//   componentDidMount() {
//     const query = `[out:json];nwr["addr:street"="${this.props.street?this.props.street:deafult_street}"]["addr:housenumber"="${this.props.houseNumber?this.props.houseNumber:default_houseNumber}"][building](59.3518076,24.55017,59.5915769,24.9262831);out geom;`;
//     const options = {
//       flatProperties: true,
//       overpassUrl: 'https://overpass-api.de/api/interpreter'
//     };
//     overpass(query, this.dataHandler, options);
//   }

//   dataHandler = (error, osmData) => {
//     console.log(osmData);
//     if (!error && osmData.features !== undefined) {
//       this.setState({ geojson: osmData });
//     }
//   };

//   render() {
//     return this.state.geojson ? <GeoJSON data={this.state.geojson} /> : null;
//   }
// }
