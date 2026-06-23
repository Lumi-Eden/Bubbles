import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase/supabaseClient.js";
// IMGS
import placeholderPfp from "./assets/ach-placeholder-pfp.png";
import placeholderBanner from "./assets/cat-banner-placeholder.png";
import cogwheel from "./assets/Cogwheel.svg";
// DATA
import { invoke } from "@tauri-apps/api/core";
import Login from "./Login";
import MiniUsrProfile from "./MiniUsrProfile";
import { restoreUsrSession } from "./utils/authStorage.js";
// STYLES
import "./App.css";
import "./reset.css";

// =========================================
function App() {

  //Login handle hooks
  const [currentUser, setCurrentUser] = useState(null);

  // Mini profile hooks
  const [isMiniProfileOpen, setIsMiniProfileOpen] = useState(false);
  
  const toggleMiniProfile = () => {
    setIsMiniProfileOpen(!isMiniProfileOpen);
  }

  // Login and Logout
  const handleLogin = (userData) => {
    setCurrentUser(userData);
  }

  const handleLogout = async () => {
    setCurrentUser(null);
    setIsMiniProfileOpen(false);

    // OAuth
    const { data, error } = await supabase.auth.signOut({ scope: 'local' });
  }

  // Check to restore session, only then handle login screen
  // ------- 
  useEffect(() => {restoreUsrSession(setCurrentUser)}, []) // <- empty array = run on first boot

  if (!currentUser) {
    return <Login onLoginSuccess={handleLogin} />
  }
  // -------

  // App UI
  return (
    <main className="container">

      <div id="app-logo-title">
        <img src="./src/assets/bubbles-ico.png" id="app-logo-mini" />
        <h1 id="app-title">Bubbles</h1>
      </div>

      <div id="curr-usr-icon-div">
        <CurrUsrIcon onClick={toggleMiniProfile} pfpSrc={placeholderPfp} />
      </div>

      {/* Mini user profile and its children - change username later */}
      {isMiniProfileOpen && (
        <MiniUsrProfile pfpSrc={placeholderPfp} bannerSrc={placeholderBanner} username={currentUser.email} logoutBtn={handleLogout} />
      )}

      <div id="chat-div-outline">
          <h2 id="chat-title-top">Home</h2>
        <div id="chat-div">
          {/* Chat content goes here */}
        </div>
      </div>

    </main>
  );
}
// ==========================================

// Current user icon on main page
function CurrUsrIcon({onClick, pfpSrc}) {
    return (
        <img src={pfpSrc} id="curr-usr-icon" className="usr-icon" onClick={onClick} />
    )
}

export default App;
