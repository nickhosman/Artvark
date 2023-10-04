import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoadPosts } from "../../store/posts";
import Post from "../Posts";
import RightNav from "../Navigation/RightNav";
import "./Home.css"

function Home() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    // console.log("POSTS:", posts)

    useEffect(() => {
        dispatch(fetchLoadPosts());
    }, [dispatch]);

    if (!posts || Object.keys(posts).length === 0) return null;
    const postArr = Object.values(posts);

    return (
        <div id="home-wrapper">
            <div id="home-post-container">
                {postArr.reverse().map((post) => (
                    <Post post={post} key={post.id} />
                ))}
            </div>
            <RightNav />
        </div>
    );
}

export default Home;
