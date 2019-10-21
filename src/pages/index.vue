<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <img
          src="~/assets/images/funny_face_books.png"
          alt="TOP画像"
          class="top-image"
        />
      </div>
      <p class="text-center display-1 font-weight-thin">
        I Know how Columbus felt
      </p>
      <p class="text-center font-weight-thin">
        Finding another world Can I trust how I feel ?
      </p>
      <div class="text-xs-right">
        <em><small>&mdash; George Gershwin</small></em>
      </div>
      <hr class="my-3" />
      <v-row v-if="articles && articles.length">
        <v-col v-for="(item, i) in articles" :key="i" cols="12">
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
    </v-flex>
  </v-layout>
</template>

<script>
import { db } from '~/plugins/firebase'

export default {
  async asyncData() {
    const articlesRef = db.collection('articles')

    const querySnapshot = await articlesRef.get().catch((err) => {
      console.log('取得エラー', err)
    })

    const articles = []
    querySnapshot.forEach((doc) => {
      articles.push({ ...doc.data(), noteId: doc.id })
    })
    return { articles }
  }
}
</script>

<style lang="scss">
.top-image {
  max-width: 90vw;
}
</style>
