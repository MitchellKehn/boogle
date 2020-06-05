const headers = {
    "x-rapidapi-key": "e2b2a2bcc2msh8c0763ccc9b20cep143af8jsn692df1da5f43",
    "x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
}

/**
 * Get info about a word from the WordsAPI
 * @param word
 * @returns {Promise<unknown>}
 */
// function getWordInfo(word) {
//     return new Promise(async (resolve, reject) => {
//         const response = fetch("https://wordsapiv1.p.rapidapi.com/words/" + word, {
//             "method": "GET",
//             "headers": headers
//         });
//         const values = await response.json();
//         resolve(values)
//     })
// }

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function getWordInfo(word) {
    return new Promise(async (resolve, reject) => {
        await sleep(1500);
        let values = {
            "word": "fart",
            "results": [
                {
                    "definition": "a reflex that expels intestinal gas through the anus",
                    "partOfSpeech": "noun",
                    "synonyms": [
                        "breaking wind",
                        "farting",
                        "flatus",
                        "wind"
                    ],
                    "typeOf": [
                        "inborn reflex",
                        "innate reflex",
                        "instinctive reflex",
                        "physiological reaction",
                        "reflex",
                        "reflex action",
                        "reflex response",
                        "unconditioned reflex"
                    ]
                },
                {
                    "definition": "expel intestinal gases through the anus",
                    "partOfSpeech": "verb",
                    "synonyms": [
                        "break wind"
                    ],
                    "typeOf": [
                        "act involuntarily",
                        "act reflexively"
                    ],
                    "derivation": [
                        "farting"
                    ]
                }
            ],
            "syllables": {
                "count": 1,
                "list": [
                    "fart"
                ]
            },
            "pronunciation": {
                "all": "fɑrt"
            },
            "frequency": 3.99
        }
        resolve(values);
    })
}
