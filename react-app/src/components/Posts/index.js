import React from "react";
import { FaRegGrin } from "react-icons/fa"
import './Posts.css'

function Post({ post }) {

    return (
        <div className="post-wrapper">
            <div className="post-header">
                <img className="author-icon" title={post.author.username} alt="" src={post.author.profileImg} />
                <span className="post-title">{post.title}</span>
            </div>
            <img className="post-image" alt="" src={post.previewImg}/>
            <div className="post-stats">
              <div id="post-stat-reacts">
                <FaRegGrin />
                <span>{post.numReactions}</span>
              </div>
            </div>
        </div>
    );
}

export default Post
