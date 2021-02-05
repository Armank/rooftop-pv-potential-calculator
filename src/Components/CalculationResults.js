import React, { useEffect, useState } from "react";
import style from "./css/calc-res.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Bar } from 'react-chartjs-2';
const PORT = 'https://rooftop-pv-estimator-api.herokuapp.com';
const CalculationResults = (props) => {
  const [geojson, setGeojson] = useState();
  const [object, setObject] = useState({});
  const [roofArea, setRoofArea] = useState(0);
  const [slope, setSlope] = useState(0);
  const [azimuth, setAzimuth] = useState(0);
  const [pvTechnology, setPvTechnology] = useState('');
  const [peakPower, setPeakPower] = useState(0);
  const [yearlyPvProd, setYearlyPvProd] = useState(0);
  const [monthEnergyArray, setMonthEnergyArray] = useState([]);
  let monthlyDataset = [];

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
        getCalculationData(props.latitude, props.longitude, roofArea);
      }
    }
  }, [props.geoJson, geojson, props.area, props.lat, props.long]);

  // .features[0].properties["addr:street"]

  const getCalculationData = async (lat, long, area) => {
    const request = `${PORT}/api/calculation/${lat}/${long}/${area}`;
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
    if (data.inputs) {
      setSlope(data.inputs.mounting_system.fixed.slope.value);
      setAzimuth(data.inputs.mounting_system.fixed.azimuth.value)
      setPvTechnology(data.inputs.pv_module.technology);
      setPeakPower(data.inputs.pv_module.peak_power);

    }

    if (data.outputs) {
      setYearlyPvProd(data.outputs.totals.fixed.E_y);
      setMonthEnergyArray(data.outputs.monthly.fixed);
      console.log('Array', data.outputs.monthly.fixed);
    }
  };

  monthEnergyArray.forEach(item => {
    monthlyDataset.push(item.E_m);
  });

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
            <Row>
              <Col className={style.column}>
                <label>Slope Angle</label>
              </Col>
              <Col className={style.column}>
                <label>{slope}</label>
              </Col>
            </Row>
            <Row>
              <Col className={style.column}>
                <label>Azimuth</label>
              </Col>
              <Col className={style.column}>
                <label>{azimuth}</label>
              </Col>
            </Row>
            <Row>
              <Col className={style.column}>
                <label>PV Technology</label>
              </Col>
              <Col className={style.column}>
                <label>{pvTechnology}</label>
              </Col>
            </Row>
            <Row>
              <Col className={style.column}>
                <label>Peak Power</label>
              </Col>
              <Col className={style.column}>
                <label>{Number(peakPower).toFixed(2)} kWp</label>
              </Col>
            </Row>
            <Row>
              <Col className={style.column}>
                <label>Yearly PV Energy Production</label>
              </Col>
              <Col className={style.column}>
                <label>{Number(yearlyPvProd).toFixed(2)} kWh</label>
              </Col>
            </Row>
          </Container>
        </div>
        <div className={style.dataContainer}>
        <Container className={style.container}>
          <Bar 
            data = {{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [{
                label: 'Monthly energy output [kWh]',
                data: monthlyDataset,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',                    
                ],
                borderWidth: 1
              }]
            }}
            height = {400}
            width = {600}
            options = {{
              title: {
                display: true,
                text: 'Monthly energy output from fix-angle PV system',
                fontSize: 14,
                lineHeight: 2
              },
              maintainAspectRatio: false,
              scales:{
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              },
              legend: {
                display: false,
                labels: {
                  fontColor: 'rgb(255, 99, 132)'
                }
              }
            }}
          />
        </Container>
        </div>
      </div>
    </div>
  );
};

export default CalculationResults;
