var numSelected = null;
var tileSelected = null;
var errors = 0;

// Initial state of the Sudoku board
var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];

//  Solution of the Sudoku board
var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
];

// Function called when the page is loaded
window.onload = function () {
    setGame();
};

// Function to set up the Sudoku game
function setGame() {
    // 1>>>9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // create board cells 9x9
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            if (board[i][j] != "-") {
                tile.innerText = board[i][j];
                tile.classList.add("tile-start"); // Initial numbers in the Sudoku board
            }
            if (i == 2 || i == 5) {
                tile.classList.add("horizontal-line"); // styling for horizontal lines
            }
            if (j == 2 || j == 5) {
                tile.classList.add("vertical-line"); // styling for vertical lines
            }
            tile.addEventListener("click", selectTile); // tile selection
            tile.classList.add("tile"); // styling tiles 
            document.getElementById("board").append(tile); // adding tiles to the board
        }
    }
}

// Function to handle number selection
function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected"); // remove the selection from the previous number
    }
    numSelected = this; // setting the current selected number
    numSelected.classList.add("number-selected");
}

// Function to handle tile selection
function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return; // If the tile already has a number, don't do anything
        }

        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id; // Fill the tile with the selected number
            this.classList.add("tile-solved"); // Mark the tile as solved
            this.classList.remove("tile-unsolved"); // Remove the unsolved styling
        } else {
            errors += 1; // error counter increment
            document.getElementById("errors").innerText = errors; // Update the error counter 
        }
    }
}

// Function to solve the game
function solve() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            if (tile.innerText === "") {
                tile.innerText = solution[i][j]; // Fill empty tiles with the right solution
                tile.classList.add("tile-solved"); // Mark solved tiles
                tile.classList.remove("tile-unsolved"); // Remove the unsolved styling
            }
        }
    }
}

// Function to reset the game
function reset() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            if (!tile.classList.contains("tile-start")) {
                tile.innerText = ""; // remove the non-initial tiles
                tile.classList.remove("tile-solved"); // Remove the solved styling
                tile.classList.add("tile-unsolved"); // Add the unsolved styling
            }
        }
    }
    errors = 0; // Reset the error counter
    document.getElementById("errors").innerText = errors; // Update the error counter 
}