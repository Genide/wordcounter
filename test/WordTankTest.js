const chai = require("chai");
const expect = chai.expect;
const WordTank = require("../WordTank.js");

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

        it("Word array specified", () => {
            var wordTank = new WordTank(["hello"]);
            expect(wordTank.index).to.deep.eq({ "hello": 1 });
        })

        it("Invalid object inside word array", () => {
            var wordTank = new WordTank([{ foo: "bar" }, "hello"]);
            expect(wordTank.index).to.deep.eq({ "hello": 1 });
        })

        it("Invalid parameter", () => {
            var wordTank = new WordTank({ foo: "bar" });
            expect(wordTank.index).to.deep.eq({});
        })
    })

    describe("indexWord", function () {
        var wordTank;
        before("Create word tank instance", () => {
            wordTank = new WordTank();
        })

        it("Index valid word", () => {
            wordTank.indexWord("hello");
            expect(wordTank.index).to.deep.eq({ "hello": 1 });
        })

        it("Index invalid word", () => {
            wordTank.indexWord(12345678);
            expect(wordTank.index).to.deep.eq({ "hello": 1 });
        })

        it('Index empty string', () => {
            wordTank.indexWord("");
            expect(wordTank.index).to.deep.eq({ "hello": 1 });
        })

        it('Index existing word again', () => {
            wordTank.indexWord("hello");
            expect(wordTank.index).to.deep.eq({ "hello": 2 });
        })
    })

    describe("getWordCount", () => {
        var wordTank;
        before("Create word tank instance", () => {
            wordTank = new WordTank(["hello", "world"]);
        })

        it('Get valid word', () => {
            expect(wordTank.getWordCount("hello")).to.eq(1);
        })

        it('Get missing word', () => {
            expect(wordTank.getWordCount("foo")).to.eq(0);
        })

        it('Invalid parameter', () => {
            expect(wordTank.getWordCount({})).to.eq(0);
        })
    })
})