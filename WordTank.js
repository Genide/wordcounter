var __isStringArr = function(strArr) {
    if (!Array.isArray(strArr)) return false;
    strArr.forEach(function (val) {
        if (typeof val !== "string") return false;
    })
    return true;
}

class WordTank {
    constructor(wordArray) {
        this.index = {};
        if (typeof wordArray === "undefined") return;
        if (__isStringArr(wordArray)) {
            wordArray.forEach(this.indexWord, this);
        } else {
            throw new TypeError("Expected string[]");
        }
    }

    getWordCount(word) {
        if (typeof word === "string" && word) {
            return this.index[word] || 0;
        } else {
            return 0;
        }
    }

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