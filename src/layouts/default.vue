<template>
  <v-app dark>
    <v-toolbar fixed app>
      <v-toolbar-title>
        <v-btn to="/" nuxt v-text="'Achilles heels'" />
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-items>
        <v-btn to="/admin" nuxt v-text="'login'" />
      </v-toolbar-items>
    </v-toolbar>
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
