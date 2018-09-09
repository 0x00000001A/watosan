<template>
  <div>
    <blog-loading :loading="$apollo.loading"/>
    <table
      v-if="subscribers && subscribers.length"
      border="1"
      class="table">
      <thead>
        <tr>
          <th>EMail</th>
          <th/>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="subscriber in subscribers"
          :key="subscriber.id">
          <td>{{ subscriber.email }}</td>
          <td>
            <a
              href
              @click.prevent="unsubscribe(subscriber.id, subscriber.token)">
              Unsubscribe
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>
      Empty
    </p>
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
    subscribers: {
      prefetch: true,
      query: graphql.subscriber.getAll
    }
  },
  methods: {
    async unsubscribe (id, token) {
      if (confirm('Sure?')) {
        await this.$apollo.mutate({
          mutation: graphql.subscriber.remove,
          variables: { id, token },
          update (store) {
            let data = store.readQuery({ query: graphql.subscriber.getAll })
            data.subscribers = data.subscribers.filter((item) => item.id !== id)
            store.writeQuery({ query: graphql.subscriber.getAll, data })
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
