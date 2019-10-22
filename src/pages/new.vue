<template>
  <v-layout v-if="!isLoading" column justify-center align-center>
    <h1 class="text-center display-1 font-weight-thin">新規投稿</h1>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-img
          :src="preview"
          aspect-ratio="1"
          class="grey lighten-2"
          max-width="500"
          max-height="200"
        >
          <v-layout fill-height align-center justify-center ma-0>
            <!-- 以下のコンポーネントでクルクル回るローディング画像を表示しています。 -->
            <label v-if="!preview" class="note-label"
              >画像を投稿する
              <input
                id="file"
                type="file"
                accept="image/png,image/jpeg,image/gif"
                @change="previewImage"
              />
            </label>
          </v-layout>
        </v-img>
      </v-row>
      <v-row>
        <v-text-field v-model="title" label="タイトル"></v-text-field>
      </v-row>
      <v-row>
        <v-textarea
          v-model="body"
          solo
          name="input-7-4"
          label="Solo textarea"
          placeholder="本文を入力してください"
        ></v-textarea>
      </v-row>
      <v-row>
        <v-btn small :disabled="isDisabled" block @click="postNote"
          >投稿する</v-btn
        >
      </v-row>
    </v-container>
  </v-layout>
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
    }
  },
  destroyed() {
    this.clearImage()
    this.isLoading = false
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
.note-label {
  & > input {
    display: none;
  }
}
</style>
