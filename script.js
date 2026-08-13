const games = [
    {
        name: "Color Rush",
        category: "Arcade",
        type: "ASAMH Original",
        style: "arcade",
        description: "Click the correct color as quickly as possible and build your combo."
    },

    {
        name: "Speed Rush",
        category: "Racing",
        type: "Coming Soon",
        style: "racing",
        description: "A fast racing game planned for ASAMH."
    },

    {
        name: "Block Drop",
        category: "Puzzle",
        type: "Free",
        style: "puzzle",
        description: "Match blocks and beat your highest score."
    },

    {
        name: "Sky Adventure",
        category: "Adventure",
        type: "Premium",
        style: "",
        description: "Explore a huge adventure world."
    },

    {
        name: "Goal Master",
        category: "Sports",
        type: "Free",
        style: "racing",
        description: "Score goals and climb the leaderboard."
    }
];


const gameGrid = document.getElementById("gameGrid");


function displayGames(list) {

    gameGrid.innerHTML = "";

    list.forEach(function(game) {

        const card = document.createElement("div");

        card.className = "game-card";

        card.innerHTML = `
            <div class="game-image ${game.style}">
                ${game.name}
            </div>

            <div class="game-info">
                <h3>${game.name}</h3>

                <p>${game.type}</p>

                <span class="tag">
                    ${game.category}
                </span>
            </div>
        `;

        card.onclick = function() {
            openGame(game.name);
        };

        gameGrid.appendChild(card);
    });
}


displayGames(games);


function scrollToSection(id) {

    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}


let selectedGame = null;


function openGame(name) {

    selectedGame = games.find(function(game) {
        return game.name === name;
    });

    if (!selectedGame) {
        return;
    }

    document.getElementById("gameTitle").textContent =
        selectedGame.name;

    document.getElementById("gameDescription").textContent =
        selectedGame.description;

    document.getElementById("gameModal").classList.add("show");
}


function closeModal(id) {

    document.getElementById(id).classList.remove("show");
}


function startGame() {

    if (!selectedGame) {
        return;
    }

    alert(
        selectedGame.name +
        " will run inside ASAMH!"
    );
}


function favoriteGame() {

    if (!selectedGame) {
        return;
    }

    alert(
        selectedGame.name +
        " was added to your favorites!"
    );
}


function rateGame() {

    if (!selectedGame) {
        return;
    }

    alert(
        "Your private rating was recorded."
    );
}


function showFavorites() {

    alert(
        "Your favorite games will appear here."
    );
}


function openLogin() {

    document.getElementById("loginModal").classList.add("show");
}


function createAccount() {

    const username =
        document.getElementById("username").value.trim();

    if (username === "") {

        alert("Please enter a username.");

        return;
    }

    localStorage.setItem(
        "asamhUsername",
        username
    );

    alert(
        "Welcome to ASAMH, " +
        username +
        "!"
    );

    closeModal("loginModal");
}


function category(name) {

    const results = games.filter(function(game) {

        return game.category === name;

    });

    displayGames(results);

    scrollToSection("games");
}


function showAllGames() {

    displayGames(games);

    scrollToSection("games");
}


function membership(plan) {

    alert(
        plan +
        " selected. This is only a demo right now."
    );
}


function adminDemo() {

    alert(
        "ASAMH ADMIN PANEL\n\n" +
        "Coming soon:\n" +
        "• Add games\n" +
        "• Remove games\n" +
        "• Edit games\n" +
        "• Premium games\n" +
        "• Featured games\n" +
        "• Manage users\n" +
        "• View ratings\n" +
        "• Leaderboards\n" +
        "• Achievements\n"
    );
}


document
    .getElementById("search")
    .addEventListener("input", function() {

        const search =
            this.value.toLowerCase().trim();

        const results = games.filter(function(game) {

            return (
                game.name.toLowerCase().includes(search) ||
                game.category.toLowerCase().includes(search)
            );

        });

        displayGames(results);
    });
