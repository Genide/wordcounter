interface IWordIndex {
    [index: string]: number;
}

/**
 * WordTank class
 * @class WordTank
 */
class WordTank {
    private _index: IWordIndex = {};

    /**
     * Creates an instance of WordTank
     * @param wordArray Array of strings to index
     */
    constructor(wordArray?: string[]) {
        if (wordArray !== undefined) {
            wordArray.forEach(this.indexWord, this);
        }
    }

    /**
     * Get the number of times a word is indexed
     * @param word The word to find
     */
    public getWordCount(word: string): number {
        return this._index[word] || 0;
    }

    /**
     * Indexes a word
     * @param word Word to index
     */
    public indexWord(word: string) {
        if (word) {
            this._index[word] = this._index[word] || 0 + 1;
        } else {
            throw new Error("Empty string cannot be specified.");
        }
    }

    /**
     * Clears the index of the word
     * @param word Word to remove from the index
     */
    public clearWord(word: string) {
        if (word) {
            delete this._index[word];
        } else {
            throw new Error("Empty string cannot be specified.");
        }
    }
}

export default WordTank;
