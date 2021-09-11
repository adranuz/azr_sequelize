const express = require('express')
const router = express.Router()
const User = require('../database/models/User')
const Address = require('../database/models/Address')
const Post = require('../database/models/Post')


router.get('/', async (req, res) => {
  const result = await User.findAll({
    // data que queremos mostrar de la request
    attributes: ['name', 'age'],
    // inlcuir data de otras tablas asociadas
    include: [
      {
        model: Address, // trae del modelo
        as: 'domicilio', // renombra la cabecera de la data
        attributes: ['street']
      }, {

      }
    ]
  })
  res.json({
    msg: 'its working',
    data: result,
  })
})

router.post('/', async (req, res) => {
  const { name, age, role, email } = req.body
  try {
    const result = await User.create({
      name, age, role, email
    })
    res.json({
      msg: "post created",
      data: result,
    })
  } catch (error) {
    res.json({
      message: error.message,
      type: error.type
    })
  }
})


module.exports = router;