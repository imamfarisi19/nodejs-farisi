const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSChema = new Schema({
    username: String,
    password: String
})

// export model
const User = mongoose.model('User', UserSChema)
module.exports = User