<template>
  <div>
    <blog-loading :loading="$apollo.loading"/>
    <table
      border="1"
      class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Tags</th>
          <th>Date</th>
          <th/>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="post in posts"
          :key="post.id">
          <td>{{ post.title }}</td>
          <td>{{ post.tags }}</td>
          <td>{{ post.date }}</td>
          <td>
            <nuxt-link
              :to="'/posts/' + post.slug"
              target="_blank">View</nuxt-link> /
            <router-link :to="'/manage/posts/update/' + post.id">
              Edit
            </router-link> /
            <a
              href
              @click.prevent="removePost(post.id)">
              Delete
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import graphql from '~/graphql'
import BlogLoading from '~/components/BlogLoading'

export default {
  middleware: ['auth'],
  components: {
    BlogLoading
  },
  apollo: {
    posts: {
      prefetch: true,
      query: graphql.post.getAll
    }
  },
  methods: {
    async removePost (id) {
      if (confirm('Sure?')) {
        await this.$apollo.mutate({
          mutation: graphql.post.remove,
          variables: { id },
          update (store) {
            let data = store.readQuery({ query: graphql.post.getAll })
            data.posts = data.posts.filter((item) => item.id !== id)
            store.writeQuery({ query: graphql.post.getAll, data })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.table {
  width: 100%;
  border-collapse: collapse;

  tr:hover td {
    background-color: #eee;
  }
}
</style>
