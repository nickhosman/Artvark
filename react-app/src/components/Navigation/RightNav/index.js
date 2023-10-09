import React from "react";
import CreatePostFormModal from "../../Posts/CreatPostFormModal";
import OpenModalButton from "../../OpenModalButton";
import "./RightNav.css";
import { useSelector } from "react-redux";
import ProfileButton from "../ProfileButton";

function RightNav() {
    const current_user = useSelector((state) => state.session.user);

    return (
        <div id="right-nav-wrapper">
            <div id="right-nav-spacer"></div>
            <ProfileButton user={current_user} />
            {current_user ? (
                <OpenModalButton
                    id="right-nav-post"
                    className="nav-button"
                    modalComponent={<CreatePostFormModal />}
                    buttonText={"Create Post"}
                />
            ) : null}
        </div>
    );
}

export default RightNav;
