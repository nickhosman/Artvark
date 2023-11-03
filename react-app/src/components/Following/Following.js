import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftNav from "../Navigation/LeftNav";
import RightNav from "../Navigation/RightNav";
import Post from "../Posts";
import { clearPosts, fetchLoadFollowedPosts } from "../../store/posts";
import { loadTheme } from "../../store/themes";
import "../Home/Home.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Following() {
    const dispatch = useDispatch();
    const history = useHistory();
    const posts = useSelector((state) => state.posts);
    const currTheme = useSelector((state) => state.theme);
    const currUser = useSelector((state) => state.session.user);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await dispatch(fetchLoadFollowedPosts());
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        return () => {
            dispatch(clearPosts());
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadTheme(JSON.parse(localStorage.getItem("theme"))));
    }, [dispatch]);

    useEffect(() => {
        if (Object.keys(currTheme).length > 0) {
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

    if (!currUser) history.push("/posts");

    return (
        <div id="home-wrapper">
            <LeftNav />
            <div id="home-post-container">
                <div id="home-header">
                    <h2>Following</h2>
                </div>
                {loading ? (
                    <div class="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                ) : Object.keys(posts).length > 0 ? (
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

export default Following;
