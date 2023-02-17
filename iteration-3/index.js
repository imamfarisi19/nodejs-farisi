const express = require('express')
const mongoose = require('mongoose')
const hostname = '127.0.0.1';
const port = 3000;
const app = new express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const validateMiddleware = require("./middleware/validationMiddleware")

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/my_database', { useNewUrlParser: true });

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.set('view engine', 'ejs')


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const homeController = require('./controllers/home')
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')

app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/posts/new', newPo