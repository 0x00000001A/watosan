import { Feed } from 'feed'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  silent: true,
  path: path.resolve(__dirname, '..', '..', '.env')
})

export default function generateFeed (posts) {
  const feed = new Feed({
    title: `${process.env.NAME} feed`,
    description: process.env.NAME,
    id: process.env.BASE_URL,
    link: process.env.BASE_URL,
    image: 'http://example.com/image.png',
    favicon: 'http://example.com/favicon.ico',
    generator: `Feed for ${process.env.NAME}`,
    feedLinks: {
      rss: `${process.env.BASE_URL}/feed/rss`,
      json: `${process.env.BASE_URL}/feed/json`,
      atom: `${process.env.BASE_URL}/feed/atom`
    },
    author: {
      name: process.env.AUTHOR_NAME,
      email: process.env.AUTHOR_EMAIL,
      link: process.env.BASE_URL
    }
  })

  posts.forEach(post => {
    feed.addItem({
      title: post.title,
      id: post.id,
      link: process.env.BASE_URL + '/posts/' + post.slug,
      description: post.description,
      content: post.short,
      date: post.date,
      image: post.image
    })
  })

  return feed
}
