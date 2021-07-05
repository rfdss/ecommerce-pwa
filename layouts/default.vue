<template>
  <div>
    <!-- GENERIC OVERLAY -->
    <div 
    class="overlay h-100 d-flex align-items-baseline justify-content-center"
    :class="{'open': overlay.open}"
    @click="handleCloseOverlay"
    >
      <b-alert
      show
      class="bg-primary border-0 text-white mt-4 px-5"
      v-if="overlay.loading"
      >
        <p class="m-0 p-2">Carregando...</p>
      </b-alert>
    </div>

    <!-- GENERIC TOAST -->
    <b-alert
    v-if="toast.open"
    class="generic-toast animated bounceInDown mt-md-4 shadow-lg"
    :variant="toast.type"
    show
    :class="{
      'bg-success': toast.type === 'success',
      'bg-danger': toast.type === 'danger',
      'bg-dark': toast.type === 'dark',
      'bg-warning': toast.type === 'warning',
      'bg-secondary': toast.type === 'secondary',
      'bg-primary': toast.type === 'primary',
      'open': toast.open
    }"
    >
      <p class="h5">{{ toast.title }}</p>
      <p class="m-0 mb-2" v-html="toast.content"></p>
    </b-alert>

    <!-- MOBILE SIDEBAR -->
    <div
    v-if="sidebar.open && sidebar.currentItem != 'searchSort'"
    :class="{
      'overlay': true,
      'h-100': true,
      'd-flex': true,
      'align-items-baseline': true,
      'justify-content-center': true,
      'open': true
    }"
    >
      <Sidebar />
    </div>

    <!-- Header has been moved to each component because need the currentPage prop -->
    <!-- <Header /> -->
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Icon from '@/components/Icon'
// import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'

import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Icon,
    Sidebar,
    // Header,
    Footer,
  },

  computed: mapState({
    overlay: 'overlay',
    toast: 'toast',
    sidebar: 'sidebar'
  }),

  methods: {
    ...mapActions([
      'setOverlay',
      'setSidebarOpen',
      'setToast',
    ]),

    handleCloseSidebar() {
      this.setSidebarOpen(false)
    },

    handleCloseOverlay() {
      if (this.overlay.loading || this.overlay.box === 'cartResume') {
        return false
      }

      this.setOverlay({
        open: false,
        box: null,
        loading: false,
      })
    }
  }
}
</script>

<style lang="scss">
</style>
