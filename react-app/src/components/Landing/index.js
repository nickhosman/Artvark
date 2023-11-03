import React, { useEffect } from "react";
import { ReactComponent as ArtvarkComponent } from "../../public/artvark-brown.svg";
import OpenModalButton from "../OpenModalButton";
import "./Landing.css";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FaGithub, FaGithubSquare, FaLinkedin } from "react-icons/fa";

function Landing() {
    const history = useHistory();
    const current_user = useSelector((state) => state.session.user);

    useEffect(() => {
        if (current_user) {
            history.push("/posts");
        }
    }, [current_user, history]);

    return (
        <div id="landing-wrapper-wrapper">
            <div id="landing-wrapper">
                <div id="landing-left">
                    <ArtvarkComponent id="logo" fill="#6f5851" />
                </div>
                <div id="landing-right">
                    <div id="call-to-action">
                        <span id="slogan">
                            A Picture is Worth All the Words You Need.
                        </span>
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
            <span id="landing-about-wrapper">
                <a
                    className="landing-about-item"
                    href="https://nickhosman.me/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Portfolio Site
                </a>
                <a
                    className="landing-about-item"
                    href="https://github.com/nickhosman"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaGithubSquare />
                    Github Profile
                </a>
                <a
                    className="landing-about-item"
                    href="https://github.com/nickhosman/Artvark"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaGithub />
                    Project Repo
                </a>
                <a
                    className="landing-about-item"
                    href="https://www.linkedin.com/in/nicholas-hosman-428558206/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaLinkedin />
                    LinkedIn
                </a>
            </span>
        </div>
    );
}

export default Landing;
