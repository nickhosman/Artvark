import React from "react";
import { useSelector } from "react-redux";
import { FaRegGrin } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import OpenModalElement from "../OpenModalElement";
import DeleteModal from "../DeleteModal";
import EditPostFormModal from "./EditPostFormModal";
import ReactionModal from "../Reaction/ReactionModal";
import "./Posts.css";

function Post({ post }) {
    const current_user = useSelector((state) => state.session.user);

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
            <img className="post-image" alt="" src={post.previewImg} />
            <div className="post-stats">
                <div id="post-stat-reacts">
                    <OpenModalElement
                        id="post-reactions"
                        text={<FaRegGrin />}
                        modalComponent={<ReactionModal postId={post.id} />}
                        title={"Reactions"}
                    />
                    <span>{post.numReactions}</span>
                </div>
            </div>
        </div>
    );
}

export default Post;
