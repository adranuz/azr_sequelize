const express = require('express')
const router = express.Router()
const Post = require('../database/models/Post')
const User = require('../database/models/User')

router.get('/', async (req, res) => {
  const result = await Post.findAll({
    attributes: ['title', 'body'],
    include: {
      model: User,
      as: 'author',
      attributes: ['name']
    }
  })
  res.json({
    msg: 'post list',
    data: result,
  })
})

router.post('/', async (req, res) => {
  const { title, body } = req.body
  const result = await Post.create({
    title,
    body
  })
  res.json({
    msg: "post created",
    data: result,
  })
})

router.get('/:id', async (req, res) => {
  const result = await Post.findByPk(req.params.id)
  res.json({
    msg: "post selected",
    data: result,
  })
})

router.patch('/:id', async (req, res) => {
  const { title, body } = req.body
  const result = await Post.update({
    title,
    body
  }, {
    where: {
      id: req.params.id
    }
  })
  res.json({
    msg: "post updated",
    data: result,
  })
})

router.delete('/:id', async (req, res) => {
  const result = await Post.destroy({
    where: {
      id: req.params.id
    }
  })
  res.json({
    msg: "post deleted",
    data: result,
  })
})

module.exports = router;