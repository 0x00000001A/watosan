<template>
  <div>
    <button @click="togglePreview">
      <span v-if="preview">Hide preview</span>
      <span v-else>Show preview</span>
    </button>
    <blog-post
      v-show="preview"
      :data="data"/>
    <div class="article__form">
      <form
        class="form"
        @submit.prevent="update">
        <div class="form__row">
          <label
            class="form__label"
            for="title">Title</label>
        </div>
        <div class="form__row">
          <input
            id="title"
            v-model="post.title"
            class="form__input"
            type="text"
            name="title"
            placeholder="Title">
        </div>
        <div class="form__row">
          <label
            class="form__label"
            for="image">Image (for OG and Twitter Cards)</label>
        </div>
        <div class="form__row">
          <input
            id="image"
            v-model="post.image"
            class="form__input"
            type="text"
            name="image"
            placeholder="myimage.jpg">
        </div>
        <div class="form__row">
          <label
            class="form__label"
            for="description">Description</label>
        </div>
        <div class="form__row">
          <input
            id="description"
            v-model="post.description"
            class="form__input"
            type="text"
            name="description"
            placeholder="Description">
        </div>
        <div class="form__row">
          <label
            class="form__label"
            for="tags">Tags</label>
        </div>
        <div class="form__row">
          <multiselect
            id="tags"
            v-model="post.tags"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            :preselect-first="false"
            :options="tags"
            :multiple="true"
            :taggable="true"
            tag-placeholder="Add this as new tag"
            placeholder="Search or add a tag"
            @tag="addTag"/>
        </div>
        <div class="form__row">
          <label
            class="form__label"
            for="scratch">Scratch&nbsp;</label>
          <input
            id="scratch"
            v-model="post.scratch"
            type="checkbox"
            name="scratch">
        </div>
        <div class="form__row">
          <label
            class="form__label"
            for="content">
            Content
            <i>
              <small>Use &lt;!-- break --&gt; for cut</small>
            </i>
          </label>
        </div>
        <div class="form__row">
          <textarea
            id="content"
            v-model="post.content"
            class="form__textarea"
            name="content"
            placeholder="A long time ago in a galaxy far far away..."/>
        </div>
        <div class="form__row">
          <button type="submit">Submit</button>
        </div>
        <div class="app-divider"/>
        <div class="form__row">
          <label
            class="form__label"
            for="scratch">File manager</label>
          <ul>
            <li
              v-for="file in files"
              :key="file.id">
              <span v-if="file.success && !file.removed">
                <a
                  href
                  @click.prevent="copyUri(file)">Copy uri</a> /
                <a
                  href
                  @click.prevent="removeFile(file)">Remove file</a>
              </span> -
              <span v-if="!file.removed">{{ file.name }}</span> -
              <span v-if="!file.removed">{{ file.size }}</span>
              <span v-else>-- removed --</span>
              <span v-if="file.active">- uploading...</span>
              <span v-else-if="file.error">- error</span>
              <span v-else/>
            </li>
          </ul>
          <file-upload
            ref="upload"
            :multiple="true"
            v-model="files"
            :custom-action="uploadFiles"
            extensions="jpg,jpeg,png"
            accept="image/png,image/jpeg,image"
            @input-filter="inputFilter">
            Select files
          </file-upload>
          <button
            v-if="!$refs.upload || !$refs.upload.active"
            type="button"
            class="btn btn-success"
            @click.prevent="$refs.upload.active = true">
            Upload
          </button>
          <button
            v-else
            type="button"
            class="btn btn-danger"
            @click.prevent="$refs.upload.active = false">
            Stop uploading
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import graphql from '~/graphql'

import BlogPost from '~/components/BlogPost'
import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js'
import Multiselect from 'vue-multiselect'

export default {
  middleware: ['auth'],
  components: {
    BlogPost,
    FileUpload,
    Multiselect
  },
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data: () => ({
    files: [],
    tags: ['suka'],
    preview: false,
    post: {
      title: '',
      description: '',
      short: '',
      content: '',
      tags: [],
      image: '',
      date: new Date().toLocaleDateString()
    }
  }),
  apollo: {
    postById: {
      query: graphql.post.getById,
      prefetch: ({ route }) => {
        return { id: route.params.id }
      },
      variables () {
        return { id: this.$route.params.id }
      },
      update (data) {
        this.$set(this, 'post', JSON.parse(JSON.stringify(data.postById)))
      }
    }
  },
  computed: {
    data () {
      const parts = this.post.content.split(/\r?\n?<!--\sbreak\s-->/)
      const short = parts.length > 1 ? parts[0] + '...' : this.post.content.replace('<!-- break -->', '')
      const content = this.post.content.replace('<!-- break -->', '')

      return {
        ...this.post,
        short,
        content
      }
    }
  },
  methods: {
    togglePreview () {
      this.preview = !this.preview
    },
    inputFilter (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        if (/\.(php?|html?|jsx?).*$/i.test(newFile.name)) {
          return prevent()
        }
      }
    },
    async update () {
      await this.$apollo.mutate({
        mutation: graphql.post.update,
        variables: {
          id: this.post.id,
          tags: this.post.tags,
          title: this.post.title,
          image: this.post.image,
          short: this.data.short,
          content: this.data.content,
          scratch: this.post.scratch,
          description: this.post.description
        }
      })
      this.$router.replace({ path: '/manage/posts' })
    },
    async uploadFiles (data) {
      data.headers['Content-type'] = 'multipart/form-data'

      const formData = new FormData()
      formData.append('file', data.file)

      await this.$apollo.mutate({
        mutation: graphql.file.create,
        variables: {
          file: data.file
        },
        update (store, result) {
          data.name = result.data.fileCreate.filename
          data.graphql = result.data.fileCreate
        }
      })
    },
    async removeFile (file) {
      const vm = this
      const filename = file.name

      file.name = 'removing...'

      await this.$apollo.mutate({
        mutation: graphql.file.remove,
        variables: { id: file.graphql.id },
        update (store, result) {
          file.name = filename
          vm.$set(file, 'removed', true)
        }
      })
    },
    addTag (newTag) {
      this.tags.push(newTag)
      this.post.tags.push(newTag)
    },
    copyUri (file) {
      const el = document.createElement('textarea')
      el.value = `![IMAGE_ALT](${file.name} "IMAGE_TITLE")`
      el.setAttribute('readonly', '')
      el.style = { position: 'absolute', left: '-9999px' }
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
  }
}
</script>

<style lang="scss">
  .multiselect__tags {
    position: relative;
  }

  .multiselect__content-wrapper {
    padding-top: 16px;
  }

  input[type="text"].multiselect__input {
    display: initial !important;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;

    &:focus {
      opacity: 1;
    }
  }
</style>
