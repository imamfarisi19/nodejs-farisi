const User = require('../models/User')
const path = require('path')
const flash = require('connect-flash')

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            console.log(error)
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.flash('validationErrors', validationErrors)
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}