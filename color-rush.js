// ============================================================
// ASAMH - COLOR RUSH
// Direct browser conversion of the Pygame version
// ============================================================

(() => {
    "use strict";

    // --------------------------------------------------------
    // GAME SETTINGS
    // --------------------------------------------------------

    const WIDTH = 900;
    const HEIGHT = 600;

    const BUTTON_SIZE = 150;
    const GAP = 25;

    const MAX_LIVES = 3;
    const GAME_TIME = 60;


    // --------------------------------------------------------
    // COLORS
    // --------------------------------------------------------

    const BACKGROUND = "rgb(18, 20, 35)";
    const WHITE = "rgb(245, 245, 245)";

    const COLORS = {
        "ROT": "rgb(230, 70, 70)",
        "GRÜN": "rgb(70, 210, 120)",
        "BLAU": "rgb(70, 130, 240)",
        "GELB": "rgb(240, 200, 60)",
        "LILA": "rgb(170, 90, 240)",
        "ORANGE": "rgb(240, 140, 60)"
    };


    // --------------------------------------------------------
    // GAME VARIABLES
    // --------------------------------------------------------

    let score = 0;
    let lives = MAX_LIVES;
    let combo = 0;

    let gameRunning = true;
    let gameOverScreen = false;

    let startTime = 0;

    let targetColor = null;

    let buttons = [];


    // --------------------------------------------------------
    // CREATE CANVAS
    // --------------------------------------------------------

    const canvas = document.createElement("canvas");

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    canvas.id = "asamh-color-rush-canvas";

    canvas.style.display = "block";
    canvas.style.width = "min(100%, 900px)";
    canvas.style.height = "auto";
    canvas.style.maxHeight = "100vh";

    canvas.style.margin = "auto";

    canvas.style.background = BACKGROUND;

    canvas.style.touchAction = "none";

    document.body.style.margin = "0";
    document.body.style.background = BACKGROUND;

    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";

    document.body.style.minHeight = "100vh";

    document.body.appendChild(canvas);


    const ctx = canvas.getContext("2d");


    // --------------------------------------------------------
    // FONT
    // --------------------------------------------------------

    const FONT_BIG = "70px Arial";
    const FONT_MEDIUM = "45px Arial";
    const FONT_SMALL = "30px Arial";


    // --------------------------------------------------------
    // DRAW TEXT
    // Same idea as Pygame draw_text()
    // --------------------------------------------------------

    function drawText(
        text,
        font,
        color,
        x,
        y,
        center = true
    ) {

        ctx.font = font;
        ctx.fillStyle = color;

        ctx.textBaseline = "middle";

        if (center) {

            ctx.textAlign = "center";

            ctx.fillText(
                text,
                x,
                y
            );

        } else {

            ctx.textAlign = "left";

            ctx.fillText(
                text,
                x,
                y
            );
        }
    }


    // --------------------------------------------------------
    // NEW ROUND
    // --------------------------------------------------------

    function newRound() {

        const colorNames =
            Object.keys(COLORS);


        // Random target color

        targetColor =
            colorNames[
                Math.floor(
                    Math.random() *
                    colorNames.length
                )
            ];


        // Put target color into buttons

        let buttonNames = [
            targetColor
        ];


        // Get the other colors

        const otherColors =
            colorNames.filter(
                color =>
                    color !== targetColor
            );


        // Randomly choose 3 other colors

        shuffle(otherColors);


        buttonNames.push(
            otherColors[0],
            otherColors[1],
            otherColors[2]
        );


        // Shuffle all four buttons

        shuffle(buttonNames);


        // Exact Pygame positions

        const positions = [

            {
                x:
                    WIDTH / 2 -
                    BUTTON_SIZE -
                    GAP / 2,

                y:
                    HEIGHT / 2 -
                    BUTTON_SIZE -
                    GAP / 2
            },

            {
                x:
                    WIDTH / 2 +
                    GAP / 2,

                y:
                    HEIGHT / 2 -
                    BUTTON_SIZE -
                    GAP / 2
            },

            {
                x:
                    WIDTH / 2 -
                    BUTTON_SIZE -
                    GAP / 2,

                y:
                    HEIGHT / 2 +
                    GAP / 2
            },

            {
                x:
                    WIDTH / 2 +
                    GAP / 2,

                y:
                    HEIGHT / 2 +
                    GAP / 2
            }

        ];


        buttons = [];


        for (
            let i = 0;
            i < buttonNames.length;
            i++
        ) {

            buttons.push({

                x: positions[i].x,

                y: positions[i].y,

                width: BUTTON_SIZE,

                height: BUTTON_SIZE,

                colorName: buttonNames[i]

            });

        }
    }


    // --------------------------------------------------------
    // SHUFFLE
    // --------------------------------------------------------

    function shuffle(array) {

        for (
            let i = array.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() *
                    (i + 1)
                );


            [
                array[i],
                array[j]
            ] =
            [
                array[j],
                array[i]
            ];
        }

        return array;
    }


    // --------------------------------------------------------
    // RESTART GAME
    // --------------------------------------------------------

    function restartGame() {

        score = 0;

        lives = MAX_LIVES;

        combo = 0;

        startTime =
            performance.now();

        gameOverScreen = false;

        gameRunning = true;

        newRound();
    }


    // --------------------------------------------------------
    // ROUND CORNERED RECTANGLE
    // --------------------------------------------------------

    function roundedRect(
        x,
        y,
        width,
        height,
        radius
    ) {

        ctx.beginPath();

        ctx.moveTo(
            x + radius,
            y
        );

        ctx.lineTo(
            x + width - radius,
            y
        );

        ctx.quadraticCurveTo(
            x + width,
            y,
            x + width,
            y + radius
        );

        ctx.lineTo(
            x + width,
            y + height - radius
        );

        ctx.quadraticCurveTo(
            x + width,
            y + height,
            x + width - radius,
            y + height
        );

        ctx.lineTo(
            x + radius,
            y + height
        );

        ctx.quadraticCurveTo(
            x,
            y + height,
            x,
            y + height - radius
        );

        ctx.lineTo(
            x,
            y + radius
        );

        ctx.quadraticCurveTo(
            x,
            y,
            x + radius,
            y
        );

        ctx.closePath();
    }


    // --------------------------------------------------------
    // DRAW GAME
    // --------------------------------------------------------

    function drawGame() {

        // Background

        ctx.fillStyle =
            BACKGROUND;

        ctx.fillRect(
            0,
            0,
            WIDTH,
            HEIGHT
        );


        // ----------------------------------------------------
        // ASAMH
        // ----------------------------------------------------

        drawText(
            "ASAMH",
            FONT_MEDIUM,
            WHITE,
            30,
            52,
            false
        );


        // ----------------------------------------------------
        // SCORE
        // ----------------------------------------------------

        drawText(
            `Punkte: ${score}`,
            FONT_SMALL,
            WHITE,
            30,
            95,
            false
        );


        // ----------------------------------------------------
        // LIVES
        // ----------------------------------------------------

        drawText(
            `Leben: ${lives}`,
            FONT_SMALL,
            WHITE,
            30,
            130,
            false
        );


        // ----------------------------------------------------
        // COMBO
        // ----------------------------------------------------

        drawText(
            `Combo: ${combo}`,
            FONT_SMALL,
            "rgb(240, 200, 60)",
            WIDTH - 180,
            95,
            false
        );


        // ----------------------------------------------------
        // TIME
        // ----------------------------------------------------

        const elapsed =
            (performance.now() -
                startTime) /
            1000;


        const remaining =
            Math.max(
                0,
                GAME_TIME - elapsed
            );


        drawText(
            `Zeit: ${Math.floor(remaining)}`,
            FONT_SMALL,
            WHITE,
            WIDTH - 180,
            130,
            false
        );


        // ----------------------------------------------------
        // TASK
        // ----------------------------------------------------

        drawText(
            "KLICKE AUF:",
            FONT_SMALL,
            WHITE,
            WIDTH / 2,
            45
        );


        drawText(
            targetColor,
            FONT_BIG,
            COLORS[targetColor],
            WIDTH / 2,
            105
        );


        // ----------------------------------------------------
        // BUTTONS
        // ----------------------------------------------------

        buttons.forEach(button => {

            // Fill

            ctx.fillStyle =
                COLORS[
                    button.colorName
                ];


            roundedRect(
                button.x,
                button.y,
                button.width,
                button.height,
                20
            );

            ctx.fill();


            // White border

            ctx.strokeStyle =
                WHITE;

            ctx.lineWidth = 3;

            roundedRect(
                button.x,
                button.y,
                button.width,
                button.height,
                20
            );

            ctx.stroke();

        });
    }


    // --------------------------------------------------------
    // GAME OVER
    // --------------------------------------------------------

    function drawGameOver() {

        ctx.fillStyle =
            BACKGROUND;

        ctx.fillRect(
            0,
            0,
            WIDTH,
            HEIGHT
        );


        // GAME OVER

        drawText(
            "GAME OVER",
            FONT_BIG,
            "rgb(230, 70, 70)",
            WIDTH / 2,
            180
        );


        // SCORE

        drawText(
            `Dein Score: ${score}`,
            FONT_MEDIUM,
            WHITE,
            WIDTH / 2,
            260
        );


        // ENTER

        drawText(
            "ENTER = Noch einmal spielen",
            FONT_SMALL,
            WHITE,
            WIDTH / 2,
            340
        );


        // ESC

        drawText(
            "ESC = Beenden",
            FONT_SMALL,
            "rgb(160, 160, 160)",
            WIDTH / 2,
            390
        );
    }


    // --------------------------------------------------------
    // GET MOUSE / TOUCH POSITION
    // Converts browser coordinates to 900x600 coordinates
    // --------------------------------------------------------

    function getGamePosition(event) {

        const rect =
            canvas.getBoundingClientRect();


        let clientX;
        let clientY;


        if (
            event.touches &&
            event.touches.length > 0
        ) {

            clientX =
                event.touches[0].clientX;

            clientY =
                event.touches[0].clientY;

        } else {

            clientX =
                event.clientX;

            clientY =
                event.clientY;
        }


        const scaleX =
            WIDTH / rect.width;

        const scaleY =
            HEIGHT / rect.height;


        return {

            x:
                (clientX - rect.left) *
                scaleX,

            y:
                (clientY - rect.top) *
                scaleY

        };
    }


    // --------------------------------------------------------
    // BUTTON CLICK
    // --------------------------------------------------------

    function handleClick(event) {

        if (gameOverScreen) {
            return;
        }


        const position =
            getGamePosition(event);


        for (
            const button of buttons
        ) {

            const inside =
                position.x >= button.x &&
                position.x <=
                    button.x +
                    button.width &&

                position.y >= button.y &&
                position.y <=
                    button.y +
                    button.height;


            if (inside) {

                // --------------------------------------------
                // CORRECT
                // --------------------------------------------

                if (
                    button.colorName ===
                    targetColor
                ) {

                    combo += 1;

                    score +=
                        10 + combo;

                    newRound();

                }

                // --------------------------------------------
                // WRONG
                // --------------------------------------------

                else {

                    lives -= 1;

                    combo = 0;


                    if (
                        lives <= 0
                    ) {

                        gameOverScreen =
                            true;
                    }
                }


                break;
            }
        }
    }


    // --------------------------------------------------------
    // MOUSE
    // --------------------------------------------------------

    canvas.addEventListener(
        "mousedown",
        handleClick
    );


    // --------------------------------------------------------
    // TOUCH
    // --------------------------------------------------------

    canvas.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            handleClick(event);

        },
        {
            passive: false
        }
    );


    // --------------------------------------------------------
    // KEYBOARD
    // --------------------------------------------------------

    document.addEventListener(
        "keydown",
        function(event) {

            if (!gameOverScreen) {
                return;
            }


            // ENTER = RESTART

            if (
                event.key ===
                "Enter"
            ) {

                restartGame();

            }


            // ESC = EXIT

            else if (
                event.key ===
                "Escape"
            ) {

                gameRunning = false;

                canvas.style.display =
                    "none";
            }

        }
    );


    // --------------------------------------------------------
    // GAME LOOP
    // This replaces pygame's while loop + clock.tick(60)
    // --------------------------------------------------------

    function gameLoop() {

        if (!gameRunning) {
            return;
        }


        // Check time

        if (!gameOverScreen) {

            const elapsed =
                (performance.now() -
                    startTime) /
                1000;


            if (
                elapsed >=
                GAME_TIME
            ) {

                gameOverScreen =
                    true;
            }
        }


        // Draw

        if (gameOverScreen) {

            drawGameOver();

        } else {

            drawGame();
        }


        // Browser equivalent of 60 FPS

        requestAnimationFrame(
            gameLoop
        );
    }


    // --------------------------------------------------------
    // START GAME
    // --------------------------------------------------------

    restartGame();

    gameLoop();

})();
