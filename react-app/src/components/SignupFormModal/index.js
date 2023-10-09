import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { FaPlus } from "react-icons/fa";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [profileImg, setProfileImg] = useState(null);
    const [profileThumb, setProfileThumb] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    useEffect(() => {
        let imageUrl;
        if (profileImg) {
            imageUrl = URL.createObjectURL(profileImg);
            setProfileThumb(imageUrl);
        }

        return () => {
            URL.revokeObjectURL(imageUrl);
        };
    }, [profileImg, errors]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
						const formData = new FormData();
						formData.append("username", username)
						formData.append("email", email)
						formData.append("password", password)
						formData.append("first_name", firstName)
						formData.append("last_name", lastName)
						formData.append("profile_img", profileImg)

            const data = await dispatch(signUp(formData));
            if (data) {
                console.log("errors", data);
                setErrors(data);
            } else {
                closeModal();
            }
        } else {
            setErrors({
                "confirmPassword": "Confirm Password field must be the same as the Password field"
        });
        }
    };

    return (
        <div id="sign-up-wrapper">
            <form onSubmit={handleSubmit} id="sign-up-form">
                <h1>Sign Up</h1>
                <div>
                    {Object.keys(errors).length > 0 ? "Fix any errors to continue" : null}
                </div>
                <p className="sign-up-label-text">Profile Image</p>
                <label className="sign-up-label">
                    {!profileImg ? (
                        <div id="sign-up-form-thumb">
                            <FaPlus />
                        </div>
                    ) : (
                        <div id="sign-up-form-thumb">
                            <img
                                alt=""
                                src={profileThumb}
                                id="sign-up-thumb"
                            ></img>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        id="sign-up-image-input"
                        onChange={(e) => setProfileImg(e.target.files[0])}
                    />
                    {Object.keys(errors).length > 0 ? <p className="errors">{errors.profile_img}</p> : null}
                </label>
                <p className="sign-up-label-text">First Name</p>
                <label className="sign-up-label">
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="sign-up-form-input"
                    />
                </label>
                <p className="sign-up-label-text">Last Name</p>
                <label className="sign-up-label">
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="sign-up-form-input"
                    />
                </label>
                <p className="sign-up-label-text">Email</p>
                <label className="sign-up-label">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="sign-up-form-input"
                    />
                </label>
                <p className="sign-up-label-text">Username</p>
                <label className="sign-up-label">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="sign-up-form-input"
                    />
                </label>
                <p className="sign-up-label-text">Password</p>
                <label className="sign-up-label">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="sign-up-form-input"
                    />
                </label>
                <p className="sign-up-label-text">Confirm Password</p>
                <label className="sign-up-label">
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="sign-up-form-input"
                    />
                </label>
                <button type="submit" id="sign-up-form-btn">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignupFormModal;
