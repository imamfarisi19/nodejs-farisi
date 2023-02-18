const express = require('express')
const mongoose = require('mongoose')
const hostname = '127.0.0.1';
const port = 3000;
const app = new express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const validateMiddleware = require("./middleware/validationMiddleware")
const expressSession = require('express-session')
const authMiddleware = require("./middleware/authMIddleware")
const ifAuthenticatedMIddleware = require("./middleware/ifAuthenticatedMiddleware")

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/my_database', { useNewUrlParser: true });
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.use(expressSession({ secret: 'keyboard cat' }))
app.set('view engine', 'ejs')

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})

const newUserController = require('./controllers/newUser')
const StoreUserController = require('./controllers/StoreUser');
app.get('/auth/register', ifAuthenticatedMIddleware, newUserController)
app.post('/users/register', ifAuthenticatedMIddleware, StoreUserController)

const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
app.get('/auth/login', ifAuthenticatedMIddleware, loginController)
app.post('/users/login', ifAuthenticatedMIddleware, loginUserController)

const logoutController = require('./controllers/logout')
app.get('/auth/logout', logoutController)

const homeController = require('./controllers/home')
app.get('/', homeController)

const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
app.get('/post/:id', getPostController)
app.get('/posts/new', authMiddleware, newPostController)
app.post('/posts/store', authMiddleware, storePostController)

app.use((req, res) => res.render('notfound'))