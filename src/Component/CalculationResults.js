import React, { useEffect, useState } from "react";
import style from "./css/calc-res.module.css";

const CalculationResults = (props) => {
  const [geojson, setGeojson] = useState();

  useEffect(() => {
    if(props.geoJson){
      setGeojson(props.geoJson.features[0].properties['addr:street']);
    }
  });

  return (
    <div id="results" className={style.container}>
      <div className={style.resultsContainer}>
        <div className={style.dataContainer}>
          <h3>{geojson}</h3>
          <p>Rooftop Area - {props.area}</p>
        </div>
      </div>
    </div>
  );
};

export default CalculationResults;
