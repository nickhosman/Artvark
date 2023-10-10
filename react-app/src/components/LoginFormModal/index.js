import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginFormModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        } else {
            closeModal();
            history.push("/posts");
        }
    };

    const handleDemo = async (e) => {
        e.preventDefault();
        await dispatch(login("demo@aa.io", "password"));
        closeModal();
        history.push("/posts");
    };

    return (
        <>
            <form onSubmit={handleSubmit} id="log-in-form">
                <h1>Log In</h1>
                <p className="log-in-label-text">Email</p>
                <label className="log-in-label">
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="log-in-input"
                    />
                    {Object.keys(errors).length > 0 ? <p className="errors" id="log-in-email-error">{errors.email}</p> : null}
                </label>
                <p className="log-in-label-text">Password</p>
                <label className="log-in-label">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="log-in-input"
                    />
                    {Object.keys(errors).length > 0 ? <p className="errors" id="log-in-password-error">{errors.password}</p> : null}
                </label>
                <button type="submit" id="log-in-form-btn">
                    Log In
                </button>
                <button type="submit" id="log-in-demo" onClick={handleDemo}>
                    Demo User
                </button>
            </form>
        </>
    );
}

export default LoginFormModal;
