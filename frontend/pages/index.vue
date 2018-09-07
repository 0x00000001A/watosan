<template>
  <div>
    <blog-loading :loading="$apollo.loading"/>
    <blog-post
      v-for="post in posts"
      :data="post"
      :key="post.id"/>
      <!-- Coming soon -->
      <!-- <div class="content__pagination" v-if="posts && posts.length">
    <div class="pagination">
      <nuxt-link class="pagination__link" to="/">&larr; Older</nuxt-link>
      <div class="pagination__links"></div>
      <nuxt-link class="pagination__link" to="/">Newer &rarr;</nuxt-link>
    </div>
  </div> -->
  </div>
</template>

<script>
import graphql from '~/graphql'
import BlogPost from '~/components/BlogPost'
import BlogLoading from '~/components/BlogLoading'

export default {
  components: {
    BlogPost,
    BlogLoading
  },

  apollo: {
    posts: {
      prefetch: true,
      query: graphql.post.getAll
    }
  }
}
</script>
