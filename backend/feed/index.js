import Post from '../models/post'
import express from 'express'
import feedGenerator from './generator'

const router = express.Router()

router.get('/rss', (request, response) => {
  Post.find().exec().then((posts) => {
    response.send(feedGenerator(posts).rss2())
  }).catch(() => {
    response.send('Error')
  })
})

router.get('/atom', (request, response) => {
  Post.find().exec().then((posts) => {
    response.send(feedGenerator(posts).atom1())
  }).catch((e) => {
    response.send('Error')
  })
})

router.get('/json', (request, response) => {
  Post.find().exec().then((posts) => {
    response.send(feedGenerator(posts).json1())
  }).catch(() => {
    response.send('Error')
  })
})

export default router
