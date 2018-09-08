<template>
  <div>Welcome!</div>
</template>

<script>
export default {
  computed: {
    authorized () {
      return this.$store.state.authorized || this.$apolloHelpers.getToken()
    }
  },
  mounted () {
    if (!this.authorized) {
      this.$router.push({ path: '/manage/signin' })
    }
  }
}
</script>

<style lang="css">
</style>
