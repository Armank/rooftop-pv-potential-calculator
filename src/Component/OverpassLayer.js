import React, { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";

const OverpassLayer = (props) => {
 
  function keyFunction(geojson) {
    if (geojson.features.length === 0) {
      return "";
    } else {
      return geojson.features[0].id;
    }
  }

  return props.geojson ? <GeoJSON key={keyFunction(props.geojson)} data={props.geojson} /> : null;
};

export default OverpassLayer;