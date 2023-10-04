import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { fetchDeletePost } from '../../store/posts';

function DeleteModal(post) {
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const handleConfirmDelete = async (e) => {
    e.preventDefault();
    console.log("POST ID:", post.id);
    await dispatch(fetchDeletePost(post.id));
    closeModal();
  };

  const handleCancel = (e) => {
    closeModal()
  }

  return (
    <div id='delete-modal-wrapper'>
      <h1>Delete Post?</h1>
      <div id='delete-btn-wrapper'>
        <button onClick={handleConfirmDelete}>Yes</button>
        <button onClick={handleCancel}>No</button>
      </div>
    </div>
  )
}

export default DeleteModal
