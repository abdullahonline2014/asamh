/* =====================================================
   ASAMH GAME DATABASE
===================================================== */

const games = [

    {
        id: "speed",
        name: "Speed Rush",
        category: "Racing",
        icon: "🏎️",
        plays: 128400,
        description:
            "Drive fast, avoid traffic and beat your high score."
    },

    {
        id: "color",
        name: "Color Rush",
        category: "Arcade",
        icon: "🎨",
        plays: 93200,
        description:
            "Click the correct color as quickly as possible."
    },

    {
        id: "space",
        name: "Space Blaster",
        category: "Action",
        icon: "🚀",
        plays: 76100,
        description:
            "Destroy asteroids and survive as long as possible."
    },

    {
        id: "goal",
        name: "Goal Master",
        category: "Sports",
        icon: "⚽",
        plays: 68400,
        description:
            "Score as many goals as you can."
    },

    {
        id: "puzzle",
        name: "Brain Blocks",
        category: "Puzzle",
        icon: "🧩",
        plays: 52200,
        description:
            "Match blocks and beat your best score."
    },

    {
        id: "island",
        name: "Island Quest",
        category: "Adventure",
        icon: "🏝️",
        plays: 49300,
        description:
            "Explore the island and discover hidden secrets."
    },

    {
        id: "neon",
        name: "Neon Arena",
        category: "Arcade",
        icon: "🟣",
        plays: 42100,
        description:
            "Survive the neon arena."
    },

    {
        id: "battle",
        name: "Battle Arena",
        category: "Strategy",
        icon: "⚔️",
        plays: 39800,
        description:
            "Use strategy and defeat your opponents."
    },

    {
        id: "jump",
        name: "Sky Jumper",
        category: "Arcade",
        icon: "🪂",
        plays: 33700,
        description:
            "Jump higher and collect coins."
    },

    {
        id: "drift",
        name: "Neon Drift",
        category: "Racing",
        icon: "🏁",
        plays: 29100,
        description:
            "Drift through neon streets."
    }

];


/* =====================================================
   ASAMH PLAYER DATA
===================================================== */

let data =
    JSON.parse(
        localStorage.getItem("ASAMH_DATA")
    ) ||
    {

        username: null,

        favorites: [],

        coins: 250,

        membership: "Free",

        played: [],

        bestScores: {}

    };


/* =====================================================
   HELPERS
===================================================== */

function saveData() {

    localStorage.setItem(
        "ASAMH_DATA",
        JSON.stringify(data)
    );

}


function getGame(id) {

    return games.find(
        game => game.id === id
    );

}


function formatPlays(number) {

    if (number >= 1000) {

        return (
            number / 1000
        ).toFixed(1) + "K";

    }

    return number;

}


function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer =
        setTimeout(
            () => {
                toast.classList.remove("show");
            },
            1800
        );

}


/* =====================================================
   MODALS
===================================================== */

function openModal(content) {

    document.getElementById(
        "modalContent"
    ).innerHTML = content;

    document.getElementById(
        "modal"
    ).classList.add("show");

}


function closeModal() {

    document.getElementById(
        "modal"
    ).classList.remove("show");

}


/* =====================================================
   GAME CARD
===================================================== */

function createGameCard(game) {

    const favorite =
        data.favorites.includes(
            game.id
        );

    return `

        <div class="game-card">

            <div class="game-image">

                ${game.icon}

            </div>

            <div class="game-info">

                <div class="game-title">

                    ${game.name}

                </div>

                <div class="game-meta">

                    ${formatPlays(game.plays)}
                    plays ·
                    ${game.category}

                </div>

                <div class="game-actions">

                    <button
                        class="mini-button"
                        onclick="playGame('${game.id}')"
                    >

                        ▶ Play

                    </button>

                    <button
                        class="mini-button
                        ${favorite
                            ? "favorite-active"
                            : ""
                        }"
                        onclick="toggleFavorite('${game.id}')"
                    >

                        ${favorite
                            ? "♥"
                            : "♡"
                        }

                    </button>

                </div>

            </div>

        </div>

    `;

}


/* =====================================================
   GAME GRID
===================================================== */

function createGrid(list) {

    if (!list.length) {

        return `

            <div class="empty">

                No games found.

            </div>

        `;

    }

    return `

        <div class="game-grid">

            ${list
                .map(createGameCard)
                .join("")}

        </div>

    `;

}


/* =====================================================
   HOME PAGE
===================================================== */

function homePage() {

    return `

        <section class="hero">

            <div class="hero-content">

                <div class="hero-small">

                    WELCOME TO ASAMH

                </div>

                <h1>

                    PLAY.
                    <span class="gradient-text">
                        COMPETE.
                    </span>

                    <br>

                    DISCOVER.

                </h1>

                <p>

                    Welcome to ASAMH — a modern
                    game platform made for phones,
                    tablets and computers.

                </p>

                <button
                    class="btn primary"
                    onclick="playGame('speed')"
                >

                    ▶ Play Speed Rush

                </button>

                <button
                    class="btn"
                    onclick="showPage('games')"
                >

                    Explore Games

                </button>

            </div>

        </section>


        ${createSection(
            "🔥 Trending Games",
            games
                .slice()
                .sort(
                    (a, b) =>
                        b.plays - a.plays
                )
                .slice(0, 6)
        )}


        ${createSection(
            "🏎 Racing",
            games.filter(
                game =>
                    game.category ===
                    "Racing"
            )
        )}


        ${createSection(
            "⚡ Quick Games",
            games.filter(
                game =>
                    game.category ===
                        "Arcade" ||
                    game.category ===
                        "Puzzle"
            )
        )}

    `;

}


/* =====================================================
   SECTION
===================================================== */

function createSection(title, list) {

    return `

        <section class="section">

            <div class="section-header">

                <h2>

                    ${title}

                </h2>

                <button
                    class="view-all"
                    onclick="showPage('games')"
                >

                    View all

                </button>

            </div>

            ${createGrid(list)}

        </section>

    `;

}


/* =====================================================
   PAGES
===================================================== */

function showPage(page) {

    const app =
        document.getElementById(
            "app"
        );


    if (page === "home") {

        app.innerHTML =
            homePage();

        closeMobileMenu();

        return;

    }


    let list =
        games;


    if (page === "favorites") {

        list =
            games.filter(
                game =>
                    data.favorites
                        .includes(
                            game.id
                        )
            );

    }


    if (page === "trending") {

        list =
            games
                .slice()
                .sort(
                    (a, b) =>
                        b.plays -
                        a.plays
                );

    }


    if (page === "played") {

        list =
            games.filter(
                game =>
                    data.played
                        .includes(
                            game.id
                        )
            );

    }


    let title =
        page
            .charAt(0)
            .toUpperCase() +
        page.slice(1);


    app.innerHTML = `

        <h1 class="page-title">

            ${title}

        </h1>

        <p class="muted">

            Choose a game and start playing.

        </p>

        ${createGrid(list)}

    `;


    closeMobileMenu();

}


/* =====================================================
   CATEGORY
===================================================== */

function showCategory(category) {

    const list =
        games.filter(
            game =>
                game.category ===
                category
        );


    document.getElementById(
        "app"
    ).innerHTML = `

        <h1 class="page-title">

            ${category}

        </h1>

        <p class="muted">

            Games in this category.

        </p>

        ${createGrid(list)}

    `;


    closeMobileMenu();

}


/* =====================================================
   FAVORITES
===================================================== */

function toggleFavorite(id) {

    if (
        data.favorites
            .includes(id)
    ) {

        data.favorites =
            data.favorites.filter(
                gameId =>
                    gameId !== id
            );

        showToast(
            "Removed from favorites"
        );

    } else {

        data.favorites.push(id);

        showToast(
            "Added to favorites ❤️"
        );

    }


    saveData();

    updateUserUI();

    showPage("favorites");

}


/* =====================================================
   PLAY GAME
===================================================== */

function playGame(id) {

    const game =
        getGame(id);


    if (!game) {

        return;

    }


    if (
        !data.played
            .includes(id)
    ) {

        data.played.unshift(id);

    }


    data.played =
        data.played.slice(
            0,
            20
        );


    saveData();


    if (id === "color") {

        startColorRush();

        return;

    }


    if (id === "speed") {

        startSpeedRush();

        return;

    }


    startSimpleGame(game);

}


/* =====================================================
   SIMPLE DEMO GAMES
===================================================== */

function startSimpleGame(game) {

    openModal(`

        <div style="
            text-align:center;
        ">

            <div style="
                font-size:80px;
            ">

                ${game.icon}

            </div>

            <h2>

                ${game.name}

            </h2>

            <p class="muted">

                ${game.description}

            </p>

            <button
                id="simpleStart"
                class="btn primary"
            >

                ▶ Start Game

            </button>

            <h2
                id="simpleScore"
                style="margin-top:20px;"
            >

                Score: 0

            </h2>

        </div>

    `);


    let score = 0;


    document.getElementById(
        "simpleStart"
    ).onclick = function () {

        score +=
            10 +
            Math.floor(
                Math.random() * 40
            );

        data.coins += 2;

        saveData();

        document.getElementById(
            "simpleScore"
        ).textContent =
            `Score: ${score} · +2 coins`;

        showToast(
            "+2 coins 🪙"
        );

    };

}


/* =====================================================
   COLOR RUSH
===================================================== */

function startColorRush() {

    let score = 0;

    let time = 20;

    let combo = 0;


    const colors = [

        ["RED", "#ef4444"],

        ["BLUE", "#3b82f6"],

        ["GREEN", "#22c55e"],

        ["YELLOW", "#facc15"],

        ["PURPLE", "#a855f7"]

    ];


    openModal(`

        <div>

            <h2>
                🎨 Color Rush
            </h2>

            <div class="score-bar">

                <b>
                    Score:
                    <span id="colorScore">
                        0
                    </span>
                </b>

                <b>
                    Time:
                    <span id="colorTime">
                        20
                    </span>
                </b>

                <b>
                    Combo:
                    <span id="colorCombo">
                        0
                    </span>
                </b>

            </div>


            <h1
                id="colorTarget"
                style="
                    text-align:center;
                    font-size:45px;
                    margin:20px;
                "
            >
                BLUE
            </h1>


            <div
                class="color-buttons"
                id="colorButtons"
            ></div>

        </div>

    `);


    function nextRound() {

        const target =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        const targetElement =
            document.getElementById(
                "colorTarget"
            );


        targetElement.textContent =
            target[0];

        targetElement.style.color =
            target[1];


        const shuffled =
            colors
                .slice()
                .sort(
                    () =>
                        Math.random() -
                        0.5
                );


        document.getElementById(
            "colorButtons"
        ).innerHTML =
            shuffled
                .map(
                    color => `

                        <button
                            class="color-button"
                            style="
                                background:
                                ${color[1]};
                            "
                            data-color="${color[0]}"
                        ></button>

                    `
                )
                .join("");


        document
            .querySelectorAll(
                ".color-button"
            )
            .forEach(
                button => {

                    button.onclick =
                        function () {

                            if (
                                this.dataset.color ===
                                target[0]
                            ) {

                                score +=
                                    10 +
                                    combo * 2;

                                combo++;

                                data.coins++;

                            } else {

                                combo = 0;

                                score =
                                    Math.max(
                                        0,
                                        score - 5
                                    );

                            }


                            document.getElementById(
                                "colorScore"
                            ).textContent =
                                score;


                            document.getElementById(
                                "colorCombo"
                            ).textContent =
                                combo;


                            nextRound();

                        };

                }
            );

    }


    nextRound();


    const timer =
        setInterval(
            function () {

                time--;


                const timeElement =
                    document.getElementById(
                        "colorTime"
                    );


                if (timeElement) {

                    timeElement.textContent =
                        time;

                }


                if (time <= 0) {

                    clearInterval(timer);


                    const oldBest =
                        data.bestScores.color ||
                        0;


                    data.bestScores.color =
                        Math.max(
                            oldBest,
                            score
                        );


                    saveData();


                    openModal(`

                        <div
                            style="
                                text-align:center;
                            "
                        >

                            <h2>
                                🏆 Time's Up!
                            </h2>

                            <h1>
                                ${score}
                            </h1>

                            <p>
                                Best:
                                ${data.bestScores.color}
                            </p>

                            <br>

                            <button
                                class="btn primary"
                                onclick="startColorRush()"
                            >

                                🔄 Play Again

                            </button>

                        </div>

                    `);

                }

            },
            1000
        );

}


/* =====================================================
   SPEED RUSH
===================================================== */

function startSpeedRush() {

    let lane = 1;

    let score = 0;

    let alive = true;


    openModal(`

        <h2>
            🏎️ Speed Rush
        </h2>


        <div class="score-bar">

            <b>
                Score:
                <span id="raceScore">
                    0
                </span>
            </b>

            <b>
                Coins:
                <span id="raceCoins">
                    ${data.coins}
                </span>
            </b>

        </div>


        <div class="race">

            <div class="road"></div>

            <div
                id="playerCar"
                class="car"
            >
                🏎️
            </div>

            <div
                id="enemyCar"
                class="enemy"
            >
                🚙
            </div>

        </div>


        <div style="
            text-align:center;
        ">

            <button
                class="btn"
                onclick="moveCar(-1)"
            >
                ← Left
            </button>

            <button
                class="btn primary"
                onclick="boostCar()"
            >
                ⚡ BOOST
            </button>

            <button
                class="btn"
                onclick="moveCar(1)"
            >
                Right →
            </button>

        </div>

    `);


    window.currentLane =
        lane;


    window.moveCar =
        function (direction) {

            lane += direction;


            lane =
                Math.max(
                    0,
                    Math.min(
                        2,
                        lane
                    )
                );


            window.currentLane =
                lane;


            const car =
                document.getElementById(
                    "playerCar"
                );


            if (car) {

                car.style.left =
                    [
                        "38%",
                        "50%",
                        "62%"
                    ][lane];

            }

        };


    window.boostCar =
        function () {

            score += 25;

            const scoreElement =
                document.getElementById(
                    "raceScore"
                );


            if (scoreElement) {

                scoreElement.textContent =
                    score;

            }


            showToast(
                "+25 BOOST ⚡"
            );

        };


    let enemyY = -70;

    let enemyLane =
        Math.floor(
            Math.random() * 3
        );


    const raceTimer =
        setInterval(
            function () {

                if (!alive) {

                    clearInterval(
                        raceTimer
                    );

                    return;

                }


                enemyY += 7;


                const enemy =
                    document.getElementById(
                        "enemyCar"
                    );


                if (!enemy) {

                    clearInterval(
                        raceTimer
                    );

                    return;

                }


                enemy.style.top =
                    enemyY + "px";


                enemy.style.left =
                    [
                        "33%",
                        "46%",
                        "59%"
                    ][enemyLane];


                if (
                    enemyY > 300
                ) {

                    enemyY = -70;


                    enemyLane =
                        Math.floor(
                            Math.random() * 3
                        );


                    score += 10;

                    data.coins++;


                    const scoreElement =
                        document.getElementById(
                            "raceScore"
                        );


                    const coinElement =
                        document.getElementById(
                            "raceCoins"
                        );


                    if (scoreElement) {

                        scoreElement.textContent =
                            score;

                    }


                    if (coinElement) {

                        coinElement.textContent =
                            data.coins;

                    }

                }


                if (
                    enemyY > 260 &&
                    enemyLane === lane
                ) {

                    alive = false;

                    clearInterval(
                        raceTimer
                    );


                    const oldBest =
                        data.bestScores.speed ||
                        0;


                    data.bestScores.speed =
                        Math.max(
                            oldBest,
                            score
                        );


                    saveData();


                    openModal(`

                        <div
                            style="
                                text-align:center;
                            "
                        >

                            <div style="
                                font-size:60px;
                            ">
                                💥
                            </div>

                            <h2>
                                CRASH!
                            </h2>

                            <h1>
                                ${score}
                            </h1>

                            <p>
                                Best:
                                ${data.bestScores.speed}
                            </p>

                            <br>

                            <button
                                class="btn primary"
                                onclick="startSpeedRush()"
                            >

                                🔄 Race Again

                            </button>

                        </div>

                    `);

                }


            },
            60
        );

}


/* =====================================================
   ACCOUNT
===================================================== */

function openAccount() {

    if (data.username) {

        openModal(`

            <h2>
                👤 ${data.username}
            </h2>


            <div class="panel">

                <p>
                    🪙 Coins:
                    <b class="coins">
                        ${data.coins}
                    </b>
                </p>

                <br>

                <p>
                    ❤️ Favorites:
                    ${data.favorites.length}
                </p>

                <br>

                <p>
                    🎮 Games Played:
                    ${data.played.length}
                </p>

                <br>

                <p>
                    ⭐ Membership:
                    ${data.membership}
                </p>

            </div>


            <br>


            <button
                class="btn"
                onclick="signOut()"
            >

                Sign Out

            </button>

        `);

        return;

    }


    openModal(`

        <h2>
            👤 Join ASAMH
        </h2>

        <p class="muted">

            Create your ASAMH account.

        </p>


        <input
            id="usernameInput"
            class="input"
            placeholder="Choose username"
        >


        <button
            class="btn primary"
            onclick="createAccount()"
        >

            Create Account

        </button>


        <h3 style="
            margin-top:25px;
        ">

            Membership

        </h3>


        <div class="membership">

            <span>
                Free
            </span>

            <b>
                €0
            </b>

        </div>


        <div class="membership">

            <span>
                Medium
            </span>

            <b>
                €2/month
            </b>

        </div>


        <div class="membership">

            <span>
                All Inclusive
            </span>

            <b>
                €4/month
            </b>

        </div>

    `);

}


/* =====================================================
   CREATE ACCOUNT
===================================================== */

function createAccount() {

    const input =
        document.getElementById(
            "usernameInput"
        );


    const username =
        input.value.trim();


    if (!username) {

        showToast(
            "Please enter a username."
        );

        return;

    }


    data.username =
        username;


    saveData();

    updateUserUI();

    closeModal();


    showToast(
        "Welcome to ASAMH! 🎮"
    );

}


/* =====================================================
   SIGN OUT
===================================================== */

function signOut() {

    data.username =
        null;


    saveData();

    updateUserUI();

    closeModal();


    showToast(
        "Signed out."
    );

}


/* =====================================================
   SHOP
===================================================== */

function openShop() {

    openModal(`

        <h2>
            🛒 ASAMH Shop
        </h2>

        <p class="muted">

            Coins and membership for
            the ASAMH prototype.

        </p>


        <div class="panel">

            <p>
                Your coins:
                <b class="coins">
                    🪙 ${data.coins}
                </b>
            </p>

        </div>


        <h3 style="
            margin-top:20px;
        ">

            Membership

        </h3>


        <div class="membership">

            <span>
                🆓 Free
            </span>

            <b>
                €0
            </b>

        </div>


        <div class="membership">

            <span>
                ⭐ Medium
            </span>

            <button
                class="btn"
                onclick="
                    selectMembership('Medium')
                "
            >

                €2/month

            </button>

        </div>


        <div class="membership">

            <span>
                👑 All Inclusive
            </span>

            <button
                class="btn primary"
                onclick="
                    selectMembership(
                        'All Inclusive'
                    )
                "
            >

                €4/month

            </button>

        </div>


        <h3 style="
            margin-top:20px;
        ">

            Virtual Coins

        </h3>


        <div class="membership">

            <span>
                🪙 100 Coins
            </span>

            <button
                class="btn"
                onclick="buyCoins(100)"
            >

                Get

            </button>

        </div>


        <div class="membership">

            <span>
                🪙 500 Coins
            </span>

            <button
                class="btn"
                onclick="buyCoins(500)"
            >

                Get

            </button>

        </div>

    `);

}


/* =====================================================
   MEMBERSHIP
===================================================== */

function selectMembership(plan) {

    data.membership =
        plan;


    saveData();


    showToast(
        plan +
        " selected ⭐"
    );


    openShop();

}


/* =====================================================
   COINS
===================================================== */

function buyCoins(amount) {

    data.coins += amount;


    saveData();


    showToast(
        "+" +
        amount +
        " coins 🪙"
    );


    openShop();

}


/* =====================================================
   UPDATE UI
===================================================== */

function updateUserUI() {

    document.getElementById(
        "favoriteCount"
    ).textContent =
        data.favorites.length;


    document.getElementById(
        "usernameText"
    ).textContent =
        data.username ||
        "Sign In";

}


/* =====================================================
   MOBILE MENU
===================================================== */

function closeMobileMenu() {

    document
        .getElementById(
            "sidebar"
        )
        .classList.remove(
            "open"
        );

}


document.getElementById(
    "menuButton"
).onclick =
    function () {

        document
            .getElementById(
                "sidebar"
            )
            .classList.toggle(
                "open"
            );

    };


/* =====================================================
   SEARCH
===================================================== */

document.getElementById(
    "search"
).addEventListener(
    "input",
    function () {

        const query =
            this.value
                .toLowerCase()
                .trim();


        if (!query) {

            showPage("home");

            return;

        }


        const results =
            games.filter(
                game => {

                    return (

                        game.name
                            .toLowerCase()
                            .includes(query)

                        ||

                        game.category
                            .toLowerCase()
                            .includes(query)

                        ||

                        game.description
                            .toLowerCase()
                            .includes(query)

                    );

                }
            );


        document.getElementById(
            "app"
        ).innerHTML = `

            <h1 class="page-title">

                Search

            </h1>

            <p class="muted">

                Results for:
                <b>${query}</b>

            </p>

            ${createGrid(results)}

        `;

    }
);


/* =====================================================
   CLOSE MODAL WHEN CLICKING BACKGROUND
===================================================== */

document.getElementById(
    "modal"
).addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            this
        ) {

            closeModal();

        }

    }
);


/* =====================================================
   START ASAMH
===================================================== */

updateUserUI();

showPage("home");
