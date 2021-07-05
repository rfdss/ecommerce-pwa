<template>
  <b-list-group class="d-none d-lg-block border-0 rounded-0 h-100 pb-5 shadow-sm">
    <div class="mt-5 pb-2 pl-5">
      <p class="h4 text-dark mb-3">
        Minha conta
      </p>

      <p class="h5 font-weight-normal text-dark mb-3" v-if="user.name">
        Olá, {{ userFirstName }}!
      </p>

      <p class="h5 font-weight-normal text-dark mb-3" v-else>
        Olá!
      </p>
    </div>

    <b-list-group-item
    v-for="menuItem in sidebar.items"
    :key="menuItem.key"
    class="border-0 rounded-0 pl-5"
    :active="sidebar.currentItem === menuItem.key || (menuItem.key === 'my-orders' && sidebar.currentItem === 'order-detail')"
    href="#"
    @click.prevent="handleSetSidebarCurrentItem(menuItem.key)"
    >{{ menuItem.value }}</b-list-group-item>

    <b-list-group-item
    class="border-0 rounded-0 pl-5"
    href="#"
    @click.prevent="handleLogout"
    >Sair</b-list-group-item>
  </b-list-group>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import _ from 'lodash'

export default {
  data() {
    return {}
  },

  computed: {
    ...mapState({
      user: state => state.user,
      sidebar: state => state.sidebar
    }),

    userImage() {
      return (this.user.image64)
        ? this.user.image64
        : './_nuxt/static/no-image.png'
    },

    userFirstName() {
      return (typeof(this.user != 'undefined')&& this.user.name) 
        ? this.user.name.split(' ')[0] 
        : ''
    },
  },

  methods: {
    ...mapActions([
      'setSidebarCurrentItem',
      'logout'
    ]),

    handleSetSidebarCurrentItem(item) {
      this.setSidebarCurrentItem(item)
      if (this.$route.name !== 'minha-conta') {
        this.$router.push({ name: 'minha-conta' })
      }
    },

    handleLogout() {
      this.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss">
</style>
