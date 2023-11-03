import React, { useEffect, useRef, useState } from "react";
import Reaction from "../../Reaction";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
    clearReactions,
    fetchAddReaction,
    fetchLoadReactions,
} from "../../../store/reactions";
import { fetchLoadPosts } from "../../../store/posts";
import "./ReactionModal.css";

function ReactionModal({ post }) {
    const dispatch = useDispatch();
    const reactions = useSelector((state) => state.reactions);
    const user = useSelector((state) => state.session.user);
    const [emojis, setEmojis] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const inputField = useRef(null);
    const [numOfEmojis, setNumOfEmojis] = useState(null);
    const [errors, setErrors] = useState("");
    const [submitError, setSubmitError] = useState({});
    const postId = post.id;

    useEffect(() => {
        dispatch(fetchLoadReactions(postId));
        return () => {
            dispatch(clearReactions());
        };
    }, [dispatch, postId]);

    useEffect(() => {
        setNumOfEmojis(getEmojiInputLength(emojis));
    }, [emojis]);

    useEffect(() => {
        if (numOfEmojis > 4) {
            setErrors("You can post a maximum of 4 emojis.");
        } else {
            setErrors("");
        }
    }, [numOfEmojis]);

    if (!reactions) return null;

    const getEmojiInputLength = (str) => {
        return [...new Intl.Segmenter().segment(str)].length;
    };

    const sortByDate = (a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (errors.length === 0) {
            const data = {
                content: emojis,
            };

            const newReaction = await dispatch(fetchAddReaction(postId, data));
            if (newReaction.errors) {
                setSubmitError(newReaction.errors);
            } else {
                dispatch(fetchLoadPosts());
                setEmojis("");
                setShowPicker(false);
                setSubmitError({});
            }
        }
    };

    const handleInputClick = (e) => {
        setShowPicker(true);
    };

    const handleEmojiClick = (emoji) => {
        setEmojis((prevState) => (prevState += emoji.native));
    };

    const handlePickerClose = () => {
        setShowPicker(false);
        setEmojis("");
        setErrors("");
        setSubmitError({});
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
        <div id="reaction-wrapper">
            <div id="reaction-post-wrapper">
                <h2 id="reaction-post-title">{post.title}</h2>
            </div>
            {user ? (
                <div id="input-wrapper">
                    <form id="reaction-form" onSubmit={handleSubmit}>
                        <input
                            id="emoji-input"
                            type="text"
                            onClick={handleInputClick}
                            value={emojis}
                            onChange={(e) => setEmojis(e.target.value)}
                            ref={inputField}
                            onKeyDown={handleBackspace}
                            autoComplete="off"
                            onPaste={handlePasteAndDrop}
                            onDrop={handlePasteAndDrop}
                        />
                        <button
                            type="submit"
                            id="reaction-submit-btn"
                            disabled={!showPicker}
                        >
                            {<IoSend />}
                        </button>
                    </form>
                </div>
            ) : null}
            <div id="reaction-error-wrapper">
                {errors.length > 0 ? (
                    <p className="errors" id="reaction-error">
                        {errors}
                    </p>
                ) : null}
                {Object.keys(submitError).length > 0 ? (
                    <p className="errors" id="submit-reaction-error">
                        {submitError.content}
                    </p>
                ) : null}
            </div>
            <div id="picker-wrapper">
                {showPicker ? (
                    <div id="close-picker-main" onClick={handlePickerClose}>
                        Close
                    </div>
                ) : null}
                {showPicker ? (
                    <Picker
                        data={data}
                        onEmojiSelect={handleEmojiClick}
                        emojiButtonSize={40}
                        emojiSize={38}
                        perLine={15}
                        maxFrequentRows={0}
                    />
                ) : null}
            </div>
            {Object.values(reactions)
                .sort(sortByDate)
                .map((reaction, index) => (
                    <Reaction reaction={reaction} key={index} />
                ))}
        </div>
    );
}

export default ReactionModal;
