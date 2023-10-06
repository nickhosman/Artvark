import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import "./Reaction.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoadReactions } from "../../store/reactions";
import { fetchLoadPosts } from "../../store/posts";


function Reaction({ reaction }) {
    const dispatch = useDispatch()
    const current_user = useSelector((state) => state.session.user);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [editingEnabled, setEditingEnabled] = useState(false);

    const handleTrashClick = () => {
      setShowDeleteConfirm(!showDeleteConfirm);
    }

    const handleCancelDelete = () => {
      setShowDeleteConfirm(false);
    }

    const handleConfirmDelete = async () => {
      const response = await fetch(`/api/reactions/${reaction.id}`, { method: "DELETE"});

      if (response.ok) {
        const message = await response.json();
        dispatch(fetchLoadReactions(reaction.postId));
        dispatch(fetchLoadPosts())
        setShowDeleteConfirm(false);
        return message;
      } else {
        const errors = await response.json()
        return errors;
      }
    }

    return (
        <div className="reaction-container">
            {reaction.author.id == current_user.id ? (
                <div id="reaction-button-wrapper">
                    <div id="reaction-edit-btn" title="edit">
                        <FaPencilAlt />
                    </div>
                    <div id="reaction-delete-btn" title="delete" onClick={handleTrashClick}>
                        <FaTrashAlt />
                    </div>
                    {showDeleteConfirm ? (
                      <div id="reaction-delete-confirm">
                        <p>Confirm Delete?</p>
                        <div id="confirm-delete-wrapper">
                          <div id="confirm-delete" className="reaction-delete-option" onClick={handleConfirmDelete}>Yes</div>
                          <div id="cancel-delete" className="reaction-delete-option" onClick={handleCancelDelete}>No</div>
                        </div>
                      </div>) : null}
                </div>
            ) : null}
            <img
                id="reaction-user-img"
                alt=""
                src={reaction.author.profileImg}
                title={reaction.author.username}
            />
            <span id="reaction-content">{reaction.content}</span>
        </div>
    );
}

export default Reaction;
