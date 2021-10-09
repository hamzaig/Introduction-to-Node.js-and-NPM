const fs = require("fs");

const inputText = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(inputText);
// console.log(typeof inputText);

const outputText = `the is read from input.txt file: ${inputText}\nand Write it...`
fs.writeFileSync("./txt/output.txt", outputText)
console.log("Text Written");