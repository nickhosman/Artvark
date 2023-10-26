import React, { useState } from "react";
import "./ImageModal.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

export default function ImageModal({ images, idx }) {
    const [currIdx, setCurrIdx] = useState(idx);

    return (
        <div id="full-img-wrapper">
            <IconContext.Provider value={{ size: "5rem", className: "img-nav-arrows" }}>
                {images[currIdx - 1] ? (
                    <div
                        className="img-nav"
                        id="img-nav-left"
                        onClick={() => setCurrIdx(currIdx - 1)}
                    >
                        <FaArrowAltCircleLeft />
                    </div>
                ) : null}
                <img id="full-img" src={images[currIdx].url} alt="" draggable={false}/>
                {images[currIdx + 1] ? (
                    <div
                        className="img-nav"
                        id="img-nav-right"
                        onClick={() => setCurrIdx(currIdx + 1)}
                    >
                        <FaArrowAltCircleRight />
                    </div>
                ) : null}
            </IconContext.Provider>
        </div>
    );
}
