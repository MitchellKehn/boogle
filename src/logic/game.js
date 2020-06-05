/**
 * Get the score of a word in boogle.
 * @param word
 */
export function getScore(word) {
    return Math.max(word.length - 2, 0);
}