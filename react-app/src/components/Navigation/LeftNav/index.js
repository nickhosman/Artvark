import React from "react";
import { ReactComponent as ArtvarkLogo } from "../../../public/artvark-brown.svg";
import { FaHeart, FaHome, FaPalette } from "react-icons/fa";
import "./LeftNav.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LeftNav() {
    const history = useHistory();

    const handleLikesClick = (e) => {
        e.preventDefault();
        history.push("/posts/liked");
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        history.push("/posts");
    };

    return (
        <div id="left-nav-wrapper">
            <div id="left-nav-logo">
                <ArtvarkLogo />
            </div>
            <div className="left-nav-item" onClick={handleHomeClick}>
                <FaHome id="nav-button" />
                <p className="left-nav-text">Home</p>
            </div>
            <div className="left-nav-item" onClick={handleLikesClick}>
                <FaHeart id="nav-button" />
                <p className="left-nav-text">Likes</p>
            </div>
            <div className="left-nav-item">
                <FaPalette id="nav-button"/>
                <p className="left-nav-text">Themes</p>
            </div>
        </div>
    );
}

export default LeftNav;
