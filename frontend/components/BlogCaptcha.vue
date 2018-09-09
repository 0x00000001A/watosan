<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  props: {
    sitekey: {
      type: String,
      default: null
    }
  },
  data: () => ({
    message: null,
    attempts: 0
  }),
  mounted () {
    this.message = 'Loading google captcha'
    const waitingForGoogleCaptcha = setInterval(() => {
      if (typeof window.grecaptcha.render === 'function') {
        this.message = null
        grecaptcha.render(this.$el, {
          sitekey: this.sitekey
        })
        clearInterval(waitingForGoogleCaptcha)
      } else if (this.attempts < 10) {
        this.attempts++
        this.message = `Loading google captcha (Attempt #${this.attempts})`
      } else {
        this.message = 'Failed to load google captcha'
        clearInterval(waitingForGoogleCaptcha)
      }
    }, 250)
  }
}
</script>
