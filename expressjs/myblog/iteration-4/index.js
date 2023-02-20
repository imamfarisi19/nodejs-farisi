const express = require('express')
const mongoose = require('mongoose')
const hostname = '127.0.0.1';
const port = 3000;
const app = new express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const validateMiddleWare = require('./middleware/validationMiddleware')
const expressSession = require('express-session')
const authMiddleware = require("./middleware/authMIddleware")
const ifAuthenticatedMIddleware = require("./middleware/ifAuthenticatedMiddleware")
const flash = require('connect-flash')

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/my_database', { useNewUrlParser: true });
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.use(expressSession({ secret: 'keyboard cat' }))
app.use('/posts/store', validateMiddleWare)
app.use(flash())
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
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')
const homeController = require('./controllers/home')
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')

app.get('/auth/register', ifAuthenticatedMIddleware, newUserController)
app.post('/users/register', ifAuthenticatedMIddleware, StoreUserController)
app.get('/auth/login', ifAuthenticatedMIddleware, loginController)
app.post('/users/login', ifAuthenticatedMIddleware, loginUserController)
app.get('/auth/logout', logoutController)
app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/posts/new', authMiddleware, newPostController)
app.post('/posts/store', authMiddleware, storePostController)

app.use((req, res) => res.render('notfound'))