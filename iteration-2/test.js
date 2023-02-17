mongoose.set('strictQuery', true);
const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/my_database', { useNewUrlParser: true });

var id = "63ebdf7fd2647da5c9c9cb8d";
BlogPost.findByIdAndDelete(id, (error, blogspot) => {
    console.log(error, blogspot)
})

// BlogPost.findByIdAndUpdate(id, {
//     title: 'Update title'
// }, (error, blogspot) => {
//     console.log(error, blogspot)
// })

// BlogPost.create({
//     title: 'The Mythbuster’s Guide to Saving Money on Energy Bills',
//     body: `If you have been here a long time, you might remember when I went on ITV Tonight to
//     dispense a masterclass in saving money on energy bills.Energy - saving is one of my favourite money
//     topics,
//     because once youget past the boring bullet - point lists,
//     a whole new world of thrifty nerdery
//     opens up.You know those bullet - point lists.You start spotting them everything at this time of year.
//     They go like this: `
// }, (error, blogpost) => {
//     console.log(error, blogpost)
// })