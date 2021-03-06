
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
    return array.every(function(x){return x===array[0]});
}

function isArray(x){ return type(x)===type([]) }
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
export function containsSubarray(array, subarray) {
    if (!isArray(array)) {return false;}

    for (const element of array) {
        if (allDeepEqual([element, subarray])) {
            return true;
        }
    }
    return false;
}


/**
 * Return a random element chosen from an array
 * @param array
 * @param pop if the element should be removed from the array, or just returned.
 * @return an element from the array
 */
export function randomChoice(array, pop=false) {
    const index = Math.floor(Math.random() * array.length);
    const randomElement = array[index];

    if (pop) {
        array.splice(index, 1);
    }

    return randomElement;
}