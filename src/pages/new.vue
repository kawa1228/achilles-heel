<template>
  <section class="new">
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
        v-if="eyecatch"
        class="new__note-img"
        :src="eyecatch"
        :alt="eyecatch_alt"
      />
      <label v-else class="new__note-label"
        >アイキャッチ画像投稿
        <input
          id="file"
          ref="fileInput"
          type="file"
          accept="image/png,image/jpeg,image/gif"
          @change="attachImage"
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
</template>

<script>
// import { storage } from '~/plugins/firebase'

export default {
  data() {
    return {
      title: '',
      body: '',
      eyecatch: '',
      eyecatch_alt: ''
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
  methods: {
    postNote() {
      console.log('post')
      /*
      const d = new Date()
      const today = d.toLocaleDateString()

      const articlesRef = db.collection('articles')
      articlesRef.add({
        created_at: today,
        name: this.title,
        body: this.body,
        eyecatch: this.eyecatch,
        eyecatch_alt: this.eyecatch_alt
      })
      */
    },
    attachImage(e) {
      const file = e.target.files[0]
      console.log(file)
      this.loadImage(file)

      // const storageRef = storage.ref()
      // const mountainsRef = storageRef.child('mountains.jpg')
      // const mountainImagesRef = storageRef.child('images/mountains.jpg')
    },
    loadImage(file) {
      // todo: exif対応はのちに考える
      const reader = new FileReader()
      reader.onload = (e) => {
        this.eyecatch = e.target.result
      }
      reader.readAsDataURL(file)
    },
    clearImage() {
      console.log('clear', this.fileInput)
      if (!this.fileInput || !this.fileInput.value) return
      this.fileInput.value = ''
      this.eyecatch = ''
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
