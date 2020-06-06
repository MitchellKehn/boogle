/**
 * Get the score of a word in boogle.
 * @param word
 */
export function getScore(word) {
    return Math.max(word.length - 2, 0);
}

export class Word {
    constructor(word) {
        this.text = word;
        this.enabled = true;
    }
}