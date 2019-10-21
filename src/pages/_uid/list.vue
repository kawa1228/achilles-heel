<template>
  <v-row v-if="item && item.length">
    <v-col v-for="(item, i) in item" :key="i" cols="12">
      <v-card dark nuxt :to="`/${item.noteId}/note`">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title
              class="headline"
              v-text="item.note.title"
            ></v-card-title>

            <v-card-text v-text="item.note.body" />
          </div>

          <v-avatar class="ma-3" size="125" tile>
            <v-img
              v-if="item.image.src"
              :src="item.image.src"
              :alt="item.image.name"
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
          </v-avatar>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <div v-else>記事がありません</div>
</template>

<script>
import { db } from '~/plugins/firebase'

export default {
  async asyncData({ params }) {
    const articlesRef = await db.collection('articles')
    const query = await articlesRef.where('uid', '==', params.uid)
    const item = []
    await query
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            item.push({ ...doc.data(), noteId: doc.id })
          })
        }
      })
      .catch((err) => {
        console.log('ユーザーの記事取得エラー', err)
      })
    return { item }
  }
}
</script>
