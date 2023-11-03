import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchDeletePost } from "../../store/posts";
import "./DeleteModal.css";

function DeleteModal({ post }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleConfirmDelete = async (e) => {
        e.preventDefault();
        await dispatch(fetchDeletePost(post.id));
        closeModal();
    };

    const handleCancel = (e) => {
        closeModal();
    };

    return (
        <div id="delete-modal-wrapper">
            <h1>Delete Post?</h1>
            <div id="delete-btn-wrapper">
                <button onClick={handleConfirmDelete} id="confirm-delete">
                    Yes
                </button>
                <button onClick={handleCancel} id="cancel-delete">
                    No
                </button>
            </div>
        </div>
    );
}

export default DeleteModal;
