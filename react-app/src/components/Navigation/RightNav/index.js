import React from "react";
import { useSelector } from "react-redux";
import { FaUser, FaPlus } from "react-icons/fa";
import CreatePostFormModal from "../../Posts/CreatPostFormModal";
import OpenModalElement from "../../OpenModalElement";
import "./RightNav.css";
import About from "../../About";

function RightNav() {
    const current_user = useSelector((state) => state.session.user);

    return (
        <div id="right-nav-wrapper">
            <div id="right-nav-spacer">
                <svg></svg>
            </div>
            <div className="right-nav-item">
                <p className="right-nav-text">User</p>
                <FaUser id="nav-button" />
            </div>
            {current_user ? (
                <OpenModalElement
                    id="right-nav-post"
                    className="right-nav-item"
                    modalComponent={<CreatePostFormModal />}
                    text={<><p>Post</p><FaPlus /></>}
                />
            ) : null}
            <div id="about-links">
                <OpenModalElement
                    className="about-link-item"
                    text="About"
                    modalComponent={<About />}
                />
                <p>© 2023 Artvark Inc.</p>
            </div>
        </div>
    );
}

export default RightNav;
