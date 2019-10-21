<template>
  <article v-if="item">
    <h1>{{ item.note.title }}</h1>
    <v-row align="center" justify="center">
      <v-img
        :src="item.image.src"
        :alt="item.image.name"
        aspect-ratio="1"
        class="grey lighten-2"
        max-width="500"
        max-height="300"
      >
        <template v-slot:placeholder>
          <v-layout fill-height align-center justify-center ma-0>
            <!-- 以下のコンポーネントでクルクル回るローディング画像を表示しています。 -->
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-layout>
        </template>
      </v-img>
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
