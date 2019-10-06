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
      <button>アイキャッチ画像投稿</button>
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
// import { db } from '~/plugins/firebase'

export default {
  data() {
    return {
      title: '',
      body: '',
      eyecatch: ''
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
        eyecatch_alt: '見出し画像'
      })
      */
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
}
</style>
