import React from "react";
import { ReactComponent as ArtvarkLogo } from "../../../public/artvark-brown.svg";
import { FaHome } from "react-icons/fa"
import "./LeftNav.css"

function LeftNav() {
    return (
        <div id="left-nav-wrapper">
            <div className="left-nav-item">
                <ArtvarkLogo />
                <p className="left-nav-text">Artvark</p>
            </div>
            <div className="left-nav-item">
                <FaHome id="nav-button"/>
                <p className="left-nav-text">Home</p>
            </div>
        </div>
    );
}

export default LeftNav;
