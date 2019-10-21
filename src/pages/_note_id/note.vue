<template>
  <article v-if="item">
    <h1>{{ item.note.title }}</h1>
    <v-row align="center" justify="center">
      <v-img
        :src="item.image.src"
        :alt="item.image.name"
        lazy-src="https://placehold.jp/150x150.png"
        aspect-ratio="1"
        class="grey lighten-2"
        max-width="500"
        max-height="300"
      ></v-img>
    </v-row>
    <p>{{ item.note.body }}</p>
  </article>
  <div v-else>記事がありません</div>
</template>

<script>
import { db } from '~/plugins/firebase'

export default {
  async asyncData({ params }) {
    const docRef = await db.collection('articles').doc(params.note_id)
    const doc = await docRef.get()
    return { item: doc.data() }
  }
}
</script>
