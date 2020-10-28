import React, { useState, useEffect } from "react";
import MapBox from "./MapBox";

const DEFAULT_LONGITUDE = 24.66876706129493;
const DEFAULT_LATITUDE = 59.3960972;
const DEAFULT_POLYGON = [
    [59.3963393, 24.6685288],
    [59.3958267, 24.6687407],
    [59.3958551, 24.6690053],
    [59.3963412, 24.6688044],
    [59.3963661, 24.6690368],
    [59.3964213, 24.6690139],
    [59.3964118, 24.6689238],
    [59.3967541, 24.6687844],
    [59.3967426, 24.6686749],
    [59.3967273, 24.6685325],
    [59.3963562, 24.6686861],
    [59.3963393, 24.6685288]
];

const Main = () => {
    
    // const [city, setCity] = useState("Tallinn");
    // const [street, setStreet] = useState("");
    // const [houseNumber, setHouseNumber] = useState("");
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("Tallinn");
    const [lat, setLatitude] = useState("");
    const [long, setLongitude] = useState("");
    const [latlongs, setLatlongs] = useState([]);
    
    useEffect(() => {
        getSearchData();
        console.log(query);
    }, [query]);

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
            setLatlongs(DEAFULT_POLYGON);
        }else{
            setLatitude(data[0].lat);
            setLongitude(data[0].lon);

            const array = data[0].geojson.coordinates[0];
            for(let i=0;i<array.length;i++){
                for(let j=0;j<array[i].length;j++){
                    if(j===1){
                        let temp = array[i][j-1];
                        array[i][j-1] = array[i][j];
                        array[i][j] = temp; 
                    }
                }
            }
            setLatlongs(array);
            // console.log(array);
        }
    };

    return(
        <div>
        <form className="search-form" onSubmit={e => {
            e.preventDefault();
            setQuery(search);
            // setSearch("");
        }}>
            <input className="search-bar" type="text" onChange={e => {
                setSearch(e.target.value);
            }} value={search} placeholder="Search address ..." />
            <button className="search-button" type="submit">Search</button>
        </form>
        <MapBox latitude={lat} longitude={long} polygon={latlongs} />
        </div>
    );
}

export default Main;