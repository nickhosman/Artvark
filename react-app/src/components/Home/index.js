import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoadLikedPosts, fetchLoadPosts } from "../../store/posts";
import Post from "../Posts";
import RightNav from "../Navigation/RightNav";
import LeftNav from "../Navigation/LeftNav";
import "./Home.css";

function Home({ isLikesPage }) {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);

    // console.log("POSTS:", posts)

    useEffect(() => {
        console.log(isLikesPage);
        if (isLikesPage) {
            dispatch(fetchLoadLikedPosts());
        } else {
            dispatch(fetchLoadPosts());
        }
    }, [dispatch, isLikesPage]);

    const sortByDate = (a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    };

    if (!posts) return null;

    return (
        <div id="home-wrapper">
            <LeftNav />
            <div id="home-post-container">
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
                    <p>There's nothing here yet...</p>
                )}
            </div>
            <RightNav />
        </div>
    );
}

export default Home;
