<template>
  <div class="blog-loading">
    <span v-if="loading">{{ spinner }} Loading <span>{{ message }}</span></span>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    i: 0,
    timer: null,
    message: '— rainbows',
    spinner: '\\',
    spinners: [
      '/',
      '—',
      '\\',
      '|',
      '/',
      '—',
      '\\'
    ],
    messages: [
      'the grue',
      'zelda',
      'coffee',
      'namaste',
      'unicorns',
      'rainbows',
      'yavp'
    ]
  }),

  watch: {
    loading (o, n) {
      if (o) {
        this.start()
      } else {
        this.stop()
      }
    }
  },

  mounted () {
    if (this.loading) {
      this.start()
    }
  },

  methods: {
    start () {
      this.timer = setInterval(() => {
        this.i = this.i + 1 >= this.messages.length ? 0 : this.i + 1
        this.message = this.messages[this.i]
        this.spinner = this.spinners[this.i]
      }, 500)
    },

    stop () {
      clearInterval(this.timer)
    }
  }
}
</script>

<style>
  .blog-loading {
    text-align: center;
    font-size: 24px;
    margin: 25px;
    font-weight: bold;
  }
</style>
