import React from "react";

import style from "./header.module.css";

const Header = () => {
    return(
        <div className={style.header}>
            <h1 className={style.headerText}>My Map</h1>
        </div>
    );
}

export default Header;