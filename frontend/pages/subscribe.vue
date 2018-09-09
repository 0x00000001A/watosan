<template>
  <div>
    <h1>Subscribe</h1>
    <div class="article__form">
      <form
        class="form"
        @submit.prevent="subscribe">
        <div class="form__row">
          <label
            class="form__label"
            for="email">Enter your e-mail address:</label>
        </div>
        <div class="form__row">
          <input
            id="email"
            v-model="email"
            class="form__input"
            type="email"
            name="email"
            placeholder="email@example.com">

          <button type="submit">Subscribe</button>
        </div>

        <div class="form__row">
          <p class="form__label">Confirmation:</p>
          <blog-captcha :sitekey="sitekey"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import graphql from '~/graphql'
import BlogCaptcha from '~/components/BlogCaptcha'

export default {
  components: {
    BlogCaptcha
  },
  data: () => ({
    email: null,
    sitekey: process.env.RECAPTCHA_KEY
  }),
  methods: {
    async subscribe () {
      const recaptcha = document.querySelector('.g-recaptcha-response').value

      await this.$apollo.mutate({
        mutation: graphql.subscriber.create,
        variables: {
          email: this.email,
          captcha: recaptcha
        }
      })

      this.$router.replace({ path: '/manage/subscribers' })
    }
  }
}
</script>
