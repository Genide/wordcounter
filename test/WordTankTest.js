import {expect} from 'chai';
import WordTank from '../src/WordTank.js';

describe("WordTank", function () {
    describe("Instance creation", function () {
        it("No specified word array", function () {
            var wordTank = new WordTank();
            expect(wordTank.index).to.deep.eq({});
        })

        it("Empty array", function () {
            var wordTank = new WordTank([]);
            expect(wordTank.index).to.deep.eq({});
        })

        it("Word array specified", function () {
            var wordTank = new WordTank(["hello"]);
            expect(wordTank.index).to.deep.eq({ "hello": 1 });
        })

        it("Invalid object inside word array", function () {
            var fn = () => { new WordTank([{ foo: "bar" }, "hello"]); }
            expect(fn).to.throw(TypeError);
        })

        it("Invalid parameter", function () {
            var fn = () => { new WordTank({ foo: "bar" }); }
            expect(fn).to.throw(TypeError);
        })
    })

    describe("indexWord", function () {
        var wordTank;
        before("Create word tank instance", function () {
            wordTank = new WordTank();
        })

        it("Index valid word", function () {
            wordTank.indexWord("hello");
            expect(wordTank.index).to.deep.eq({ "hello": 1 });
        })

        it("Index invalid word", function () {
            var fn = () => { wordTank.indexWord(12345678); };
            expect(fn).to.throw(TypeError);
        })

        it('Index empty string', function () {
            var fn = () => { wordTank.indexWord(""); };
            expect(fn).to.throw(Error);
        })

        it('Index existing word again', function () {
            wordTank.indexWord("hello");
            expect(wordTank.index).to.deep.eq({ "hello": 2 });
        })
    })

    describe("getWordCount", function () {
        var wordTank;
        before("Create word tank instance", function () {
            wordTank = new WordTank(["hello", "world"]);
        })

        it('Get valid word', function () {
            expect(wordTank.getWordCount("hello")).to.eq(1);
        })

        it('Get missing word', function () {
            expect(wordTank.getWordCount("foo")).to.eq(0);
        })

        it('Invalid parameter', function () {
            expect(wordTank.getWordCount({})).to.eq(0);
        })
    })

    describe("clearWord", function () {
        var wordTank;
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

        it("Index invalid word", function () {
            var fn = () => { wordTank.clearWord(12345678); };
            expect(fn).to.throw(TypeError);
        })

        it('Index empty string', function () {
            var fn = () => { wordTank.clearWord(""); };
            expect(fn).to.throw(Error);
        })
    })
})