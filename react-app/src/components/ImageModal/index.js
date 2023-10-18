import React from "react";
import "./ImageModal.css";

export default function ImageModal({ imageUrl }) {
    return (
        <div id="full-img-wrapper">
            <img id="full-img" src={imageUrl} alt="" />
        </div>
    );
}
