import React, { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoadReactions } from "../../store/reactions";
import { fetchLoadPosts } from "../../store/posts";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "./Reaction.css";

function Reaction({ reaction }) {
    const dispatch = useDispatch();
    const current_user = useSelector((state) => state.session.user);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [reactionContent, setReactionContent] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [editedNumOfEmojis, setEditedNumOfEmojis] = useState(null);
    const [editErrors, setEditErrors] = useState("");
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        setEditedNumOfEmojis(getEmojiInputLength(reactionContent));
    }, [reactionContent]);

    useEffect(() => {
        if (editedNumOfEmojis > 4) {
            setEditErrors("You can post a maximum of 4 emojis.");
        } else {
            setEditErrors("");
        }
    }, [editedNumOfEmojis]);

    const getEmojiInputLength = (str) => {
        return [...new Intl.Segmenter().segment(str)].length;
    };

    const handleTrashClick = () => {
        setShowDeleteConfirm(!showDeleteConfirm);
    };

    const handlePencilClick = () => {
        setShowPicker(!showPicker);
        setReactionContent(reaction.content);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
    };

    const handleConfirmDelete = async () => {
        const response = await fetch(`/api/reactions/${reaction.id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            const message = await response.json();
            dispatch(fetchLoadReactions(reaction.postId));
            dispatch(fetchLoadPosts());
            setShowDeleteConfirm(false);
            return message;
        } else {
            const errors = await response.json();
            return errors;
        }
    };

    const handleConfirmEdit = async () => {
        if (editErrors.length === 0) {
            const data = {
                content: reactionContent,
            };

            const response = await fetch(`/api/reactions/${reaction.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const editedReaction = await response.json();
                dispatch(fetchLoadReactions(reaction.postId));
                setShowPicker(false);
                setFormErrors({});
                return editedReaction;
            } else {
                const errors = await response.json();
                // console.log(errors);
                setFormErrors(errors.errors);
                return errors;
            }
        }
    };

    const handlePickerClose = () => {
        setShowPicker(false);
        setReactionContent("");
        setEditErrors("");
        setFormErrors({});
    };

    const handleEmojiClick = (emoji) => {
        setReactionContent((prevState) => (prevState += emoji.native));
    };

    const handleBackspace = (e) => {
        if (
            e.key === "Backspace" ||
            e.key === "Delete" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight"
        ) {
            return true;
        }
        e.preventDefault();
    };

    const handlePasteAndDrop = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <div className="reaction-container">
                {reaction.author.id === current_user?.id && !showPicker ? (
                    <div id="reaction-button-wrapper">
                        <div
                            id="reaction-edit-btn"
                            title="edit"
                            onClick={handlePencilClick}
                        >
                            <FaPencilAlt />
                        </div>
                        <div
                            id="reaction-delete-btn"
                            title="delete"
                            onClick={handleTrashClick}
                        >
                            <FaTrashAlt />
                        </div>
                        {showDeleteConfirm ? (
                            <div id="reaction-delete-confirm">
                                <p>Confirm Delete?</p>
                                <div id="confirm-delete-wrapper">
                                    <div
                                        id="confirm-delete"
                                        className="reaction-delete-option"
                                        onClick={handleConfirmDelete}
                                    >
                                        Yes
                                    </div>
                                    <div
                                        id="cancel-delete"
                                        className="reaction-delete-option"
                                        onClick={handleCancelDelete}
                                    >
                                        No
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : null}
                <img
                    id="reaction-user-img"
                    alt=""
                    src={reaction.author.profileImg}
                    title={reaction.author.username}
                />
                {showPicker ? (
                    <input
                        type="text"
                        className="reaction-content"
                        id="reaction-content-input"
                        value={reactionContent}
                        onChange={(e) => setReactionContent(e.target.value)}
                        onKeyDown={handleBackspace}
                        autoComplete="off"
                        onPaste={handlePasteAndDrop}
                        onDrop={handlePasteAndDrop}
                        autoFocus
                    />
                ) : (
                    <span className="reaction-content">{reaction.content}</span>
                )}
            </div>
            {editErrors.length > 0 ? (
                <p className="errors">{editErrors}</p>
            ) : null}
            {Object.keys(formErrors).length > 0 ? <p className="errors">{formErrors.content}</p> : null}
            <div id="picker-wrapper">
                {showPicker ? (
                    <div id="picker-buttons">
                        <div id="confirm-edit" onClick={handleConfirmEdit}>
                            Confirm
                        </div>
                        <div id="close-picker" onClick={handlePickerClose}>
                            Close
                        </div>
                    </div>
                ) : null}
                {showPicker ? (
                    <Picker
                        data={data}
                        emojiButtonSize={40}
                        emojiSize={38}
                        perLine={15}
                        maxFrequentRows={0}
                        onEmojiSelect={handleEmojiClick}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default Reaction;
