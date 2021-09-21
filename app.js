var express = require('express');
var app = express();
const cors = require('cors')
const sequelize = require('./database/db');
const routes = require('./routes');
require('./database/associations')

//  Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

// settings
const PORT = process.env.PORT || 3000

// routes
app.use('/api', routes)

app.listen(PORT, () => {
  console.log("port " + PORT)
  sequelize.sync({
    force: false,
    logging: false
  })
    .then(() => console.log('DB connected'))
    .catch(error => console.log(error))
})