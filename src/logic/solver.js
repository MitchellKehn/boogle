/**
 * Get a list of available cells from the current position.
 * @param currentCell [x, y] of current cell
 * @param rowCount number of rows in the table
 * @param columnCount number of columns in the table
 */
import {containsSubarray} from "./arrayUtils";

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
export function solve(word, letterGrid) {
    let rowCount = letterGrid.length;
    let columnCount = letterGrid.length;

    let currentCell = null;
    let visitedCells = [];

    return solveStep(word.toUpperCase(), currentCell, visitedCells, letterGrid, rowCount, columnCount);
}

function solveStep(word, currentCell, visitedCells, letterGrid, rowCount, columnCount) {

    if (word.length === 0) {
        return visitedCells;
    }

    for (const cell of availableCells(currentCell, rowCount, columnCount)) {
        if (containsSubarray(visitedCells, cell)) {
            continue;
        }

        let availableLetter = letterGrid[cell[0]][cell[1]].toUpperCase();

        // this is a step in the right direction, advance to next letter
        if (word.startsWith(availableLetter)) {
            visitedCells.push(cell);
            let response = solveStep(word.slice(availableLetter.length, word.length), cell, visitedCells, letterGrid, rowCount, columnCount);

            if (response === null) {
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
