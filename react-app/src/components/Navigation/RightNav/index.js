import React from "react";
import { useSelector } from "react-redux";
import { FaUser, FaPlus, FaUsers } from "react-icons/fa";
import CreatePostFormModal from "../../Posts/CreatPostFormModal";
import OpenModalElement from "../../OpenModalElement";
import "./RightNav.css";
import About from "../../About";
import UserCard from "../../User";
import SignupFormModal from "../../SignupFormModal";
import LoginFormModal from "../../LoginFormModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function RightNav() {
    const current_user = useSelector((state) => state.session.user);
    const history = useHistory();

    const handleFollowingClick = () => {
        history.push("/posts/following");
    };

    return (
        <div id="right-nav-wrapper">
            <div id="right-nav-spacer">
                <svg></svg>
            </div>
            {current_user ? (
                <OpenModalElement
                    className="right-nav-item"
                    text={
                        <>
                            <p className="right-nav-text">User</p>
                            <FaUser id="nav-button" />
                        </>
                    }
                    modalComponent={<UserCard />}
                />
            ) : (
                <div id="user-dropdown">
                    <OpenModalElement
                        id="dropdown-log-in"
                        className="dropdown-item"
                        text="Log In"
                        modalComponent={<LoginFormModal />}
                    />
                    <OpenModalElement
                        id="dropdown-sign-up"
                        className="dropdown-item"
                        text="Sign Up"
                        modalComponent={<SignupFormModal />}
                    />
                </div>
            )}
            {current_user ? (
                <div className="right-nav-item" onClick={handleFollowingClick}>
                    <p className="right-nav-text">Following</p>
                    <FaUsers id="nav-button" />
                </div>
            ) : null}
            {current_user ? (
                <OpenModalElement
                    id="right-nav-post"
                    className="right-nav-item"
                    text={
                        <>
                            <p>Post</p>
                            <FaPlus />
                        </>
                    }
                    modalComponent={<CreatePostFormModal />}
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
