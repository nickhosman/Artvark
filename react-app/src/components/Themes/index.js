import React from "react";
import "./ThemesModal.css"

const themes = {
    morningCoffee: {
        id: 1,
        name: "Morning Coffee",
        background: "hsl(21, 52%, 82%)",
        primary: "hsl(14, 23%, 60%)",
        secondary: "hsl(13, 12%, 45%)",
        accent: "hsl(17, 19%, 70%)",
        buttonFont: "hsl(0, 0%, 100%)",
    },
    light: {
        id: 2,
        name: "Light Mode",
        background: "hsl(0, 0%, 100%)",
        primary: "hsl(14, 23%, 60%)",
        secondary: "hsl(12, 16%, 38%)",
        accent: "hsl(17, 19%, 70%)",
        buttonFont: "hsl(0, 0%, 100%)",
    },
};

function ThemesModal() {
    return (
        <div id="themes-wrapper">
            {Object.values(themes).map((theme) => (
                <div className="theme" id={theme.name} key={theme.id}>
                    <p className="theme-name">{theme.name}</p>
                    <div
                        className="theme-preview"
                        style={{backgroundColor: theme.background}}
                    >
                        <div
                            className="theme-preview-secondary"
                            style={{backgroundColor: theme.secondary}}
                        ></div>
                        <div
                            className="theme-preview-primary"
                            style={{backgroundColor: theme.primary}}
                        ></div>
                        <div
                            className="theme-preview-accent"
                            style={{backgroundColor: theme.preview}}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ThemesModal;
