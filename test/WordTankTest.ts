import {expect} from 'chai';
import WordTank from '../src/WordTank';

describe("WordTank", function () {
    describe("indexWord", function () {
        var wordTank: WordTank;
        before("Create word tank instance", function () {
            wordTank = new WordTank();
        })

        it('Index empty string', function () {
            var fn = () => { wordTank.indexWord(""); };
            expect(fn).to.throw(Error);
        })
    })

    describe("getWordCount", function () {
        var wordTank: WordTank;
        before("Create word tank instance", function () {
            wordTank = new WordTank(["hello", "world"]);
        })

        it('Get valid word', function () {
            expect(wordTank.getWordCount("hello")).to.eq(1);
        })

        it('Get missing word', function () {
            expect(wordTank.getWordCount("foo")).to.eq(0);
        })
    })

    describe("clearWord", function () {
        var wordTank: WordTank;
        before("Create word tank instance", function () {
            wordTank = new WordTank(["hello", "hello"]);
        })

        it('Clear valid word', function () {
            wordTank.clearWord("hello");
            expect(wordTank.getWordCount("hello")).to.eq(0);
        })

        it('Add back the same valid word', function () {
            wordTank.indexWord("hello")
            expect(wordTank.getWordCount("hello")).to.eq(1);
        })

        it('Index empty string', function () {
            var fn = () => { wordTank.clearWord(""); };
            expect(fn).to.throw(Error);
        })
    })
})