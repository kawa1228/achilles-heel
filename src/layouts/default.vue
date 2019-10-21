<template>
  <v-app dark>
    <!-- メニュー -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item v-if="user">
        <v-list-item-avatar>
          <v-img v-if="user" :src="user.photoURL"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.displayName }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          :to="item.to"
          nuxt
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="signOut">
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
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
        :src="user.photoURL"
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
      drawer: null
    }
  },
  computed: {
    ...mapState(['user']),
    navItems() {
      const items = [
        { title: 'Top', to: '/' },
        { title: 'List', to: this.user ? `/${this.user.uid}/list` : '/' },
        { title: 'Post', to: '/new' }
      ]
      return items
    }
  },
  methods: {
    async signOut() {
      if (!this.user) return
      await this.$store.dispatch('logoutUser')
      console.log('ログアウトしました')
      this.$router.push('/')
    }
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
