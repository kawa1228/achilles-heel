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
      <v-row dense>
        <v-col v-for="(item, i) in items" :key="i" cols="12">
          <v-card :color="item.color" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.title"
                ></v-card-title>

                <v-card-text v-text="item.artist" />
              </div>

              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: 'https://placehold.jp/150x150.png',
          title: 'test title',
          artist: 'ここに本文が入ります'
        },
        {
          src: 'https://placehold.jp/150x150.png',
          title: 'test title 2',
          artist: 'ここに本文が入ります'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.top-image {
  max-width: 90vw;
}
</style>
