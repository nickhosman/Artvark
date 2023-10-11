import React from "react";
import { ReactComponent as ArtvarkLogo } from "../../../public/artvark-brown.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { FaHeart, FaHome } from "react-icons/fa";
import { FaPalette } from "react-icons/fa";
import OpenModalElement from "../../OpenModalElement";
import "./LeftNav.css";
import ThemesModal from "../../Themes";

function LeftNav() {
    const history = useHistory();
    const user = useSelector((state) => state.session.user);

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
            {user ? (
                <div className="left-nav-item" onClick={handleHomeClick}>
                    <FaHome id="nav-button" />
                    <p className="left-nav-text">Home</p>
                </div>
            ) : null}
            {user ? (
                <div className="left-nav-item" onClick={handleLikesClick}>
                    <FaHeart id="nav-button" />
                    <p className="left-nav-text">Likes</p>
                </div>
            ) : null}
            {
                <OpenModalElement
                    className="left-nav-item"
                    text={
                        <>
                            <FaPalette id="nav-button" />
                            <p className="left-nav-text">Themes</p>
                        </>
                    }
                    modalComponent={<ThemesModal />}
                />
            }
        </div>
    );
}

export default LeftNav;
