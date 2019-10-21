<template>
  <section v-if="!isLoading" class="new">
    <h1>new post</h1>
    <div class="new__post">
      <button :class="postButtonClass" :disabled="isDisabled" @click="postNote">
        投稿
      </button>
      <span v-if="isDisabled" class="new__post__warning"
        >※入力してください</span
      >
    </div>
    <article class="new__note">
      <img
        v-if="preview"
        class="new__note-img"
        :src="preview"
        :alt="fileName"
      />
      <label v-else class="new__note-label"
        >アイキャッチ画像投稿
        <input
          id="file"
          type="file"
          accept="image/png,image/jpeg,image/gif"
          @change="previewImage"
        />
      </label>
      <input v-model="title" type="text" placeholder="タイトル" />
      <textarea
        id=""
        v-model="body"
        name=""
        cols="30"
        rows="10"
        placeholder="本文"
      />
    </article>
  </section>
  <v-layout v-else fill-height align-center justify-center ma-0>
    <!-- 以下のコンポーネントでクルクル回るローディング画像を表示しています。 -->
    <v-progress-circular
      indeterminate
      color="grey lighten-5"
    ></v-progress-circular>
  </v-layout>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      title: '',
      body: '',
      fileName: '',
      preview: '',
      file: '',
      isLoading: false
    }
  },
  computed: {
    isDisabled() {
      return !this.title || !this.body
    },
    postButtonClass() {
      return this.isDisabled ? 'new__post--disabled' : 'new__post--enabled'
    }
  },
  destroyed() {
    this.clearImage()
  },
  created() {
    this.isLoading = false
  },
  methods: {
    async postNote() {
      this.isLoading = true
      const now = moment().format()
      const contents = {
        created_at: now,
        note: {
          title: this.title,
          body: this.body
        },
        image: {
          file: this.file,
          name: this.fileName
        }
      }
      await this.$store.dispatch('postNote', contents)
      // todo: loadingやredirectを考える
      await this.clearImage()
      this.$router.push('/')
      this.isLoading = false
    },
    // todo: exif対応はのちに考える
    previewImage(e) {
      const file = e.target.files[0]
      if (!file) return
      this.file = file
      const reader = new FileReader()
      reader.onload = (e) => {
        this.preview = e.target.result
        this.fileName = file.name
      }
      reader.readAsDataURL(file)
    },
    clearImage() {
      this.title = ''
      this.body = ''
      this.fileName = ''
      this.preview = ''
      this.file = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.new {
  &__post {
    &--enabled {
      background: #fff;
      color: #303030;
    }

    &--disabled {
      background: #303030;
      color: #fff;
    }

    &__warning {
      color: #ec8181;
    }
  }

  &__note {
    display: flex;
    flex-direction: column;
  }

  // todo: 画像のスタイル考える
  &__note-img {
    height: 200px;
    object-fit: cover;
  }

  &__note-label {
    & > input {
      display: none;
    }
  }
}
</style>
