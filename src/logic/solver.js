
// generally useful functions
function type(x) { // does not work in general, but works on JSONable objects we care about... modify as you see fit
    // e.g.  type(/asdf/g) --> "[object RegExp]"
    return Object.prototype.toString.call(x);
}
function zip(arrays) {
    // e.g. zip([[1,2,3],[4,5,6]]) --> [[1,4],[2,5],[3,6]]
    return arrays[0].map(function(_,i){
        return arrays.map(function(array){return array[i]})
    });
}

// helper functions
function allCompareEqual(array) {
    // e.g.  allCompareEqual([2,2,2,2]) --> true
    // does not work with nested arrays or objects
    return array.every(function(x){return x==array[0]});
}

function isArray(x){ return type(x)==type([]) }
function getLength(x){ return x.length }
function allTrue(array){ return array.reduce(function(a,b){return a&&b},true) }
// e.g. allTrue([true,true,true,true]) --> true
// or just array.every(function(x){return x});

function allDeepEqual(things) {
    // works with nested arrays
    if( things.every(isArray) )
        return allCompareEqual(things.map(getLength))     // all arrays of same length
            && allTrue(zip(things).map(allDeepEqual)); // elements recursively equal

    else
        return allCompareEqual(things);
}

/**
 * Element-wise comparison of subarrays
 * @param array an array of form [[int, int], ...]
 * @param subarray of form [int, int]
 * @returns {boolean}
 */
function containsSubarray(array, subarray) {
    for (const element of array) {
        if (allDeepEqual([element, subarray])) {
            return true;
        }
    }
    return false;
}






/**
 * Get a list of available cells from the current position.
 * @param currentCell [x, y] of current cell
 * @param rowCount number of rows in the table
 * @param columnCount number of columns in the table
 */
function availableCells(currentCell, rowCount, columnCount) {
    // if not currently on a cell, all cells are available
    if (currentCell === null) {
        let allCells = [];

        for (let i=0; i<rowCount; i++) {
            for (let j=0; j<columnCount; j++) {
                allCells.push([i, j]);
            }
        }

        return allCells;
    } else {
        let neighbouringCells = [];

        for (let i=-1; i<=1; i++) {
            for (let j=-1; j<=1; j++) {
                let x = currentCell[0] + i;
                let y = currentCell[1] + j;

                if (x < 0 || y < 0) { continue; }  // can't go out of bounds
                if (i === 0 && j === 0) { continue; }  // can't visit same cell
                if (x >= rowCount || y >= columnCount) { continue; }  // can't go out of bounds

                neighbouringCells.push([x, y]);
            }
        }

        return neighbouringCells;
    }
}

/**
 * Return a list of coordinates of the word within the
 * letterGrid game board.
 * @param word
 * @type word string
 * @param letterGrid
 */
function solve(word, letterGrid) {
    let rowCount = letterGrid.length;
    let columnCount = letterGrid.length;

    let currentCell = null;
    let visitedCells = [];

    return solveStep(word, currentCell, visitedCells, letterGrid, rowCount, columnCount);
}

function solveStep(word, currentCell, visitedCells, letterGrid, rowCount, columnCount) {
    console.log(word);

    if (word.length === 0) {
        return visitedCells;
    }

    for (const cell of availableCells(currentCell, rowCount, columnCount)) {
        if (containsSubarray(visitedCells, cell)) {
            console.log(`rejected already visited cell:`)
            console.log(visitedCells)
            console.log(cell);
            continue;
        }

        let availableLetter = letterGrid[cell[0]][cell[1]];

        // this is a step in the right direction, advance to next letter
        if (word.startsWith(availableLetter)) {
            visitedCells.push(cell);
            console.log(visitedCells)
            let response = solveStep(word.slice(availableLetter.length, word.length), cell, visitedCells, letterGrid, rowCount, columnCount);

            if (response == null) {
                // we went down a dead end
                visitedCells.pop();
            } else {
                // has been solved
                return response;
            }
        }
    }
    return null;  // no cell was available
}


const letters = [
    ["A", "B", "C", "D"],
    ["E", "F", "G", "H"],
    ["I", "J", "K", "L"],
    ["M", "N", "O", "P"],
]

console.log(solve("NJKPOLHG", letters));