/* =========================================
   ASAMH ADMIN SYSTEM
========================================= */


/*
   IMPORTANT:

   This is only a LOCAL prototype.

   It is NOT real server security.

   For the real ASAMH website,
   the admin account must be protected
   by a backend.
*/


const ADMIN_USERNAME =
    "ASAMH_ADMIN";


const ADMIN_PASSWORD =
    "hiitsme";


/* =========================================
   USERS
========================================= */

function getUsers() {

    return JSON.parse(
        localStorage.getItem(
            "ASAMH_USERS"
        )
    ) || [];

}


function saveUsers(users) {

    localStorage.setItem(
        "ASAMH_USERS",
        JSON.stringify(users)
    );

}


/* =========================================
   ADMIN LOGIN
========================================= */

function checkAdmin() {

    const logged =
        sessionStorage.getItem(
            "ASAMH_ADMIN"
        );


    if (logged !== "true") {

        showAdminLogin();

        return false;

    }


    return true;

}


/* =========================================
   LOGIN SCREEN
========================================= */

function showAdminLogin() {

    document.body.innerHTML = `

        <main style="
            min-height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            background:#050812;
        ">

            <div class="modal-box"
                 style="
                    width:min(420px,95%);
                 ">

                <div style="
                    text-align:center;
                 ">

                    <div style="
                        font-size:65px;
                    ">
                        👑
                    </div>

                    <h1>
                        ASAMH Admin
                    </h1>

                    <p class="muted">
                        Administrator login
                    </p>

                </div>


                <input
                    id="adminUsername"
                    class="input"
                    placeholder="Admin username"
                >


                <input
                    id="adminPassword"
                    class="input"
                    type="password"
                    placeholder="Admin password"
                >


                <button
                    class="btn primary"
                    style="
                        width:100%;
                    "
                    onclick="adminLogin()"
                >
                    🔐 Enter Admin Panel
                </button>


                <p
                    id="adminError"
                    style="
                        color:#ff718d;
                        margin-top:12px;
                    "
                ></p>


                <br>


                <a
                    href="index.html"
                    class="view-all"
                >
                    ← Back to ASAMH
                </a>

            </div>

        </main>

    `;

}


/* =========================================
   ADMIN LOGIN FUNCTION
========================================= */

function adminLogin() {

    const username =
        document.getElementById(
            "adminUsername"
        ).value;


    const password =
        document.getElementById(
            "adminPassword"
        ).value;


    const error =
        document.getElementById(
            "adminError"
        );


    if (
        username ===
        ADMIN_USERNAME &&
        password ===
        ADMIN_PASSWORD
    ) {

        sessionStorage.setItem(
            "ASAMH_ADMIN",
            "true"
        );


        location.reload();

    } else {

        error.textContent =
            "Wrong admin login.";

    }

}


/* =========================================
   LOAD DASHBOARD
========================================= */

function loadDashboard() {

    const users =
        getUsers();


    document.getElementById(
        "userCount"
    ).textContent =
        users.length;


    document.getElementById(
        "gameCount"
    ).textContent =
        games.length;


    let favorites = 0;


    let premium = 0;


    users.forEach(
        user => {

            favorites +=
                user.favorites
                    ? user.favorites.length
                    : 0;


            if (
                user.membership !==
                "Free"
            ) {

                premium++;

            }

        }
    );


    document.getElementById(
        "favoriteCountAdmin"
    ).textContent =
        favorites;


    document.getElementById(
        "premiumCount"
    ).textContent =
        premium;


    renderUsers();

    renderGames();

}


/* =========================================
   USERS
========================================= */

function renderUsers() {

    const users =
        getUsers();


    const container =
        document.getElementById(
            "usersList"
        );


    if (!users.length) {

        container.innerHTML = `

            <p class="muted">
                No users yet.
            </p>

        `;

        return;

    }


    container.innerHTML =
        users
            .map(
                user => `

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    padding:12px 0;
                    border-bottom:
                    1px solid #293653;
                    gap:10px;
                ">

                    <div>

                        <b>
                            👤
                            ${escapeHTML(
                                user.username
                            )}
                        </b>

                        <div class="game-meta">

                            ⭐
                            ${user.membership}

                            ·

                            🪙
                            ${user.coins}

                        </div>

                    </div>


                    <button
                        class="mini-button"
                        onclick="
                            deleteUser(
                                '${encodeURIComponent(
                                    user.username
                                )}'
                            )
                        "
                    >

                        🗑

                    </button>

                </div>

            `
            )
            .join("");

}


/* =========================================
   ADD GAME
========================================= */

function addGame() {

    const name =
        document.getElementById(
            "newGameName"
        ).value.trim();


    const category =
        document.getElementById(
            "newGameCategory"
        ).value.trim();


    const icon =
        document.getElementById(
            "newGameIcon"
        ).value.trim();


    if (
        !name ||
        !category ||
        !icon
    ) {

        alert(
            "Fill in all game fields."
        );

        return;

    }


    const newGame = {

        id:
            "game-" +
            Date.now(),

        name: name,

        category: category,

        icon: icon,

        plays: 0,

        description:
            "A new ASAMH game."

    };


    const customGames =
        JSON.parse(
            localStorage.getItem(
                "ASAMH_CUSTOM_GAMES"
            )
        ) || [];


    customGames.push(
        newGame
    );


    localStorage.setItem(
        "ASAMH_CUSTOM_GAMES",
        JSON.stringify(
            customGames
        )
    );


    alert(
        "Game added!"
    );


    location.reload();

}


/* =========================================
   RENDER GAMES
========================================= */

function renderGames() {

    const container =
        document.getElementById(
            "adminGames"
        );


    container.innerHTML =
        games
            .map(
                game => `

                <div class="game-card">

                    <div class="game-image">
                        ${game.icon}
                    </div>

                    <div class="game-info">

                        <div class="game-title">
                            ${game.name}
                        </div>

                        <div class="game-meta">
                            ${game.category}
                            ·
                            ${game.plays}
                            plays
                        </div>

                    </div>

                </div>

            `
            )
            .join("");

}


/* =========================================
   DELETE USER
========================================= */

function deleteUser(encodedUsername) {

    const username =
        decodeURIComponent(
            encodedUsername
        );


    if (
        !confirm(
            "Delete " +
            username +
            "?"
        )
    ) {

        return;

    }


    let users =
        getUsers();


    users =
        users.filter(
            user =>
                user.username !==
                username
        );


    saveUsers(users);


    loadDashboard();

}


/* =========================================
   GIVE COINS
========================================= */

function giveCoinsToEveryone() {

    const users =
        getUsers();


    users.forEach(
        user => {

            user.coins =
                (user.coins || 0) +
                100;

        }
    );


    saveUsers(users);


    alert(
        "Everyone received 100 coins!"
    );


    loadDashboard();

}


/* =========================================
   RESET STATS
========================================= */

function resetStats() {

    if (
        !confirm(
            "Reset all game statistics?"
        )
    ) {

        return;

    }


    const users =
        getUsers();


    users.forEach(
        user => {

            user.played = [];

            user.bestScores = {};

        }
    );


    saveUsers(users);


    alert(
        "Statistics reset."
    );


    loadDashboard();

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


/* =========================================
   START
========================================= */

if (checkAdmin()) {

    loadDashboard();

}
