import React from "react";
import { useDispatch } from "react-redux";
import "./ThemesModal.css";
import { loadTheme } from "../../store/themes";

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
        secondary: "hsl(0, 0%, 0%)",
        accent: "hsl(17, 19%, 70%)",
        buttonFont: "hsl(0, 0%, 100%)",
    },
    dark: {
        id: 3,
        name: "Dark Mode",
        background: "hsl(0, 0%, 0%)",
        primary: "hsl(255, 18%, 53%)",
        secondary: "hsl(0, 0%, 100%)",
        accent: "hsl(300, 7%, 50%)",
        buttonFont: "hsl(240, 12%, 22%);",
    },
};

function ThemesModal() {
    const dispatch = useDispatch();

    const handleThemeSelect = (theme) => () => {
        console.log("THEME", theme);
        localStorage.setItem("theme", JSON.stringify(theme));
        dispatch(loadTheme(theme));
    };

    return (
        <div id="themes-wrapper">
            {Object.values(themes).map((theme) => (
                <div className="theme" id={theme.name} key={theme.id}>
                    <p className="theme-name">{theme.name}</p>
                    <div
                        className="theme-preview"
                        style={{ backgroundColor: theme.background }}
                        onClick={handleThemeSelect(theme)}
                    >
                        <div className="left-theme-preview">
                            <div
                                className="theme-preview-logo"
                                style={{ background: theme.secondary }}
                            ></div>
                            <div
                                className="theme-preview-item"
                                style={{ background: theme.secondary }}
                            ></div>
                            <div
                                className="theme-preview-item"
                                style={{ background: theme.secondary }}
                            ></div>
                        </div>
                        <div
                            className="middle-theme-preview"
                            style={{
                                borderInline: `1px solid ${theme.secondary}`,
                            }}
                        >
                            <div
                                className="middle-img-container"
                                style={{
                                    borderBottom: `1px solid ${theme.secondary}`,
                                }}
                            >
                                <div
                                    className="middle-theme-img"
                                    style={{ background: theme.accent }}
                                ></div>
                            </div>
                            <div
                                className="middle-img-container"
                                style={{
                                    borderBottom: `1px solid ${theme.secondary}`,
                                }}
                            >
                                <div
                                    className="middle-theme-img"
                                    style={{ background: theme.accent }}
                                ></div>
                            </div>
                        </div>
                        <div className="right-theme-preview">
                            <div className="right-theme-preview-spacer"></div>
                            <div
                                className="right-theme-preview-item"
                                style={{ background: theme.secondary }}
                            ></div>
                            <div
                                className="theme-preview-create-post"
                                style={{ background: theme.primary }}
                            ></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ThemesModal;
