

const dice = [
    ["R", "I", "F", "O", "B", "X"],
    ["I", "F", "E", "H", "E", "Y"],
    ["D", "E", "N", "O", "W", "S"],
    ["U", "T", "O", "K", "N", "D"],
    ["H", "M", "S", "R", "A", "O"],
    ["L", "U", "P", "E", "T", "S"],
    ["A", "C", "I", "T", "O", "A"],
    ["Y", "L", "G", "K", "U", "E"],
    ["Qu", "B", "M", "J", "O", "A"],
    ["E", "H", "I", "S", "P", "N"],
    ["V", "E", "T", "I", "G", "N"],
    ["B", "A", "L", "I", "Y", "T"],
    ["E", "Z", "A", "V", "N", "D"],
    ["R", "A", "L", "E", "S", "C"],
    ["U", "W", "I", "L", "R", "G"],
    ["P", "A", "C", "E", "M", "D"],
]

/**
 * Return a random element chosen from an array
 * @param array
 * @param pop if the element should be removed from the array, or just returned.
 * @return an element from the array
 */
function randomChoice(array, pop=false) {
    const index = Math.floor(Math.random() * array.length);
    const randomElement = array[index];

    if (pop) {
        array.splice(index, 1);
    }

    return randomElement;
}

/**
 * @returns a deep copy of the dice set
 */
function getDiceSet() {
    return JSON.parse(JSON.stringify(dice));
}

/**
 * Generate a boogle gameboard using the dice.
 * The gameboard can be of arbitrary size, but all of the dice
 * will be used exactly ONCE for a 4x4 or 16x1 game.
 * @param width
 * @param height
 */
function generateGameBoard(width, height) {
    const gameBoard = [];

    let dice = [];

    for (let i=0; i<width; i++) {
        const row = []

        for (let j=0; j<width; j++) {
            if (dice.length === 0) {
                dice = getDiceSet();
            }
            const die = randomChoice(dice, true);
            const letter = randomChoice(die);
            row.push(letter)
        }
        gameBoard.push(row);
    }

    return gameBoard;
}