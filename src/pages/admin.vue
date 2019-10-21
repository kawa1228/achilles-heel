<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          ログイン
        </v-card-title>
        <v-card-text>
          <button @click="signIn">googleログイン</button>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'login',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async signIn() {
      await this.$store.dispatch('fetchUser')
      this.$router.push('/')
    }
  }
}
</script>
