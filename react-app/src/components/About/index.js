import React from "react";
import {
    FaGithub,
    FaGithubSquare,
    FaLinkedin,
} from "react-icons/fa";
import "./About.css";

function About() {
    return (
        <div id="about-wrapper">
            <h1>About Artvark</h1>
            <div id="about-column-wrapper">
                <div id="developed-by">
                    Developed By:
                    <a
                        href="http://nickhosman.me"
                        target="_blacnk"
                        rel="noreferrer"
                    >
                        Nick Hosman
                    </a>
                    <div id="social-wrapper">
                        <a
                            href="https://github.com/nickhosman"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/nicholas-hosman-428558206/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
                <div id="project-code">
                    Project Repo:
                    <a
                        href="https://github.com/nickhosman/Artvark"
                        target="_blank"
                        id="project-repo"
                        rel="noreferrer"
                    >
                        <FaGithubSquare />
                        On Github
                    </a>
                </div>
            </div>
        </div>
    );
}

export default About;
