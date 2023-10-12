import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoadLikedPosts, fetchLoadPosts } from "../../store/posts";
import Post from "../Posts";
import RightNav from "../Navigation/RightNav";
import LeftNav from "../Navigation/LeftNav";
import { loadTheme } from "../../store/themes";
import "./Home.css";

function Home({ isLikesPage }) {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const currTheme = useSelector((state) => state.theme);

    // console.log("POSTS:", posts)

    useEffect(() => {
        // console.log(isLikesPage);
        if (isLikesPage) {
            dispatch(fetchLoadLikedPosts());
        } else {
            dispatch(fetchLoadPosts());
        }
    }, [dispatch, isLikesPage]);

    useEffect(() => {
        dispatch(loadTheme(JSON.parse(localStorage.getItem("theme"))));
    }, [dispatch]);

    useEffect(() => {
        console.log("CURR THEME", currTheme);
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
    }, [currTheme]);

    const sortByDate = (a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    };

    if (!posts) return null;

    return (
        <div id="home-wrapper">
            <LeftNav />
            <div id="home-post-container">
                <div id="home-header">
                    <h2>{isLikesPage ? "Likes" : "Home"}</h2>
                </div>
                {Object.keys(posts).length > 0 ? (
                    Object.values(posts)
                        .sort(sortByDate)
                        .map((post) => (
                            <Post
                                post={post}
                                key={post.id}
                                isLikesPage={isLikesPage}
                            />
                        ))
                ) : (
                    <h3 id="nothing-here">There's nothing here yet...</h3>
                )}
            </div>
            <RightNav />
        </div>
    );
}

export default Home;
