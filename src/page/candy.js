var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var currTile; // Candy being dragged
var otherTile; // Candy being swapped

var timer = 60;
var level = 1;
var timerInterval;

window.onload = function() {
    startGame();
    
    // Game loop for candy crushing and generation
    window.setInterval(function() {
        crushCandy();
        slideCandy();
        generateCandy();
    }, 200);

    startTimer();
}

// Function to return a random candy
function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

// Function to initialize the game board
function startGame() {
    board = [];
    document.getElementById("board").innerHTML = ""; // Clear the board

    // Create a grid of candies
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            // Add drag event listeners
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    score = 0;
    document.getElementById("score").innerText = score;
}

// Function to start and manage the timer
function startTimer() {
    if (timerInterval) clearInterval(timerInterval); // Clear any existing interval
    timerInterval = setInterval(function() {
        timer--;
        document.getElementById("timer").innerText = timer + " seconds left";

        if (timer <= 0) {
            clearInterval(timerInterval);
            handleEndOfLevel();
        } else if ((level == 1 && score >= 500) || (level == 2 && score >= 600)) {
            clearInterval(timerInterval);
            handleEndOfLevel();
        }

    }, 1000); // Timer decreases every second
}

// Function to handle end of level or game
function handleEndOfLevel() {
    console.log("Current Score:", score); // Debug log
    if (level == 1 && score >= 500) {
        showModal("Congratulations! You've completed Level 1.", "Next Level", function() {
            level = 2;
            timer = 60; // Set timer for level 2
            startGame(); // Start level 2
            startTimer(); // Restart the timer
        });
    } else if (level == 2 && score >= 600) {
        showModal("Congratulations! You've completed the game!", "Play Again", resetGame);
    } else {
        showModal("Time is over! Restarting the game.", "Restart", resetGame);
    }
}


// Function to show the modal with a message, button text, and callback function
function showModal(message, buttonText, callback) {
    console.log("Showing modal with message:", message); // Debug log
    document.getElementById("modal-message").innerText = message;
    document.getElementById("modal-button").innerText = buttonText;
    document.getElementById("modal-quit").innerText = "Quit"; // Add Quit button text
    document.getElementById("modal").style.display = "block";

    // Assign the callback to the button click event
    document.getElementById("modal-button").onclick = function() {
        document.getElementById("modal").style.display = "none";
        callback();
    }
    // Assign the Quit action to the Quit button click event
    document.getElementById("modal-quit").onclick = function() {
        document.getElementById("modal").style.display = "none";
        quitGame(); // Call quitGame function when "Quit" is clicked
    }
}

// Function to handle quitting the game
function quitGame() {
    window.location.href = "index.html"; // Redirect to index.html
}

// Function to reset the game
function resetGame() {
    score = 0;
    level = 1;
    timer = 60; // Reset timer to 60 seconds for level 1
    startGame(); // Restart the game from level 1
    startTimer(); // Start the timer again
}

// DRAG AND DROP FUNCTIONS
function dragStart() {
    currTile = this; // Tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
    // Nothing needed here, but necessary for event flow
}

function dragDrop() {
    otherTile = this; // Target tile
}

function dragEnd() {
    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c - 1 && r == r2;
    let moveRight = c2 == c + 1 && r == r2;
    let moveUp = r2 == r - 1 && c == c2;
    let moveDown = r2 == r + 1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        // Swap tiles
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove) {
            // Revert the swap if the move is invalid
            currTile.src = otherImg;
            otherTile.src = currImg;
        }
    }
}

// Function to crush matching candies
function crushCandy() {
    crushThree(); // Check for matches of 3
    document.getElementById("score").innerText = score;
}

// Function to check for and crush 3-in-a-row candies
function crushThree() {
    // Check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }

    // Check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }
}

// Function to check if the move is valid
function checkValid() {
    // Check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    // Check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}

// Function to slide candies down after crushing
function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = rows - 1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png";
        }
    }
}

// Function to generate new candies after sliding
function generateCandy() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}
