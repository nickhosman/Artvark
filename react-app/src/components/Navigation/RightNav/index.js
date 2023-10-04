import React from "react";
import CreatePostFormModal from "../../Posts/CreatPostFormModal";
import OpenModalButton from "../../OpenModalButton";

function RightNav() {
    return (
        <div id="right-nav-wrapper">
            <OpenModalButton
                id="right-nav-post"
                className="nav-button"
                modalComponent={<CreatePostFormModal />}
                buttonText={"Create Post"}
            />
        </div>
    );
}

export default RightNav
