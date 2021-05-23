import React from "react";

import style from "./header.module.css";

const Header = () => {
    return(
        <div id="header" className={style.header}>
            <div>
                <h1 className={style.headerText}>Rooftop PV Potential Estimation</h1>
            </div>
        </div>
    );
}

export default Header;