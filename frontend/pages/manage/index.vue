<template>
  <div>
    <h1>Auth required</h1>
    <form
      v-if="!isAuthenticated"
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
        <div v-if="submitting">Submitting ....</div>
      </div>
      <div class="form__row">
        <button type="submit">Submit</button>
      </div>
    </form>
    <div v-else>
      You are logged in!
      <button
        type="button"
        @click="onLogout">Logout</button>
    </div>
    <div
      v-if="error"
      style="color: red;">{{ error }}</div>
    <div v-if="successfulData">{{ successfulData }}</div>
  </div>
</template>

<script>
import graphql from '@/graphql'

export default {
  head () {
    return {
      title: 'Secret garden'
    }
  },
  data () {
    return {
      isAuthenticated: false,
      submitting: false,
      error: null,
      credentials: {
        email: '',
        password: ''
      },
      successfulData: null
    }
  },
  mounted () {
    this.isAuthenticated = !!this.$apolloHelpers.getToken()
  },
  methods: {
    async signin () {
      this.submitting = true
      const credentials = this.credentials
      try {
        const res = await this.$apollo.mutate({
          mutation: graphql.auth.signin,
          variables: credentials
        }).then(({ data }) => data && data.authSignin)
        await this.$apolloHelpers.onLogin('Bearer ' + res.authSignin, undefined, 7)
        this.successfulData = res
        this.isAuthenticated = true
      } catch (e) {
        console.error(e)
        this.error = e
      }
    },
    async onLogout () {
      await this.$apolloHelpers.onLogout()
      this.isAuthenticated = false
    }
  }
}
</script>
