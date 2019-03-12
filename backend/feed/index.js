import Post from '../models/post'
import express from 'express'
import feedGenerator from './generator'

const router = express.Router()

router.get('/rss', (request, response) => {
  Post.find().exec().then((posts) => {
    response.status(200).send(feedGenerator(posts).rss2())
  }).catch((e) => {
    response.status(e.status || 500).send('Error', e)
  })
})

router.get('/atom', (request, response) => {
  Post.find().exec().then((posts) => {
    response.status(200).send(feedGenerator(posts).atom1())
  }).catch((e) => {
    response.status(e.status || 500).send('Error')
  })
})

router.get('/json', (request, response) => {
  Post.find().exec().then((posts) => {
    response.status(200).send(feedGenerator(posts).json1())
  }).catch((e) => {
    response.status(e.status || 500).send('Error')
  })
})

export default router
