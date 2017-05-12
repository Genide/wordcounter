var __isStringArr = function(strArr) {
    if (!Array.isArray(strArr)) return false;
    strArr.forEach(function (val) {
        if (typeof val !== "string") return false;
    })
    return true;
}

/**
 * WordTank class
 * 
 * @class WordTank
 */     
class WordTank {
    /**
     * Creates an instance of WordTank.
     * @param {string[]} [wordArray] Array of strings to index
     * 
     * @memberOf WordTank
     */
    constructor(wordArray) {
        this.index = {};
        if (typeof wordArray === "undefined") return;
        if (__isStringArr(wordArray)) {
            wordArray.forEach(this.indexWord, this);
        } else {
            throw new TypeError("Expected string[]");
        }
    }

    /**
     * Gets the amount of times a word has been indexed
     * 
     * @param {string} word The word to find
     * @returns {number} The count of how many times a word has been indexed
     * 
     * @memberOf WordTank
     */
    getWordCount(word) {
        if (typeof word === "string" && word) {
            return this.index[word] || 0;
        } else {
            return 0;
        }
    }

    /**
     * Indexes a word
     * 
     * @param {string} word Word to index
     * @return {void}
     * @memberOf WordTank
     */
    indexWord(word) {
        if (typeof (word) === "string") {
            if (word) {
                var count = this.index[word] || 0;
                this.index[word] = count + 1;
            } else {
                throw new Error("Empty string passed in");
            }
        } else {
            throw new TypeError(word.toString() + " is not of type string");
        }
    }
}

module.exports = WordTank;