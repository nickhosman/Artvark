import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import "./UserCard.css";
import { useModal } from "../../context/Modal";

function UserCard() {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const handleLogOut = (e) => {
      e.preventDefault();
      dispatch(logout())
      closeModal()
    }

    return (
        <div id="user-card-wrapper">
            <div id="user-card-header">
                <img src={user.profileImg} alt="" id="user-card-img" />
                <p id="user-card-username">{user.username}</p>
            </div>
            <div id="user-card-info">
                <div id="user-card-name">
                    <div id="user-card-first-wrapper">
                        <h3>First Name:</h3>
                        <p id="user-card-first-name">{user.firstName}</p>
                    </div>
                    <div id="user-card-last-wrapper">
                        <h3>Last Name:</h3>
                        <p id="user-card-last-name">{user.lastName}</p>
                    </div>
                </div>
                <div id="user-card-email">
                    <h3>Email:</h3>
                    <p id="user-card-email">{user.email}</p>
                </div>
            </div>
            <div id="user-card-logout" onClick={handleLogOut}>Log Out</div>
        </div>
    );
}

export default UserCard;
