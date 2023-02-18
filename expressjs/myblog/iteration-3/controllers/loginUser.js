const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) => {
    const { username, password } = req.body

    User.findOne({ username: username }, (error, user) => {
        if (same) {
            res.redirect('/')
        } else {
            res.redirect('/auth/login')
        }
    })
}