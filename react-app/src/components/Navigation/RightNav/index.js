import React from "react";
import CreatePostFormModal from "../../Posts/CreatPostFormModal";
import OpenModalButton from "../../OpenModalButton";
import "./RightNav.css"
import { useSelector } from "react-redux";
import ProfileButton from "../ProfileButton";

function RightNav() {
    const current_user = useSelector(state => state.session.user)

    return (
        <div id="right-nav-wrapper">
        {current_user ? <OpenModalButton
            id="right-nav-post"
            className="nav-button"
            modalComponent={<CreatePostFormModal />}
            buttonText={"Create Post"}
        /> : null}
        <ProfileButton user={current_user}/>
        </div>
    );
}

export default RightNav
