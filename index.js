const fs = require("fs");

// const inputText = fs.readFileSync('./txt/input.txt', 'utf-8');
// // console.log(inputText);
// // console.log(typeof inputText);

// const outputText = `the is read from input.txt file: ${inputText}\nand Write it...`
// fs.writeFileSync("./txt/output.txt", outputText)
// console.log("Text Written");

fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
    fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
        fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
            fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, "utf-8", err => {
                console.log(err);
            })
        });
    });
});
console.log("will Output The Data");
// 1st output this and second file data

