import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegGrin } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import OpenModalElement from "../OpenModalElement";
import DeleteModal from "../DeleteModal";
import EditPostFormModal from "./EditPostFormModal";
import ReactionModal from "../Reaction/ReactionModal";
import "./Posts.css";
import { fetchLoadLikedPosts, fetchLoadPosts } from "../../store/posts";

function Post({ post, isLikesPage }) {
    const dispatch = useDispatch();
    const current_user = useSelector((state) => state.session.user);
    const postLikes = post.likes;
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (postLikes.includes(current_user?.id)) {
            setIsLiked(true);
        }
    }, [post, current_user, postLikes]);

    const sortById = (a, b) => {
        return a.id - b.id;
    };
    const postImages = Object.values(post.postImages).sort(sortById);

    const handleLikeClick = async (e) => {
        e.preventDefault();
        if (!current_user) {
            return;
        }
        if (isLiked) {
            await fetch(`/api/posts/${post.id}/likes`, { method: "DELETE" });
            setIsLiked(false);
        } else {
            await fetch(`/api/posts/${post.id}/likes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            setIsLiked(true);
        }
        if (isLikesPage) {
            await dispatch(fetchLoadLikedPosts());
        } else {
            await dispatch(fetchLoadPosts());
        }
    };

    return (
        <div className="post-wrapper">
            <div className="post-header">
                <div id="post-info">
                    <img
                        className="author-icon"
                        title={post.author.username}
                        alt=""
                        src={post.author.profileImg}
                    />
                    <span className="post-title">{post.title}</span>
                </div>
                {current_user && current_user?.id === post.author.id ? (
                    <div id="post-btn-wrapper">
                        <OpenModalElement
                            id="post-update"
                            text={<FaPencilAlt />}
                            modalComponent={<EditPostFormModal post={post} />}
                            title={"edit"}
                        />
                        <OpenModalElement
                            id="post-delete"
                            text={<FaTrashAlt />}
                            modalComponent={<DeleteModal post={post} />}
                            title={"delete"}
                        />
                    </div>
                ) : null}
            </div>
            <Carousel
                showArrows={false}
                useKeyboardArrows={true}
                showIndicators={false}
                showStatus={false}
                thumbsWidth={200}
            >
                {postImages.map((image) => (
                    <img
                        src={image.url}
                        alt=""
                        key={image.id}
                        className="carousel-image"
                    />
                ))}
            </Carousel>
            <div className="post-stats">
                <div id="post-stats-wrapper">
                    <div id="post-reactions-container">
                        <OpenModalElement
                            id="post-reactions"
                            text={<FaRegGrin id="post-react"/>}
                            modalComponent={<ReactionModal post={post} />}
                            title={"Reactions"}
                        />
                        <span>{post.numReactions}</span>
                    </div>
                    <div id="post-likes-container" onClick={handleLikeClick}>
                        {!isLiked ? (
                            <div id="post-likes">
                                <FaRegHeart id="post-like"/>
                            </div>
                        ) : (
                            <div id="post-likes">
                                <FaHeart id="post-like"/>
                            </div>
                        )}
                        <span>{post.likes.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
