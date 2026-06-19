import { useState } from "react";
import placeholderPfp from "./assets/ach-placeholder-pfp.png";
import placeholderBanner from "./assets/cat-banner-placeholder.png";
import cogwheel from "./assets/Cogwheel.svg"
import { invoke } from "@tauri-apps/api/core";
import Login from "./Login";
import MiniUsrProfile from "./MiniUsrProfile";
import "./App.css";
import "./reset.css";

// =========================================
function App() {

  //Login handle hooks
  const [currentUser, setCurrentUser] = useState(null)

  // Mini profile hooks
  const [isMiniProfileOpen, setIsMiniProfileOpen] = useState(false);
  
  const toggleMiniProfile = () => {
    setIsMiniProfileOpen(!isMiniProfileOpen)
  }

  // Login and Logout
  const handleLogin = (userData) => {
    setCurrentUser(userData)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsMiniProfileOpen(false)
  }

  if (!currentUser) {
    return <Login onLoginSuccess={handleLogin} />
  }

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

      {/* Mini user profile and its children */}
      {isMiniProfileOpen && (
        <MiniUsrProfile pfpSrc={placeholderPfp} bannerSrc={placeholderBanner} username={currentUser.username} />
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
