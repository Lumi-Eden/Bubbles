export default function MiniUsrProfile({pfpSrc, bannerSrc, username, logoutBtn}) {
    return (
        <div id="mini-usr-profile-div">

            {/* Banner */}
            <div id="mini-usr-profile-banner-div" style={{ backgroundImage: `url(${bannerSrc})` }} />

            <div id="logout" onClick={logoutBtn}>
                <img src="./src/assets/logout.png" id="logout-icon" />
            </div>

            <div id="expand-settings">
              <img src="./src/assets/Cogwheel.svg" id="cogwheel"/>
            </div>

            <div id="mini-usr-profile-content">
                <img src={pfpSrc} id="mini-usr-profile-icon"/>
                <span className="usrname" id="mini-usr-profile-usrname">{username}</span> <br />
                <span id="mini-usr-profile-pronouns">Pronouns</span>

                <div id="mini-usr-profile-bio-div">
                    <p>Bio</p>
                    <span id="mini-usr-profile-bio">
                        Example text: "lorem ipsum lorem ipsum
                        lorem ipsum lorem ipsum"
                    </span>
                </div>
            </div>
        </div>
    )
}