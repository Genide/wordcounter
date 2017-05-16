"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WordTank = (function () {
    function WordTank(wordArray) {
        this._index = {};
        if (wordArray !== undefined) {
            wordArray.forEach(this.indexWord, this);
        }
    }
    WordTank.prototype.getWordCount = function (word) {
        return this._index[word] || 0;
    };
    WordTank.prototype.indexWord = function (word) {
        if (word) {
            this._index[word] = this._index[word] || 0 + 1;
        }
        else {
            throw new Error("Empty string cannot be specified.");
        }
    };
    WordTank.prototype.clearWord = function (word) {
        if (word) {
            delete this._index[word];
        }
        else {
            throw new Error("Empty string cannot be specified.");
        }
    };
    return WordTank;
}());
exports.default = WordTank;

//# sourceMappingURL=maps/WordTank.js.map
