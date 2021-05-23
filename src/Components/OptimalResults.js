import React, { useState } from "react";
import style from "./css/calc-res.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ResultingGraph from "./ResultingGraph";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import descriptions from "./resources/descriptions.js";

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

    const [showMoreInfoBtn, setShowMoreInfoBtn] = useState(false);

    const [open, setOpen] = useState(false);

    const [dialogText, setDialogText] = useState();

    const handleClickOpen = (e) => {
        if (({}).hasOwnProperty.call(descriptions, e.target.id)) {
            console.log(descriptions[e.target.id] + " === " + e.target.id);
            setDialogText(descriptions[e.target.id]);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={style.resultsContainer}>
            <div className={style.dataContainer}>
                <Container>
                    <Row>
                        <Col className={style.column}>
                            <label id="address" onClick={handleClickOpen}>Address</label>
                        </Col>
                        <Col className={style.column}>
                            <label>
                                {addressObj.street} {addressObj.houseNumber}
                            </label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style.column}>
                            <label id="annualNrgProd" onClick={handleClickOpen}>Yearly PV Energy Production</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{Number(yearlyPvProd).toFixed(2)} MWh</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style.column}>
                            <label id="totInstCost" onClick={handleClickOpen}>Total Installation Cost</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{totInstallCost} €</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style.column}>
                            <label id="payback" onClick={handleClickOpen}>Payback</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{payback}</label>
                        </Col>
                    </Row>
                </Container>
                {showMoreInfoBtn && <Container className={style.container}>
                    <Row>
                        <Col className={style.column}>
                            <label id="peakpower" onClick={handleClickOpen}>Peak Power</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{Number(peakPower).toFixed(2)} kWp</label>
                        </Col>
                    </Row>
                    {/* <Row> 
                        <Col className={style.column}>
                            <label>Solar System Size</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{solarSysSize} kW</label>
                        </Col>
                    </Row> */}
                    <hr></hr>
                    <Row>
                        <Col className={style.column}>
                            <label id="panelCost" onClick={handleClickOpen}>Cost of a panel per 1 m<sup>2</sup></label>
                        </Col>
                        <Col className={style.column}>
                            <label>{eurSqrMeter} €/m<sup>2</sup></label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style.column}>
                            <label id="electrPrice" onClick={handleClickOpen}>Average electricity price</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{avgElctrctPrice} €/MWh</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style.column}>
                            <label id="area" onClick={handleClickOpen}>Estimated Area</label>
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
                            <label id="slope" onClick={handleClickOpen}>Slope Angle</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{slope}</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style.column}>
                            <label id="azimuth" onClick={handleClickOpen}>Azimuth</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{azimuth}</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={style.column}>
                            <label id="pvTech" onClick={handleClickOpen}>PV Technology</label>
                        </Col>
                        <Col className={style.column}>
                            <label>{state.pvValue ? 'Crystalline Silicon' : ''}</label>
                        </Col>
                    </Row>
                </Container>}
                {!showMoreInfoBtn && <div className={style.secondaryBtnContainer}>
                    {
                        <button
                            className={style.showMoreInfoBtn}
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowMoreInfoBtn(true);
                            }}>
                            Show more info
                        </button>
                    }
                </div>}
                {showMoreInfoBtn && <div className={style.secondaryBtnContainer}>
                    {
                        <button
                            className={style.showMoreInfoBtn}
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                setShowMoreInfoBtn(false);
                            }}>
                            Show less info
                        </button>
                    }
                </div>}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {dialogText}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
            <ResultingGraph monthlyDataset={monthlyDataset} />
        </div>
    );
}

export default OptimalResults;