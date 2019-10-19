<template>
  <v-app dark>
    <!-- メニュー -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item v-if="user">
        <v-list-item-avatar>
          <v-img v-if="user" :src="user.picture"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" nuxt>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- ツールバー -->
    <v-app-bar fixed app max-height="56">
      <nuxt-link class="toolbar__title" to="/">
        <v-toolbar-title>Achilles heels</v-toolbar-title>
      </nuxt-link>
      <v-spacer></v-spacer>
      <v-btn v-if="!user" to="/admin" nuxt v-text="'login'" />
      <img
        v-else
        class="toolbar__user-icon"
        :src="user.picture"
        alt=""
        @click.stop="drawer = !drawer"
      />
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
import { mapState } from 'vuex'

export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: 'Top', to: '/' },
        { title: 'List', to: '/list' },
        { title: 'Post', to: '/new' }
      ]
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="scss" scoped>
.toolbar {
  &__title {
    text-decoration: none;
    color: aliceblue;
  }

  &__user-icon {
    width: 40px;
    border-radius: 50%;
  }
}
</style>
