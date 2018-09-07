<template>
  <div>
    <blog-loading :loading="$apollo.loading"/>
    <blog-post
      v-for="post in postsByTag"
      :data="post"
      :key="post.id"/>
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
  props: {
    slug: {
      type: String,
      default: null
    }
  },
  apollo: {
    postsByTag: {
      query: graphql.post.getByTag,
      prefetch: ({ route }) => {
        return { tag: route.params.tag }
      },
      variables () {
        return { tag: this.$route.params.tag }
      },
      update (data) {
        return data.postsByTag
      }
    }
  }
}
</script>
