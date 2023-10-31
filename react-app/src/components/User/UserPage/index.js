import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import LeftNav from "../../Navigation/LeftNav";
import RightNav from "../../Navigation/RightNav";
import Post from "../../Posts/index";
import { clearPosts, fetchLoadUserPosts } from "../../../store/posts";
import { authenticate } from "../../../store/session";
import { loadTheme } from "../../../store/themes";
import "../../Home/Home.css";
import "./UserPage.css";

function UserPage() {
    const location = useLocation();
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const currTheme = useSelector((state) => state.theme);
    const currUser = useSelector((state) => state.session.user);
    const [isFollowed, setIsFollowed] = useState(false);
    const user = location.state.user;

    useEffect(() => {
        dispatch(fetchLoadUserPosts(user.id));
        // console.log(user);

        return () => {
            dispatch(clearPosts());
        };
    }, [dispatch, user]);

    useEffect(() => {
        dispatch(loadTheme(JSON.parse(localStorage.getItem("theme"))));
    }, [dispatch]);

    useEffect(() => {
        if (currUser.following.includes(user.username)) {
            setIsFollowed(true);
        }
    }, [currUser, user]);

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

    const handleFollowClick = async () => {
        await fetch(`/api/follow/${user.id}`, { method: "POST" });
        setIsFollowed(true);
        dispatch(authenticate());
    };

    const handleUnfollowClick = async () => {
        await fetch(`/api/follow/${user.id}`, { method: "DELETE" });
        setIsFollowed(false);
        dispatch(authenticate());
    };

    if (!user) return null;

    return (
        <div id="home-wrapper">
            <LeftNav />
            <div id="home-post-container">
                <div id="user-info">
                    <div id="user-wrapper">
                        <img src={user.profileImg} alt="" id="user-pic" />
                        <h2>@{user.username}</h2>
                    </div>
                    {currUser.username ===
                    user.username ? null : !isFollowed ? (
                        <div id="follow-user" onClick={handleFollowClick}>
                            Follow
                        </div>
                    ) : (
                        <div id="unfollow-user" onClick={handleUnfollowClick}>
                            Unfollow
                        </div>
                    )}
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

export default UserPage;
