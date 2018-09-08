<template>
  <div>
    <blog-loading :loading="submitting"/>
    <form
      class="form"
      @submit.prevent="signin">
      <div class="form__row">
        <label class="form__label">Username</label>
      </div>
      <div class="form__row">
        <input
          v-model="credentials.email"
          class="form__input"
          type="text"
          required>
      </div>
      <div class="form__row">
        <label class="form__label">Password</label>
      </div>
      <div class="form__row">
        <input
          v-model="credentials.password"
          class="form__input"
          type="password"
          required>
      </div>
      <div class="form__row">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import graphql from '@/graphql'
import BlogLoading from '~/components/BlogLoading'

export default {
  components: {
    BlogLoading
  },
  data () {
    return {
      submitting: false,
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async signin () {
      this.submitting = true

      try {
        const token = await this.$apollo.mutate({
          mutation: graphql.auth.signin,
          variables: this.credentials
        }).then(({ data }) => data && data.authSignin)

        await this.$apolloHelpers.onLogin(token)
        this.$store.commit('setAuthorized', true)
        this.$router.replace({ path: '/manage' })
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style lang="css">
</style>
