<template>
  <div>
    <blog-loading :loading="$apollo.loading"/>
    <blog-post
      v-if="post"
      :data="post"/>
  </div>
</template>

<script>
import graphql from '~/graphql'
import BlogPost from '~/components/BlogPost'
import BlogLoading from '~/components/BlogLoading'

export default {
  head () {
    const post = this.post && this.post.title ? this.post : {}

    return {
      title: post.title,
      meta: [
        { hid: 'og:url', property: 'og:url', content: 'http://watosan.org/' + post.slug },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: post.title },
        { hid: 'og:image', property: 'og:image', content: post.image },
        { hid: 'article:author', property: 'article:author', content: 'http://facebook.com/montagueblaise' },
        { hid: 'article:published_time', property: 'article:published_time', content: post.date },
        { hid: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', content: post.title },
        { hid: 'twitter:image', content: post.image },
        { hid: 'twitter:description', content: post.short ? post.short.substring(0, 200) : '' }
      ]
    }
  },
  components: {
    BlogPost,
    BlogLoading
  },
  validate ({ params }) {
    return /^[a-z0-9-]+$/i.test(params.slug)
  },
  props: {
    slug: {
      type: String,
      default: null
    }
  },
  apollo: {
    post: {
      query: graphql.post.get,
      prefetch: ({ route }) => {
        return { slug: route.params.slug }
      },
      variables () {
        return { slug: this.$route.params.slug }
      },
      update (data) {
        return data.post
      }
    }
  }
}
</script>
