<template>
  <v-app dark>
    <v-app-bar fixed app max-height="56">
      <v-toolbar-title>
        <nuxt-link class="toolbar__title" to="/">
          <v-toolbar-title>タイトル</v-toolbar-title>
        </nuxt-link>
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<style lang="scss" scoped>
.toolbar {
  &__title {
    text-decoration: none;
    color: aliceblue;
  }
}
</style>
