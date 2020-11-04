import React from "react";
import Button from '@material-ui/core/Button';

import style from "./header.module.css";

const Header = () => {
    return(
        <div id="header" className={style.header}>
            <div className={style.container}>
                <h1 className={style.headerText}>Solar Energy</h1>
                <a href="#main">
                    <Button className={style.btnStart} variant="outlined">Get Started</Button> 
                </a>
            </div>
        </div>
    );
}

export default Header;