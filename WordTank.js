class WordTank {
    constructor(wordArray) {
        this.index = {};
        if (Array.isArray(wordArray)) {
            wordArray.forEach(this.indexWord, this);
        }
    }

    getWordCount(word) {
        if (typeof word === "string" && word){
            return this.index[word] || 0;
        } else {
            return 0;
        }
    }

    indexWord(word) {
        if (typeof (word) !== "string") return;
        if (word) {
            var count = this.index[word] || 0;
            this.index[word] = count + 1;
        }
    }
}

module.exports = WordTank;