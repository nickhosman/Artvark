import React, { useEffect } from "react";
import { ReactComponent as ArtvarkComponent } from "../../public/artvark-brown.svg"
import OpenModalButton from "../OpenModalButton";
import "./Landing.css";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Landing() {
    const history = useHistory();
    const current_user = useSelector((state) => state.session.user);

    useEffect(() => {
        if (current_user) {
            // console.log("WE DID IT")
            history.push("/posts");
        }
    }, [current_user, history]);

    return (
        <div id="landing-wrapper">
            <div id="landing-left">
                <ArtvarkComponent id="logo" fill="#6f5851"/>
            </div>
            <div id="landing-right">
                <div id="call-to-action">
                    <span id="slogan">A Picture is Worth All the Words You Need.</span>
                    <p id="sign-up-text">Sign up now!</p>
                </div>
                <div id="landing-button-wrapper">
                    <OpenModalButton
                        id="landing-sign-up"
                        className="landing-button"
                        modalComponent={<SignupFormModal />}
                        buttonText={"Create Account"}
                    />
                    <OpenModalButton
                        id="landing-login"
                        className="landing-button"
                        modalComponent={<LoginFormModal />}
                        buttonText={"Sign In"}
                    />
                </div>
            </div>
        </div>
    );
}

export default Landing;
