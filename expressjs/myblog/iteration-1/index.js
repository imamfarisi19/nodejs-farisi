const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs')
const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('public'))

app.listen(3000, () => {
    console.log("App listening on port 3000")
})

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'about.html'))
})

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'contact.html'))
})

const homePage = fs.readFileSync('index.html')
const aboutPage = fs.readFileSync('about.html')
const contactPage = fs.readFileSync('contact.html')
const notFoundPage = fs.readFileSync('notfound.html')




// const server = http.createServer((req, res) => {
//     if (req.url === '/about')
//         res.end(aboutPage)
//     else if (req.url === '/contact')
//         res.end(contactPage)
//     else if (req.url === '/')
//         res.end(homePage)
//     else {
//         res.writeHead(404)
//         res.end(notFoundPage)
//     }
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });