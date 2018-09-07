<template>
  <div>
    <blog-loading :loading="$apollo.loading"/>
    <table>
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
          <td>Controls</td>
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
  }
}
</script>
