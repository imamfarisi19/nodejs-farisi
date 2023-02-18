const hostname = '127.0.0.1';
const port = 3000;
const express = require('express')
const path = require('path')
const app = new express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const BlogPost = require('./models/BlogPost.js')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.set('view engine', 'ejs')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/my_database', { useNewUrlParser: true });



app.get('/', async(req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    });
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    res.render('contact');
})

app.get('/post/:id', async(req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', async(req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/img', image.name),
        async(error) => {
            await BlogPost.create({
                ...req.body,
                image: '/img/' + image.name
            })
            res.redirect('/')
        })
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});