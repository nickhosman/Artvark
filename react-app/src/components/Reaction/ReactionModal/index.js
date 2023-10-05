import React, { useEffect, useState } from "react";
import Reaction from "../../Reaction";
import "./ReactionModal.css"

function ReactionModal({ postId }) {
    const [reactions, setReactions] = useState({});

    useEffect(async () => {
        const response = await fetch(`/api/posts/${postId}/reactions`);

        if (response.ok) {
            const data = await response.json();
            setReactions(data);
            console.log("REACTIONS:", Object.values(data));
        }
    }, [postId]);

    if (!reactions || Object.keys(reactions).length === 0) return null;

    return (
        <div id="reaction-wrapper">
            {Object.values(reactions).map((reaction, index) => (
                <Reaction reaction={reaction} key={index} />
            ))}
        </div>
    );
}

export default ReactionModal;
