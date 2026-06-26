import { useState } from "react";
import { supabase } from "./utils/supabase/supabaseClient";
import "./login.css";

export default function Login({onLoginSuccess}) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [signingUp, setSigningUp] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (signingUp === false) {

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                setError(error.message);
                return;
            }

            const { data: profile, error: profileError } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('user_id', data.user.id)
                .single();

            if (profileError) {
                setError(profileError.message)
                return
            }

            const { id: _profileId, ...profileRest } = profile;
            onLoginSuccess({ ...data.user, ...profileRest });
        }

        else {
            const { data, error } = await supabase.auth.signUp(
                {
                  email: email,
                  password: password,
                  options: { data: { username } }
                }
            );

            if (error) {
                setError(error.message);
                return;
            }
            
            alert("Confirm Email in your inbox")
            setSigningUp(false)
        }
    };

    const handleSignUp = () => {
        setSigningUp(true)
    }

    if (signingUp === true) {
        return (
            <div id="container">
                <div id="login-prompt">

                    <div id="branding">
                        <img src="./src/assets/bubbles-ico.png" id="app-icon" />
                        <span id="app-name">Bubbles</span>
                    </div>

                    <div id="input-div">
                        <p>Email</p>
                        <input type="text" id="email-input" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <p>Username</p>
                        <input type="text" id="username-input" value={username} onChange={(e) => setUsername(e.target.value)} />

                        <p>Password</p>
                        <input type="password" id="password-input" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div id="login-submit-div" style={{marginTop: "92%"}}>
                        <button type="button" id="login-submit" onClick={handleSubmit}>Sign up</button>
                    </div>

                </div>
            </div>
        )
    }

    return (
        <div id="container">
            <div id="login-prompt">

                <div id="branding">
                    <img src="./src/assets/bubbles-ico.png" id="app-icon" />
                    <span id="app-name">Bubbles</span>
                </div>

                <div id="input-div">
                    <p>Email</p>
                    <input type="text" id="email-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p>Password</p>
                    <input type="password" id="password-input" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div id="login-signup-div">
                    <div id="login-submit-div">
                        <button type="button" id="login-submit" onClick={handleSubmit}>Login</button>
                    </div>

                    <div id="signup-btn">
                        <span id="signup-text" onClick={handleSignUp}>Sign up?</span>
                    </div>
                </div>

            </div>
        </div>
    )
}