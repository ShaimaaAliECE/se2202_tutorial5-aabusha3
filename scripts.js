let nextPlayer = 'X'; // takes a value of either 'X' or 'O' according to the game turns
//initialize the game

// use the value stored in the nextPlayer variable to indicate who the next player is
let playerLabel = document.getElementById('next-lbl');
playerLabel.innerText = nextPlayer;

function switchPlayer() {
    (nextPlayer == "X") ? nextPlayer = "O": nextPlayer = "X";
    playerLabel.innerText = nextPlayer;
}

//This call will create the buttons needed for the gameboard.
createGameBoard(0);

function createGameBoard(i) {
    // Programatically add a button with square brackets enclosing an empty space to each cell in the gameboard
    let newButton = document.createElement('button');
    newButton.innerText = "[ ]";
    newButton.setAttribute("class", "tableMember");
    let idList = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9"];
    document.getElementById(idList[i]).appendChild(newButton);
    if (i < idList.length - 1)
        createGameBoard(++i);
}

// Programatically add 'takeCell' as an event listener to all the buttons on the board
let btns = document.querySelectorAll('button');
for (let i = 0; i < btns.length; i++)
    btns[i].onclick = takeCell;

// This function will be used to respond to a click event on any of the board buttons.
function takeCell(event) {
    /*
        When the button is clicked, the space inside its square brackets is replaced by the value in the nextPlayer before switching it
    */
    let buttonClicked = event.target;
    if (buttonClicked.disabled)
        return;
    buttonClicked.innerHTML = nextPlayer;
    buttonClicked.disabled = true;

    // Make sure the button is clickable only once (I didn't mention how to do that, look it up :) )

    // Check if the game is over
    if (isGameOver()) {
        // let the lable with the id 'game-over-lbl' display the words 'Game Over' inside <h1> element
        let gameOverLabel = document.getElementById('game-over-lbl');
        let heading1 = document.createElement('H1');
        let textContent = document.createTextNode("The Game Is Over, No More Moves Can Be Made");
        heading1.appendChild(textContent);
        gameOverLabel.appendChild(heading1);

        playAgain();
    }

    // I'll leave declaring the winner for your intrinsic motivation, it's not required for this assignment 
    if (isWinner()) {
        let gameOverLabel = document.getElementById('game-over-lbl');
        let heading1 = document.createElement('H1');
        let textContent = document.createTextNode("The Game Is Over, " + nextPlayer + " Has Won");
        heading1.appendChild(textContent);
        gameOverLabel.appendChild(heading1);
        for (let i = 0; i < btns.length; i++)
            btns[i].disabled = true;

        playAgain();
    }


    switchPlayer();
}

function isGameOver() {
    // This function returns true if all the buttons are disabled and false otherwise 
    for (let i = 0; i < btns.length; i++)
        if (!btns[i].disabled)
            return false;

    return true;
}

function isWinner() {
    let row1 = [btns[0], btns[1], btns[2]];
    let row2 = [btns[3], btns[4], btns[5]];
    let row3 = [btns[6], btns[7], btns[8]];
    let column1 = [btns[0], btns[3], btns[6]];
    let column2 = [btns[1], btns[4], btns[7]];
    let column3 = [btns[2], btns[5], btns[8]];
    let diagonal1 = [btns[0], btns[4], btns[8]];
    let diagonal2 = [btns[2], btns[4], btns[6]];

    let allPossbilities = [row1, row2, row3, column1, column2, column3, diagonal1, diagonal2];

    for (let arrayIndex = 0; arrayIndex < allPossbilities.length; arrayIndex++)
        if (((allPossbilities[arrayIndex][0].innerText == "X") || (allPossbilities[arrayIndex][0].innerText == "O")) && (allPossbilities[arrayIndex][0].innerText == allPossbilities[arrayIndex][1].innerText) && (allPossbilities[arrayIndex][1].innerText == allPossbilities[arrayIndex][2].innerText))
            return true;


    return false;
}

function playAgain() {
    let playAgainButton = document.createElement('button');
    playAgainButton.innerText = "Play Again?";
    playAgainButton.setAttribute("onClick", "reloadPage()");
    playAgainButton.className = "reload biggerFontPlease";


    document.body.appendChild(playAgainButton);
}

function reloadPage() {
    window.location.reload();
}