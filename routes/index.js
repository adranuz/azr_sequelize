const express = require('express')
const app = express()
const postRoutes = require('./posts')
const userRoutes = require('./users')
const addressRoutes = require('./addresses')

app.use('/posts', postRoutes)
app.use('/users', userRoutes)
app.use('/addresses', addressRoutes)

module.exports = app;