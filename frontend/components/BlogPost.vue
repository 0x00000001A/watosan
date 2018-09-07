<template>
  <article class="article">
    <h1 class="article__title">{{ data.title }}</h1>
    <div
      v-if="!data.content"
      class="article__body"
      v-html="$md.render(data.short)"/>
    <div
      v-if="data.content"
      class="article__body"
      v-html="$md.render(data.content)"/>
    <div class="article__footer">
      <div class="article__date">{{ data.date }}</div>
      <div class="article__tags">
        <div class="tags">
          <span
            v-for="tag in data.tags"
            :key="tag.name">
            &nbsp;<nuxt-link
              :to="'/posts/tag/' + tag"
              class="tags__link">#{{ tag }}</nuxt-link>
          </span>
        </div>
      </div>
    </div>
    <div
      v-if="!data.content"
      class="article__more">
      <nuxt-link
        :to="{ path: '/posts/' + data.slug }"
        class="article__more__link">... read more ...
      </nuxt-link>
    </div>
    <div class="app-divider"/>
  </article>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">
  @import '~/assets/scss/variables.scss';

  .article {
    margin: 20px;

    &__form {
      border-top: 1px dashed rgb(134, 134, 134);
      margin-top: 50px;
      padding-top: 25px;
    }

    h1,
    &__title {
      font-size: 2rem;
      margin: 1em 0;
      text-align: center;
      text-transform: capitalize;
    }

    &__paragraph, p {
      font-size: 1rem;
      margin: 1em 0;
      text-indent: 2rem;
    }

    &__body {
      font-family: 'Merriweather', serif;
      word-break: break-word;
    }

    &__footer {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      font-size: 16px;
    }

    &__more {
      text-align: center;
      font-size: 16px;
      margin: 10px 0;

      &__link {
        color: $link;
        font-weight: bold;
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
  }
</style>
