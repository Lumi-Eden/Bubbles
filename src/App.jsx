import { useEffect, useState, } from "react";
import { supabase } from "./utils/supabase/supabaseClient.js";
// IMGS
import placeholderPfp from "./assets/ach-placeholder-pfp.png";
import placeholderBanner from "./assets/cat-banner-placeholder.png";
import cogwheel from "./assets/Cogwheel.svg";
import userAddIcon from "./assets/user-add.svg"
// DATA
import { invoke } from "@tauri-apps/api/core";
import Login from "./Login";
import MiniUsrProfile from "./MiniUsrProfile";
import { restoreUsrSession } from "./utils/authStorage.js";
import MessageChain from "./MessageChain.jsx";
import MessageInput from "./MessageInput.jsx";
import ConversationList from "./ConversationList.jsx";
import UserSearch from "./UserSearch.jsx";
// STYLES
import "./App.css";
import "./message-chain.css";
import "./conversation-list.css";
import "./user-search.css"
import "./reset.css";

// =========================================
function App() {

  //Login handle hooks
  const [currentUser, setCurrentUser] = useState(null);

  // isOpen hooks
  const [isMiniProfileOpen, setIsMiniProfileOpen] = useState(false);
  const [isUserSearchOpen, setIsUserSearchOpen] = useState(false);
  
  // Active hooks
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [activeConversationName, setActiveConversationName] = useState("")

  const handleSelectConversation = (id, name) => {
    setActiveConversationId(id);
    setActiveConversationName(name);
  };

  
  const toggleMiniProfile = () => {
    setIsMiniProfileOpen(!isMiniProfileOpen);
  }

  const toggleUserSearch = () => {
    setIsUserSearchOpen(!isUserSearchOpen)
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

      <div id="search-grouping-div">
        <div id="user-search-div" onClick={toggleUserSearch}>
          <img src={userAddIcon} id="user-search-icon" />
        </div>
        { isUserSearchOpen && <UserSearch currentUser={currentUser} onSelectConversation={handleSelectConversation} /> }
      </div>

      <div id="divider" />

      <ConversationList currentUser={currentUser} onSelectConversation={handleSelectConversation} />

      <div id="curr-usr-icon-div">
        <CurrUsrIcon onClick={toggleMiniProfile} pfpSrc={currentUser.icon_url} />
      </div>

      {/* Mini user profile and its children */}
      {isMiniProfileOpen && (
        <MiniUsrProfile pfpSrc={currentUser.icon_url} bannerSrc={placeholderBanner} username={currentUser.username} logoutBtn={handleLogout} />
      )}

      <div id="chat-div-outline">
        
          {/* Chat title to be updated */}
          <h2 id="chat-title-top">{activeConversationName}</h2>
        <div id="chat-div">
          {/* Chat content goes here */}
          <div id="scrollbar-customization-div">
            <MessageChain activeConversationId={activeConversationId} />
            <MessageInput currentUser={currentUser} activeConversationId={activeConversationId} />
          </div>
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
