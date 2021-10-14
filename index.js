const fs = require("fs");
const http = require("http")
const url = require("url")
const replaceTemplate = require("./modules.js/replaceTemplete");
//////////////////////////////////////////////
// Files

// const inputText = fs.readFileSync('./txt/input.txt', 'utf-8');
// // console.log(inputText);
// // console.log(typeof inputText);

// const outputText = `the is read from input.txt file: ${inputText}\nand Write it...`
// fs.writeFileSync("./txt/output.txt", outputText)
// console.log("Text Written");

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//         fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//             fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, "utf-8", err => {
//                 console.log(err);
//             })
//         });
//     });
// });
// console.log("will Output The Data");
// 1st output this and second file data

/////////////////////////////////////////////////////////

// Http Server
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`).toString();
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`).toString();
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`).toString();
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true);
    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, { "Content-type": "text/html" });
        const cardHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join("");
        const output = templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardHtml);
        res.end(output)

    } else if (pathname === "/product") {
        res.writeHead(200, { "Content-type": "text/html" });
        const product = dataObj[query.id]
        const output = replaceTemplate(templateProduct, product);
        res.end(output)
    } else if (pathname === "/api") {
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(data);
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "MyHeader": "Hamzaig"
        });
        res.end("<h1>Page Not Found</h1>");
    }
})


server.listen(8000, "localhost", () => {
    console.log("Listing to requests on port 8000");
})