<template>
  <section>
    <h1>Feeds</h1>
    <center>Available formats:</center>
    <center>
      <p>
        <a
          href="/feed/rss"
          target="_blank">RSS</a> /
        <a
          href="/feed/atom"
          target="_blank">Atom</a> /
        <a
          href="/feed/json"
          target="_blank">JSON</a>
      </p>
    </center>
  </section>
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

<style>
h1 {
  font-size: 2rem;
  margin: 1em 0;
  text-align: center;
  text-transform: capitalize;
}
</style>
