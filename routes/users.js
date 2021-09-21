const express = require('express')

const User = require('../database/models/User')
const Address = require('../database/models/Address')
const Post = require('../database/models/Post')

const router = express.Router()

// metodo magico de sequelize
// ver difeccion de usuario  /api/users/:id/domicilio
router.get('/:id/domicilio', async (req, res) => {
  const result = await User.findByPk(req.params.id)
  const domicilio = await result.getDomicilio({
    inlcude: {
      attributes: ['title', 'body']
    }
  })
  res.json({
    msg: 'domicilio is got',
    domicilio: domicilio,
  })
})
// sirven para obtener datos de las asociaciones
// ver difeccion de usuario  /api/users/:id/domicilio
router.get('/:id/posts', async (req, res) => {
  const result = await User.findByPk(req.params.id)
  const posts = await result.getPublications()
  res.json({
    msg: 'domicilio is got',
    posts: posts,
  })
})

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
      },
      {
        model: Post,
        as: 'publications',
        attributes: ['title', 'body'],
      }
    ]
  })
  res.json({
    msg: 'its working',
    data: result,
  })
})

router.post('/', async (req, res) => {
  const { name, age, role, email, street } = req.body
  try {
    /* // user and address
    const user = await User.create({
      name, age, role, email,
      domicilio: { 
        street 
      }
    }, {
      include: 'domicilio',
    })
    */

    /* // user and then address
    */
    let user = await User.create({name,age,role,email})
    const address = await Address.create({street})
    user = await user.setDomicilio(address)

    /* // user and then address
    let user = await User.build({ name, age, role, email })
    user = await user.setDomicilio(street)
    */

    res.json({
      msg: "user created",
      data: user,
    })
  } catch (error) {
    res.json({
      message: error.message,
      type: error.type
    })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  
  // hook para que antes de destruir el usuario haga algo
  const user = await User.beforeDestroy(async user => { 
    // elimina el addres
    await Address.destroy({
      where: {
        residentId: user.id
      }
    })
  })
  res.json({
    msg: 'has been deleted successfully',
    destroyed: user,
  })
})

module.exports = router;