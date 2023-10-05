import React, { useEffect, useRef, useState } from "react";
import Reaction from "../../Reaction";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { IoSend } from "react-icons/io5";
import "./ReactionModal.css";

function ReactionModal({ postId }) {
    const [reactions, setReactions] = useState({});
    const [emojis, setEmojis] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const inputField = useRef(null);

    useEffect(() => {
      async function fetchReactions() {
        const response = await fetch(`/api/posts/${postId}/reactions`);

        if (response.ok) {
            const data = await response.json();
            setReactions(data);
            // console.log("REACTIONS:", Object.values(data));
        }
      }
      fetchReactions()
    }, [postId]);

    if (!reactions || Object.keys(reactions).length === 0) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    const handleInputClick = (e) => {
        setShowPicker(true);
    };

    const handleEmojiClick = (emoji) => {
        setEmojis((prevState) => (prevState += emoji.native));
    };

    const handleBackspace = (e) => {
        if (e.key === "Backspace" || e.key === "Delete") {
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
            {Object.values(reactions).map((reaction, index) => (
                <Reaction reaction={reaction} key={index} />
            ))}
        </div>
    );
}

export default ReactionModal;
