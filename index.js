const fs = require("fs");
const http = require("http")

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
const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if (!product.organic) {
        console.log("Hello");
        output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    }
    return output;
}


// Http Server
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`).toString();
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`).toString();
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`).toString();
const dataObj = JSON.parse(data);

// console.log(templateCard);

const server = http.createServer((req, res) => {
    const { url } = req;
    // console.log(url);
    if (url === "/" || url === "/overview") {
        res.writeHead(200, { "Content-type": "text/html" });
        const cardHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join("");
        const output = templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardHtml);
        res.end(output)

    } else if (url === "/product") {
        res.end("This is product Page")
    } else if (url === "/api") {
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
// console.log(server);