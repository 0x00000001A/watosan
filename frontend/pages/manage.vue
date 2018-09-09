<template>
  <div>
    <h1>Manage blog</h1>
    <p v-if="authorized">
      <nuxt-link to="/manage/posts">Posts</nuxt-link> /
      <nuxt-link to="/manage/posts/create">New Post</nuxt-link> /
      <nuxt-link to="/manage/subscribers">Subscribers</nuxt-link> /
      <a
        href
        @click.prevent="logout">Logout</a>
    </p>
    <nuxt-child/>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Secret garden'
    }
  },
  computed: {
    authorized () {
      return this.$store.state.authorized || this.$apolloHelpers.getToken()
    }
  },
  methods: {
    async logout () {
      await this.$apolloHelpers.onLogout()
      this.$store.commit('setAuthorized', false)
      this.$router.push({ path: '/' })
    }
  }
}
</script>
