<template>
  <div>
    <h1>Cancel subscription</h1>
    <div v-if="valid && !success && !error">
      <p>
        Click the "Unsubscribe" button to stop your subscription
      </p>
      <button @click="unsubscribe">Unsubscribe</button>
    </div>
    <div v-if="!valid || error">
      Invalid credentials
    </div>
    <div v-if="success && !error">
      Success!
    </div>
    <blog-loading :loading="loading"/>
  </div>
</template>

<script>
import graphql from '~/graphql'
import BlogLoading from '~/components/BlogLoading'

export default {
  components: {
    BlogLoading
  },
  data: () => ({
    error: null,
    success: null,
    loading: false
  }),
  computed: {
    valid () {
      return this.$route.query.id && this.$route.query.token
    }
  },
  methods: {
    async unsubscribe (id, token) {
      if (confirm('Sure?')) {
        try {
          this.loading = true
          await this.$apollo.mutate({
            mutation: graphql.subscriber.remove,
            variables: {
              id: this.$route.query.id,
              token: this.$route.query.token
            }
          })
          this.success = true
        } catch (e) {
          this.error = true
        } finally {
          this.loading = false
        }
      }
    }
  }
}
</script>
