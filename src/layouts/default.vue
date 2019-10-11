<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="'Achilles heels'" />
      <v-spacer />
      <v-toolbar-title v-text="'login'" />
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

<script>
export default {}
</script>
