import React from "react";
import { useSelector } from "react-redux";
import { FaRegGrin } from "react-icons/fa";
import OpenModalElement from "../OpenModalElement";
import "./Posts.css";
import DeleteModal from "../DeleteModal";
import EditPostFormModal from "./EditPostFormModal";

function Post({ post }) {
    const current_user = useSelector((state) => state.session.user);

    const handleEditClick = async (e) => {

    }

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
                        <OpenModalElement id="post-update" text="edit" modalComponent={EditPostFormModal(post)}/>
                        <OpenModalElement id="post-delete" text="delete" modalComponent={DeleteModal(post)}/>
                    </div>
                ) : null}
            </div>
            <img className="post-image" alt="" src={post.previewImg} />
            <div className="post-stats">
                <div id="post-stat-reacts">
                    <FaRegGrin />
                    <span>{post.numReactions}</span>
                </div>
            </div>
        </div>
    );
}

export default Post;
