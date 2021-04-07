import React, { useState } from "react";
import style from "./css/calc-res.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ResultingGraph from "./ResultingGraph";

const OptimalResults = ({ addressObj, peakPower, pvValue, yearlyPvProd, solarSysSize, totInstallCost, roofArea, slope, azimuth, eurSqrMeter, avgElctrctPrice, payback, monthlyDataset, styles }) => {
    const [state, setState] = useState({
        roofArea: roofArea || 0,
        slope: slope || 0,
        azimuth: azimuth || 0,
        pvValue: pvValue,
        peakPower: peakPower || 0,
        yearlyPvProd: yearlyPvProd || 0,
        solarSysSize: solarSysSize || 0,
        totInstallCost: totInstallCost || 0,
        eurSqrMeter: eurSqrMeter || 0,
        avgElctrctPrice: avgElctrctPrice || 0,
        payback: payback || 0,
        monthEnergyArray: [],
    });

    const handleChange = (e) => {
        setState({
            ...state,
            pvValue: e.value
        });
    };

    return (
        <div className={style.resultsContainer}>
            <div className={style.dataContainer}>
                <Container className={style.container}>
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
                            <label>{Number(peakPower).toFixed(2)} kWp</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style.column}>
                            <label>Yearly PV Energy Production</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{Number(yearlyPvProd).toFixed(2)} MWh</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style.column}>
                            <label>Solar System Size</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{solarSysSize} kW</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style.column}>
                            <label>Total Installation Cost</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{totInstallCost} €</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style.column}>
                            <label>Payback</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{payback}</label>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                        <Col className={style.column}>
                            <label>Cost of a panel per 1 m<sup>2</sup></label>
                        </Col>
                        <Col className={style.column}>
                            <label>{eurSqrMeter} €/m<sup>2</sup></label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style.column}>
                            <label>Average electricity price</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{avgElctrctPrice} €/MWh</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style.column}>
                            <label>Estimated Area</label>
                        </Col>
                        <Col className={style.column}>
                            <label>
                                {roofArea} m<sup>2</sup>
                            </label>
                        </Col>
                    </Row>
                    <hr></hr>
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
                        <label>{state.pvValue ? 'Crystalline Silicon' : ''}</label>
                        </Col>
                    </Row>
                </Container>
            </div>
            <ResultingGraph monthlyDataset={monthlyDataset} />
        </div>
    );
}

export default OptimalResults;