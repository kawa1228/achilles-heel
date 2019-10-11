<template>
  <v-app dark>
    <v-toolbar fixed app max-height="56">
      <v-toolbar-title>
        <v-btn to="/" nuxt v-text="'Achilles heels'" />
      </v-toolbar-title>
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
