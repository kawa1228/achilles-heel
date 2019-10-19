<template>
  <section class="new">
    <h1>new post</h1>
    <button @click="onClick">参照</button>
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
        v-if="eyecatch_preview"
        class="new__note-img"
        :src="eyecatch_preview"
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
import { storage, db } from '~/plugins/firebase'

export default {
  data() {
    return {
      title: '',
      body: '',
      eyecatch_name: '',
      eyecatch_preview: '',
      eyecatch_src: '',
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
    onClick() {
      const storageRef = storage.ref()
      const downRef = storageRef.child('images/down.jpg')
      console.log(downRef)
    },
    postNote() {
      console.log('post')
      this.uploadImage()
      const d = new Date()
      const today = d.toLocaleDateString()

      const articlesRef = db.collection('articles')
      articlesRef.add({
        created_at: today,
        name: this.title,
        body: this.body,
        eyecatch_src: this.eyecatch_src
          ? this.eyecatch_src
          : 'https://placehold.jp/150x150.png',
        eyecatch_alt: this.eyecatch_alt ? this.eyecatch_alt : '投稿画像'
      })
      this.uploadImage(this.file)
    },
    attachImage(e) {
      const file = e.target.files[0]
      console.log(file)
      this.loadImage(file)
    },
    // preview用
    loadImage(file) {
      // todo: exif対応はのちに考える
      if (!file) return
      const reader = new FileReader()
      reader.onload = (e) => {
        this.eyecatch_preview = e.target.result
        this.eyecatch_name = file.name
      }
      reader.readAsDataURL(file)
    },
    uploadImage(file) {
      // todo: firebase storageのセキュリティルールを追加
      const storageRef = storage.ref()

      const uploadTask = storageRef.child(`images/${file.name}`).put(file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          console.log('snapshot', snapshot)
        },
        (error) => {
          console.log('err', error)
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL)
            this.eyecatch_src = downloadURL
          })
        }
      )
    },
    clearImage() {
      console.log('clear', this.fileInput)
      if (!this.fileInput || !this.fileInput.value) return
      this.fileInput.value = ''
      // todo: すべてクリアする
      this.eyecatch_src = ''
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
