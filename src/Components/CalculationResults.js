import React, { useEffect, useState } from "react";
import style from "./css/calc-res.module.css";
import CustomizationForm from './CustomizationForm';
import OptimalResults from './OptimalResults';

const PORT = 'https://rooftop-pv-estimator-api.herokuapp.com';
// const PORT = "http://localhost:3000";
const CalculationResults = (props) => {

  const PV_VALUE = "crystSi"; // default value for PV technology
  const EUR_SQR_METER = 41; // default price for cost of a PV panel per square meter for Crystaline Silicon technology Eur/m2
  const AVG_ELCTRCT_PRICE = 33.69; // default price for electricity in 2020 in Estonia from NordPool in Eur/MWh 

  const [geojson, setGeojson] = useState();
  const [object, setObject] = useState({});
  const [roofArea, setRoofArea] = useState(0);
  const [slope, setSlope] = useState(0);
  const [azimuth, setAzimuth] = useState(0);
  const [peakPower, setPeakPower] = useState(0);
  const [yearlyPvProd, setYearlyPvProd] = useState(0);
  const [solarSysSize, setSolarSysSize] = useState(0);
  const [totInstallCost, setTotInstallCost] = useState(0);
  const [monthEnergyArray, setMonthEnergyArray] = useState([]);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [payback, setPayback] = useState(0);
  let monthlyDataset = [];

  useEffect(() => {
    if (props.geoJson) {
      setGeojson(props.geoJson);
      if (geojson) {
        setObject({
          street: geojson.features[0].properties["addr:street"],
          houseNumber: geojson.features[0].properties["addr:housenumber"],
        });
        setRoofArea(Number(props.area).toFixed(2));
        getCalculationData(
          props.latitude,
          props.longitude,
          roofArea,
          PV_VALUE
        );
        getTotalInstallationCost(roofArea);
      }
    }
  }, [
    props.geoJson,
    geojson,
    props.area,
    props.latitude,
    props.longitude,
    totInstallCost,
  ]);


  const getCalculationData = async (
    lat,
    long,
    area,
    pvTech
  ) => {
    const request = `${PORT}/api/calculation/${lat}/${long}/${area}/${pvTech}`;
    const response = await fetch(request);
    const data = await response.json();
    if (data.inputs) {
      setSlope(data.inputs.mounting_system.fixed.slope.value);
      setAzimuth(data.inputs.mounting_system.fixed.azimuth.value);
      setPeakPower(data.inputs.pv_module.peak_power);
    }

    if (data.outputs) {
      setYearlyPvProd(Number(data.outputs.totals.fixed.E_y)/1000); // Actual output is kWh, but chage it to MWh by dividing by 1000
      setMonthEnergyArray(data.outputs.monthly.fixed);

      getSolarSystemSize(data.outputs.totals.fixed.E_y);
      getPaybackTime(totInstallCost, Number(data.outputs.totals.fixed.E_y)/1000, AVG_ELCTRCT_PRICE);
    }
  };

  const getSolarSystemSize = async (yearlyPvProd) => {
    const request = `${PORT}/api/system-size/${yearlyPvProd}`;
    const response = await fetch(request);
    const data = await response.json();
    setSolarSysSize(data.solarSysSize);
  };

  const getTotalInstallationCost = async (area) => {
    const request = `${PORT}/api/total-cost/:${area}/:${EUR_SQR_METER}`;
    const response = await fetch(request);
    const data = await response.json();
    setTotInstallCost(data.totalCost);
  };

  const getPaybackTime = async (totInstallCost, yearlyPvProd, electrPrice) => {
    const request = `${PORT}/api/payback/:${totInstallCost}/:${yearlyPvProd}/:${electrPrice}`;
    const response = await fetch(request);
    const data = await response.json();
    setPayback(data.payback);
  }

  monthEnergyArray.forEach((item) => {
    monthlyDataset.push(item.E_m);
  });

  const styles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "0.5px solid gray",
      color: state.isSelected ? "#59886b" : "black",
      backgroundColor: "white",
      padding: "0.5rem",
    }),
  };

  return (
    <div id="results" className={style.container}>
      {!showCustomForm && <OptimalResults
        addressObj={object}
        peakPower={peakPower}
        pvValue={PV_VALUE}
        yearlyPvProd={yearlyPvProd}
        solarSysSize={solarSysSize}
        totInstallCost={totInstallCost}
        roofArea={roofArea}
        slope={slope}
        azimuth={azimuth}
        eurSqrMeter={EUR_SQR_METER}
        avgElctrctPrice={AVG_ELCTRCT_PRICE}
        payback={payback}
        monthlyDataset={monthlyDataset}
        styles={styles}
      />
      }
      {
        showCustomForm && <CustomizationForm
          PORT={PORT}
          lat={props.latitude}
          long={props.longitude}
          addressObj={object}
          peakPower={peakPower}
          yearlyPvProd={yearlyPvProd}
          solarSysSize={solarSysSize}
          totInstallCost={totInstallCost}
          roofArea={roofArea}
          slope={slope}
          azimuth={azimuth}
          eurSqrMeter={EUR_SQR_METER}
          avgElctrctPrice={AVG_ELCTRCT_PRICE}
          payback={payback}
          monthlyDataset={monthlyDataset}
          styles={styles}
        />
      }
      <div className={style.customBtnContainer}>
      {
        !showCustomForm && <button
          className={style.customizeButton}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setShowCustomForm(true);
          }}>
          Customize results
            </button>
      }
      </div>
    </div>
  );
};

export default CalculationResults;
