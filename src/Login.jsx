import { useState } from "react";
import "./login.css";

export default function Login({onLoginSuccess}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulated successful login
        if (username.trim()!="" && password.trim()!="") {
            onLoginSuccess({
                username: username,
                icon: "./assets/ach-placeholder-pfp.png" // PLACEHOLDER!!!
            });

        } else {
            alert("Please enter a both a username and password.");
        }
    };

    return (
        <div id="container">
            <div id="login-prompt">

                <div id="branding">
                    <img src="./src/assets/bubbles-ico.png" id="app-icon" />
                    <span id="app-name">Bubbles</span>
                </div>

                <div id="input-div">
                    <p>Username</p>
                    <input type="text" id="username-input" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <p>Password</p>
                    <input type="password" id="password-input" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div id="login-submit-div">
                    <button type="button" id="login-submit" onClick={handleSubmit}>Login</button>
                </div>

            </div>
        </div>
    )
}