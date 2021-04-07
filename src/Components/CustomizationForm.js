import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import options from "./resources/options";
import ResultingGraph from "./ResultingGraph";

import style from "./css/calc-res.module.css";

const CustomizationForm = ({ PORT, lat, long, addressObj, peakPower, yearlyPvProd, solarSysSize, totInstallCost, roofArea, slope, azimuth, eurSqrMeter, avgElctrctPrice, payback, monthlyDataset, styles }) => {
    const [state, setState] = useState({
        roofArea: roofArea || 0,
        slope: slope || 0,
        azimuth: azimuth || 0,
        pvValue: 'crystSi',
        yearlyPvProd: yearlyPvProd || 0,
        monthlyOutputData: monthlyDataset || [],
        eurSqrMeter: eurSqrMeter || 0,
        avgElctrctPrice: avgElctrctPrice,
        // totInstallCost: totInstallCost || 0,
    });
    const [rawData, setRawData] = useState([]);
    const [newPeakPower, setNewPeakPower] = useState(peakPower || 0);
    const [customSolarSysSize, setCustomSolarSysSize] = useState(solarSysSize || 0);
    const [customInstallCost, setCustomInstallCost] = useState(totInstallCost || 0);
    const [customPayback, setCustomPayback] = useState(payback || 0);
    let array = [];

    const getCalculationData = async (
        lat,
        long,
        area,
        pvTech,
        customSlope,
        customAzimuth,
        eurSqrMeter,
        electrPrice,
    ) => {
        const request = `${PORT}/api/cust-calculation/${lat}/${long}/${area}/${pvTech}/${customSlope}/${customAzimuth}`;
        const response = await fetch(request);
        const data = await response.json();
        if (data.inputs) {
            setNewPeakPower(data.inputs.pv_module.peak_power);
        }
        if (data.outputs) {
            setState({
                ...state,
                yearlyPvProd: Number(data.outputs.totals.fixed.E_y) / 1000,
            });
            setRawData(data.outputs.monthly.fixed);
            getSolarSystemSize(data.outputs.totals.fixed.E_y);

            getTotalInstallationCost(area, eurSqrMeter, Number(data.outputs.totals.fixed.E_y) / 1000, electrPrice);
        }
    };

    const getSolarSystemSize = async (yearlyPvProd) => {
        const request = `${PORT}/api/system-size/${yearlyPvProd}`;
        const response = await fetch(request);
        const data = await response.json();
        setCustomSolarSysSize(data.solarSysSize);
    };

    const getTotalInstallationCost = async (area, eurSqrMeter, yearlyPvProd, electrPrice) => {
        const request = `${PORT}/api/total-cost/:${area}/:${eurSqrMeter}`;
        const response = await fetch(request);
        const data = await response.json();
        setCustomInstallCost(data.totalCost);
        // setState({
        //     ...state,
        //     totInstallCost: data.totalCost
        // });
        getPaybackTime(data.totalCost, yearlyPvProd, electrPrice);
    };

    const getPaybackTime = async (totInstallCost, yearlyPvProd, electrPrice) => {
        const request = `${PORT}/api/payback/:${totInstallCost}/:${yearlyPvProd}/:${electrPrice}`;
        const response = await fetch(request);
        const data = await response.json();
        setCustomPayback(data.payback);
    }

    const change = (e) => {
        setState({
            ...state, [e.target.name]: e.target.value
        });
    }

    const onSubmit = (e, lat, long, roofArea, pvValue, slope, azimuth, eurSqrMeter, totInstallCost, yearlyPvProd, electrPrice) => {
        e.preventDefault();
        getCalculationData(lat, long, roofArea, pvValue, slope, azimuth, eurSqrMeter, electrPrice);
        // getTotalInstallationCost(roofArea, eurSqrMeter);
        // alert(totInstallCost + ' ' + yearlyPvProd + ' ' + electrPrice);
        // alert(totInstallCost);
        // getPaybackTime(totInstallCost, yearlyPvProd, electrPrice);
    }

    rawData.forEach((item) => {
        array.push(item.E_m);
    });

    const handleChange = (e) => {
        // setState({
        //     ...state, pvValue: e.value
        // });

        if (e.value === 'crystSi') {
            setState({
                ...state,
                pvValue: e.value,
                eurSqrMeter: 41
            });
        }
        if (e.value === 'CIS') {
            setState({
                ...state,
                pvValue: e.value,
                eurSqrMeter: 176.8
            });
        }
        if (e.value === 'CdTe') {
            setState({
                ...state,
                pvValue: e.value,
                eurSqrMeter: 82.5
            });
        }
    }

    return (
        <div className={style.resultsContainer}>
            <div className={style.dataContainer}>
                <Container className={style.containerCustom}>
                    <Row>
                        <Col className={style.column}>
                            <label>Address</label>
                        </Col>
                        <Col className={style.column}>
                            <label>
                                {addressObj.street} {addressObj.houseNumber}
                            </label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style.column}>
                            <label>Peak Power</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{Number(newPeakPower).toFixed(2)} kWp</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style.column}>
                            <label>Solar System Size</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{customSolarSysSize} kW</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style.column}>
                            <label>Yearly PV Energy Production</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{Number(state.yearlyPvProd).toFixed(2)} MWh</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style.column}>
                            <label>Total Installation Cost</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{customInstallCost} €</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style.column}>
                            <label>Payback</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{customPayback}</label>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Form>
                        <Row>
                            <Col className={style.column}>
                                <Form.Label>Cost of a panel per 1 m<sup>2</sup></Form.Label>
                            </Col>
                            <Col className={style.column}>
                                <Form.Control name="eurSqrMeter" type="number" value={state.eurSqrMeter} onChange={(e) => change(e)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className={style.column}>
                                <Form.Label>Average electricity price €/MWh</Form.Label>
                            </Col>
                            <Col className={style.column}>
                                <Form.Control name="avgElctrctPrice" type="number" value={state.avgElctrctPrice} onChange={(e) => change(e)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className={style.column}>
                                <Form.Label>Estimated Area [m<sup>2</sup>]</Form.Label>
                            </Col>
                            <Col className={style.column}>
                                <Form.Control name="roofArea" type="number" value={state.roofArea} onChange={(e) => change(e)} />
                            </Col>
                        </Row>
                        <hr></hr>
                        <Row>
                            <Col className={style.column}>
                                <Form.Label>Slope Angle</Form.Label>
                            </Col>
                            <Col className={style.column}>
                                <Form.Control name="slope" type="number" value={state.slope} onChange={(e) => change(e)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className={style.column}>
                                <Form.Label>Azimuth</Form.Label>
                            </Col>
                            <Col className={style.column}>
                                <Form.Control name="azimuth" type="number" value={state.azimuth} onChange={(e) => change(e)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className={style.column}>
                                <label>PV Technology</label>
                            </Col>
                            <Col className={style.column}>
                                <Select
                                    options={options}
                                    defaultValue={options[0]}
                                    onChange={handleChange}
                                    styles={styles}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <div className={style.customBtnContainer}>
                                <button className={style.searchButton} type="submit" onClick={(e) => {
                                    onSubmit(e, lat, long, state.roofArea, state.pvValue, state.slope, state.azimuth, state.eurSqrMeter, customInstallCost, state.yearlyPvProd, state.avgElctrctPrice);
                                }}>
                                    Submit
                                </button>
                            </div>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
            <ResultingGraph monthlyDataset={array.length !== 0 ? array : state.monthlyOutputData} />
        </div>
    );
}

export default CustomizationForm;