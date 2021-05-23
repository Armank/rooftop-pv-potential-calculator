import React, { useState, useEffect } from "react";
import MapBox from "./MapBox";
import CalculationResults from "./CalculationResults";
import style from "./css/component.module.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

var turf = require("@turf/turf");
const overpass = require("query-overpass");


const DEFAULT_LONGITUDE = 24.66876706129493;
const DEFAULT_LATITUDE = 59.3960972;

const Main = () => {
  const [query, setQuery] = useState("Tallinn");
  const [lat, setLatitude] = useState("");
  const [long, setLongitude] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [address, setAddress] = useState({
    street: "Kinga",
    hNumber: "1",
  });
  const [geojson, setGeojson] = useState();
  var [area, setArea] = useState();

  useEffect(() => {
    getSearchData();
    makeQuery(address.street, address.hNumber);
  }, [query, address.street, address.hNumber]);

  const getSearchData = async () => {
    const exampleReq = `https://nominatim.openstreetmap.org/search/${query}?format=json&building=*&addressdetails=1&limit=1&polygon_geojson=1`;
    const response = await fetch(exampleReq);
    const data = await response.json();
    if (data === undefined || data.length === 0) {
      // array empty or does not exist
      alert("Given address unrecognized! Try again please.");
      setLatitude(DEFAULT_LATITUDE);
      setLongitude(DEFAULT_LONGITUDE);
    } else {
      setLatitude(data[0].lat);
      setLongitude(data[0].lon);
    }
  };

  const makeQuery = (street, houseNumber) => {
    const query = `[out:json];nwr["addr:street"="${street}"]["addr:housenumber"="${houseNumber}"][building](59.3518076,24.55017,59.5915769,24.9262831);out geom;`;

    const options = {
      flatProperties: true,
      overpassUrl: "https://overpass-api.de/api/interpreter",
    };
    overpass(query, dataHandler, options);
  };

  const dataHandler = (error, osmData) => {
    if (
      !error &&
      osmData.features !== undefined &&
      osmData.features[0] !== undefined
    ) {
      setArea((getArea(osmData.features[0].geometry.coordinates[0])));
      setGeojson(osmData);
    }
  };

  function getArea(array) {
    if (array) {
      let polygon = turf.polygon([array]);
      let area = turf.area(polygon);
      return area;
    }
    return 0;
  }

  const makeFirstLetterCapital = (string) => {
    let replaced = string[0].toUpperCase() + string.slice(1);
    return replaced;
  };

  const updateMapBox = () => {
    if (lat && long) {
      return (
        <MapBox
          latitude={lat}
          longitude={long}
          street={address.street}
          houseNumber={address.hNumber}
          geoJSON={geojson}
        />
      );
    }
  };

  const validateAddress = () => {
    if (!street) {
      setAddress({
        street: "Kinga",
        hNumber: "1",
      });
    }
    setAddress({
      street: makeFirstLetterCapital(street),
      hNumber: houseNumber.replace(/-/g, "/"),
    });
  }

  return (
    <div>
     <Container fluid className={style.mainContainer}>
       <Row xs={1} lg={2} className={style.row}>
         <Col className={style.comp}>
            <form
                className={style.searchForm}
                onSubmit={(e) => {
                  e.preventDefault();
                  if(street){
                    setQuery(
                      street + " " + houseNumber.replace(/\//g, "-") + ", Tallinn"
                    );
                    validateAddress();
                  }
                }}
              >
                <input
                  className={style.searchBar}
                  type="text"
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                  value={street}
                  placeholder="Search street ..."
                />

                <input
                  className={style.searchBar}
                  type="text"
                  onChange={(e) => {
                    setHouseNumber(e.target.value);
                  }}
                  value={houseNumber}
                  placeholder="Search house number ..."
                />

                <a className={style.btnLink} href="#results">
                  <button className={style.searchButton} type="submit">
                    Search
                  </button>
                </a>
              </form>
         </Col>
         <Col className={style.comp}>
            {updateMapBox()}
         </Col>
       </Row>
     </Container>
     <CalculationResults street={address.street} houseNumber={address.hNumber} 
        geoJson={geojson} area={area} latitude={lat} longitude={long} />
    </div>
  );
};

export default Main;
