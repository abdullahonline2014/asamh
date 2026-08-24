'''/* =========================================
   ASAMH LOGIN SYSTEM
========================================= */

function getUsers() {

    return JSON.parse(
        localStorage.getItem("ASAMH_USERS")
    ) || [];

}


function saveUsers(users) {

    localStorage.setItem(
        "ASAMH_USERS",
        JSON.stringify(users)
    );

}


/* =========================================
   REGISTER
========================================= */

function registerUser() {

    const username =
        document
            .getElementById(
                "registerUsername"
            )
            .value
            .trim();

    const password =
        document
            .getElementById(
                "registerPassword"
            )
            .value;


    const message =
        document.getElementById(
            "registerMessage"
        );


    if (username.length < 3) {

        message.textContent =
            "Username must have at least 3 characters.";

        return;

    }


    if (password.length < 4) {

        message.textContent =
            "Password must have at least 4 characters.";

        return;

    }


    const users =
        getUsers();


    const exists =
        users.some(
            user =>
                user.username
                    .toLowerCase() ===
                username.toLowerCase()
        );


    if (exists) {

        message.textContent =
            "That username already exists.";

        return;

    }


    const newUser = {

        username: username,

        password: password,

        membership: "Free",

        coins: 250,

        favorites: [],

        played: [],

        bestScores: {},

        created:
            new Date().toLocaleDateString()

    };


    users.push(newUser);

    saveUsers(users);


    localStorage.setItem(
        "ASAMH_CURRENT_USER",
        username
    );


    message.style.color =
        "#6dffb0";

    message.textContent =
        "Account created!";


    setTimeout(
        () => {

            window.location.href =
                "index.html";

        },
        700
    );

}


/* =========================================
   LOGIN
========================================= */

function loginUser() {

    const username =
        document
            .getElementById(
                "loginUsername"
            )
            .value
            .trim();

    const password =
        document
            .getElementById(
                "loginPassword"
            )
            .value;


    const message =
        document.getElementById(
            "loginMessage"
        );


    const users =
        getUsers();


    const user =
        users.find(
            user =>
                user.username
                    .toLowerCase() ===
                username.toLowerCase() &&
                user.password ===
                password
        );


    if (!user) {

        message.textContent =
            "Wrong username or password.";

        return;

    }


    localStorage.setItem(
        "ASAMH_CURRENT_USER",
        user.username
    );


    message.style.color =
        "#6dffb0";

    message.textContent =
        "Login successful!";


    setTimeout(
        () => {

            window.location.href =
                "index.html";

        },
        500
    );

}


/* =========================================
   SWITCH FORMS
========================================= */

function showRegister() {

    document.getElementById(
        "loginSection"
    ).style.display =
        "none";


    document.getElementById(
        "registerSection"
    ).style.display =
        "block";

}


function showLogin() {

    document.getElementById(
        "registerSection"
    ).style.display =
        "none";


    document.getElementById(
        "loginSection"
    ).style.display =
        "block";

}
'''
