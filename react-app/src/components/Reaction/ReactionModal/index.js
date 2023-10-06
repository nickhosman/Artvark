import React, { useEffect, useRef, useState } from "react";
import Reaction from "../../Reaction";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { IoSend } from "react-icons/io5";
import "./ReactionModal.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddReaction, fetchLoadReactions } from "../../../store/reactions";

function ReactionModal({ postId }) {
    const dispatch = useDispatch()
    const reactions = useSelector(state => state.reactions)
    const [emojis, setEmojis] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const inputField = useRef(null);


    useEffect(() => {
        dispatch(fetchLoadReactions(postId))
    }, [dispatch, postId]);

    if (!reactions) return null;

    const sortByDate = (a, b) => {
        return  new Date (b.createdAt) - new Date(a.createdAt);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            content: emojis,
        }

        const newReaction = await dispatch(fetchAddReaction(postId, data))
        if (newReaction.errors) {
            console.log(newReaction.errors);
        }
        setEmojis("")
    };

    const handleInputClick = (e) => {
        setShowPicker(true);
    };

    const handleEmojiClick = (emoji) => {
        setEmojis((prevState) => (prevState += emoji.native));
    };

    const handleBackspace = (e) => {
        if (e.key === "Backspace" || e.key === "Delete" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
            return true
        }
        e.preventDefault();
    };

    const handlePasteAndDrop = (e) => {
      e.preventDefault()
    }

    return (
        <div id="reaction-wrapper">
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
                    <button type="submit" id="reaction-submit-btn">
                        {<IoSend />}
                    </button>
                </form>
            </div>
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
            {Object.values(reactions).sort(sortByDate).map((reaction, index) => (
                <Reaction reaction={reaction} key={index} />
            ))}
        </div>
    );
}

export default ReactionModal;
