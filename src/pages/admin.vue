<template>
  <button @click="signIn">googleログイン</button>
</template>

<script>
import { firebaseLogin } from '~/plugins/firebase'

export default {
  methods: {
    async signIn() {
      try {
        const user = await firebaseLogin()
        if (user) {
          this.$router.push('/list')
        }
      } catch (error) {
        alert(error)
      }
    }
  }
}
</script>
