import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftNav from "../../Navigation/LeftNav";
import RightNav from "../../Navigation/RightNav";
import { loadTheme } from "../../../store/themes";
import "./Home.css";

function UserPage({ user }) {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const currTheme = useSelector((state) => state.theme);

    useEffect(() => {
        dispatch(fetchLoadUserPosts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadTheme(JSON.parse(localStorage.getItem("theme"))));
    }, [dispatch]);

    useEffect(() => {
        if (Object.keys(currTheme).length > 0) {
            // console.log("CURRTHEME", currTheme);
            document.documentElement.style.setProperty(
                "--background-color",
                currTheme.background
            );
            document.documentElement.style.setProperty(
                "--primary-color",
                currTheme.primary
            );
            document.documentElement.style.setProperty(
                "--secondary-color",
                currTheme.secondary
            );
            document.documentElement.style.setProperty(
                "--accent-color",
                currTheme.accent
            );
            document.documentElement.style.setProperty(
                "--button-font-color",
                currTheme.buttonFont
            );
        }
    }, [currTheme]);

    const sortByDate = (a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    };

    if (!posts) return null;

    return (
        <div id="home-wrapper">
            <LeftNav />
            <div id="home-post-container">
                <div id="user-info">
                    <div id="user-pic"></div>
                    <h2>Username</h2>
                </div>
                {Object.keys(posts).length > 0 ? (
                    Object.values(posts)
                        .sort(sortByDate)
                        .map((post) => <Post post={post} key={post.id} />)
                ) : (
                    <h3 id="nothing-here">There's nothing here yet...</h3>
                )}
            </div>
            <RightNav />
        </div>
    );
}
