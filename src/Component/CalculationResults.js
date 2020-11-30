import React, { useEffect, useState } from "react";
import style from "./css/calc-res.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CalculationResults = (props) => {
  const [geojson, setGeojson] = useState();
  const [object, setObject] = useState({});
  const [roofArea, setRoofArea] = useState(0);

  useEffect(() => {
    if (props.geoJson) {
      setGeojson(props.geoJson);
      if (geojson) {
        console.log(geojson);
        setObject({
          street: geojson.features[0].properties["addr:street"],
          houseNumber: geojson.features[0].properties["addr:housenumber"],
        });
        setRoofArea(Number(props.area).toFixed(2));
      }
    }
  }, [props.geoJson, geojson, props.area]);

  // .features[0].properties["addr:street"]

  return (
    <div id="results" className={style.container}>
      <div className={style.resultsContainer}>
        <div className={style.dataContainer}>
          <Container className={style.container}>
            <Row>
              <Col className={style.column}>
                <label>Address</label>
              </Col>
              <Col className={style.column}>
                <label>{object.street} {object.houseNumber}</label>
              </Col>
            </Row>
            <Row>
              <Col className={style.column}>
                <label>Estimated Area</label>
              </Col>
              <Col className={style.column}>
                <label>{roofArea} m<sup>2</sup></label>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default CalculationResults;
