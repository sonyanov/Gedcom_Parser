const { expect } = require('@jest/globals')
const fs = require("fs")
const parser = require('./parser')

let file1 = fs.readFileSync("./test/First.ged", "utf8")
let file2 = fs.readFileSync("./test/Second.ged", "utf8")
let file3 = fs.readFileSync("./test/Third.ged", "utf8")

let answer1 = fs.readFileSync("./test/FOut.xml", "utf8")
let answer2 = fs.readFileSync("./test/SOut.xml", "utf8")
let answer3 = fs.readFileSync("./test/TOut.xml", "utf8")

test('First test(value)', () => {
	expect(parser(file1) === answer1)
})

test('Second test(level)', () => {
	expect(parser(file2) === answer2)
})

test('Third test(id)', () => {
	expect(parser(file3) === answer3)
})