<template>
  <div class="app">
    <section class="body">
      <section class="content">
        <nuxt/>
        <footer class="footer">
          <div class="copyrights">
            <b>Watosan</b> (c) 2018, All rights reserved
          </div>
        </footer>
      </section>
      <aside class="aside">
        <div class="aside-block">
          <div class="app-logo">
            <nuxt-link
              to="/"
              class="app-logo__link">
              <span class="app-logo__text">Watosan</span>
            </nuxt-link>
            <span class="app-logo__description">Another one developer's blog</span>
          </div>
        </div>
        <div class="aside-block">
          <div class="app-divider"/>
        </div>
        <div class="aside-block">
          <ul class="app-menu">
            <li
              v-if="authorized"
              class="app-menu__item">
              <nuxt-link
                class="app-menu__link"
                to="/manage">
                Manage
              </nuxt-link>
            </li>
            <li class="app-menu__item">
              <nuxt-link
                class="app-menu__link"
                to="/feed">Feed
              </nuxt-link>
            </li>
            <li class="app-menu__item">
              <nuxt-link
                class="app-menu__link"
                to="/about">About
              </nuxt-link>
            </li>
            <li class="app-menu__item">
              <nuxt-link
                class="app-menu__link"
                to="/subscribe">Subscribe
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="aside-block">
          <div class="app-divider"/>
        </div>
      </aside>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    authorized () {
      return this.$store.state.authorized || this.$apolloHelpers.getToken()
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/scss/variables.scss';

  * {
    box-sizing: border-box;

    &:before,
    &:after {
      box-sizing: inherit;
    }
  }

  .form {
    &__label {
      font-weight: bold;
      margin: 10px 0;
      display: inline-block;
    }

    &__input {
      width: 50%;
    }

    &__textarea {
      width: 100%;
      min-height: 150px;
      resize: vertical;
    }
  }

  .app-divider {
    height: 1px;
    width: 100%;
    margin: 25px auto;
    max-width: 80%;
    border-bottom: 1px dotted rgb(180, 180, 180);
  }

  .tags {
    &__link {
      color: $link;
      text-decoration: none;
    }

    &__link:visited {
      color: $link-visited;
    }

    &__link:active {
      color: $link-hover;
    }

    &__link:hover {
      text-decoration: underline;
    }
  }

  .app-menu {
    text-align: left;

    &__item {
      margin-bottom: 5px;
    }

    &__link {
      font-weight: bold;
      color: $link;
      text-decoration: underline;
    }

    &__link:visited {
      color: $link-visited;
    }

    &__link:active {
      color: $link-hover;
    }

    &__link:hover {
      text-decoration: none;
    }
  }

  .app-logo {
    text-align: center;

    &__link,
    &__link:visited {
      color: $link;
      text-decoration: underline;
    }

    &__link:active {
      color: $link-hover;
    }

    &__link:hover {
      text-decoration: none;
    }

    &__text {
      font-size: 24px;
      font-weight: bold;
    }

    &__description {
      display: block;
      font-size: 16px;
      margin-top: 10px;
    }
  }

  html,
  body {
    font-family: 'Inconsolata', monospace;
    // color: #000; //rgb(17, 17, 17);
    color: $font-color;
    margin: 0;
    font-size: 1rem;
    text-rendering: optimizeSpeed;
    // background: #999;
  }

  .app {
    max-width: 1000px;
    min-height: 100vh;
    margin: 0 auto;
  }

  .header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin: 10px;
  }

  .body {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    background: #fff;
  }

  .footer {
    margin: 50px 10px 10px;
  }

  .menu,
  .logo {
    height: 100px;
    background: #fff;
    flex-grow: 1;
    margin: 10px;
  }

  .content {
    background: #fff;
    flex-grow: 1;
    margin: 20px;
  }

  .pagination {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    font-size: 18px;
    margin: 50px 20px;

    &__link {
      color: $link;
    }

    &__link:visited {
      color: $link-visited;
      text-decoration: underline;
    }

    &__link:active {
      color: $link-hover;
    }

    &__link:hover {
      text-decoration: none;
    }
  }

  .aside {
    flex-grow: 1;
    max-width: 200px;
    min-width: 200px;
    min-height: 100vh;
    margin: 30px 0;
  }

  .aside-block {
    margin: 10px;
    text-align: center;
  }

  .copyrights {
    margin: 10px;
    font-size: 14px;
    text-align: center;
  }
</style>
