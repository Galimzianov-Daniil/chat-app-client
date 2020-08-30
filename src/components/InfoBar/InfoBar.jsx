import React from "react";
import onlineIcon from "../../img/onlineIcon.png"
import closeIcon from "../../img/closeIcon.png"

import "./Infobar.css";

const InfoBar = ({ room }) => (
    <div className="infoBar">

        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon} alt="online"/>
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={closeIcon} alt="Leave"/></a>
        </div>

    </div>
)

export default InfoBar;