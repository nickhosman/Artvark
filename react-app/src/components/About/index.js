import React from "react";
import { FaGithub, FaReact, FaPython, FaJsSquare, FaGithubSquare } from "react-icons/fa";
import "./About.css";

function About() {

    return (
        <div id="about-wrapper">
            <h1>About Artvark</h1>
            <div id="about-column-wrapper">
                <div id="developed-by">
                    Developed By:
                    <a href="https://github.com/nickhosman" target="_blank">
                        <FaGithub />
                        Nick Hosman
                    </a>
                </div>
                <div id="using">
                    Stack:
                    <div>
                        <FaReact title="React"/>
                        <FaPython title="Python"/>
                        <FaJsSquare title="JavaScript"/>
                    </div>
                </div>
                <div id="project-code">
                  Project Repo:
                  <a href="https://github.com/nickhosman/Artvark" target="_blank" id="project-repo">
                    <FaGithubSquare />
                    Artvark
                  </a>
                </div>
            </div>
        </div>
    );
}

export default About;
