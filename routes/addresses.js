const express = require('express')
const router = express.Router()
const Address = require('../database/models/Address')
const User = require('../database/models/User')

router.get('/', async (req, res) => {
  const result = await Address.findAll({
    // incluye la data de la tabla vinculada
    inlcude: {
      model: User,
      as: 'residente', // cabecera para los atributos
      attributes: ['name', 'age']
    }
  })
  res.json({
    msg: 'post list',
    data: result,
  })
})

module.exports = router