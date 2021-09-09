var express = require('express');
var app = express();
const cors = require('cors')
const sequelize = require('./database/db')

//  Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

// settings
const PORT = process.env.PORT || 3000

// GET method route
app.get('/', function (req, res) {
  
});

// POST method route
app.post('/', function (req, res) {
  User.create({
    name: "adrian",
    birthdate: new Date()
  }).then(user => res.json(user))
})

app.listen(PORT, () => {
  console.log("port " + PORT)
  sequelize.sync({forse: false})
    .then(() => console.log('DB connected'))
    .catch(error => console.log(error))
})