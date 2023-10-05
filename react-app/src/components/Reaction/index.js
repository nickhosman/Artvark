import React from "react";
import "./Reaction.css"

function Reaction({reaction}) {
  return (
    <div className="reaction-container">
      <img id="reaction-user-img" alt="" src={reaction.author.profileImg} title={reaction.author.username}/>
      <span id="reaction-content">{reaction.content}</span>
    </div>
  )
}

export default Reaction
