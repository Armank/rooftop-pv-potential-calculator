import React, { useState, useEffect } from "react";
import MapBox from "./MapBox";

import Grid from '@material-ui/core/Grid';

import style from "./component.module.css";

const DEFAULT_LONGITUDE = 24.66876706129493;
const DEFAULT_LATITUDE = 59.3960972;

const Main = () => {
    const [query, setQuery] = useState("Tallinn");
    const [lat, setLatitude] = useState("");
    const [long, setLongitude] = useState("");
    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [qStreet, setQStreet] = useState("Kinga");
    const [qHouseNumber, setQHouseNumber] = useState("1");

    useEffect(() => {
        getSearchData();
        console.log(query);
    },[query]);

    const getSearchData = async () => {
        const exampleReq = `https://nominatim.openstreetmap.org/search/${query}?format=json&building=*&addressdetails=1&limit=1&polygon_geojson=1`;
        const response = await fetch(exampleReq);
        const data = await response.json();
        // console.log(data);
        if (data === undefined || data.length === 0) {
            // array empty or does not exist
            console.log("data array is empty");
            alert("Given address unrecognized! Try again please.")
            setLatitude(DEFAULT_LATITUDE);
            setLongitude(DEFAULT_LONGITUDE);
        }else{
            setLatitude(data[0].lat);
            setLongitude(data[0].lon);
            // console.log(data);
        }
    };

    const makeFirstLetterCapital = (string) => {
        let replaced = string[0].toUpperCase() + string.slice(1);
        return replaced;
    }

    return(
        <div id="main" className={style.mainContainer}>
            <div className={style.inputForm}>
                <form className={style.searchForm} onSubmit={e => {
                    e.preventDefault();
                    setQuery(street + " " + houseNumber.replace(/\//g, "-") + ", Tallinn");
                    if(street){
                        setQStreet(makeFirstLetterCapital(street));
                        setQHouseNumber(houseNumber.replace(/-/g,"/"));
                    }else{
                        setQStreet("Kinga");
                        setQHouseNumber("1");
                    }
                }}>
                    <input className={style.searchBar} type="text" onChange={e => {
                        setStreet(e.target.value);
                    }} value={street} placeholder="Search street ..." />

                    <input className={style.searchBar} type="text" onChange={e => {
                        setHouseNumber(e.target.value);
                    }} value={houseNumber} placeholder="Search house number ..." />

                    <button className={style.searchButton} type="submit">Search</button>
                </form>
            </div>
            <MapBox latitude={lat} longitude={long} street={qStreet} 
                houseNumber={qHouseNumber} />
        </div>
    );
}

export default Main;