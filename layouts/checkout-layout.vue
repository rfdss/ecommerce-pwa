<template>
  <div>
    <!-- GENERIC OVERLAY -->
    <div 
    class="overlay d-flex align-items-baseline justify-content-center" 
    :class="{'open': overlay.open}" 
    @click="handleCloseOverlay"
    >
      <!-- GENERIC LOADING -->
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
    class="generic-toast animated bounceInDown mt-4 mx-5 px-5 shadow-lg"
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
    
    <CheckoutHeader />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import CheckoutHeader from '@/components/CheckoutHeader'
import Footer from '@/components/Footer'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    CheckoutHeader,
    Footer
  },

  computed: mapState({
    overlay: 'overlay',
    toast: 'toast'
  }),

  created() {
    if (!localStorage.getItem('isCartReviewOk')) {
      this.$router.push({ name: 'carrinho' })
    }
  },

  methods: {
    ...mapActions([
      'setOverlay',
    ]),

    handleCloseOverlay() {
      if (this.overlay.loading) return false
      this.setOverlay(null)
    }
  }
}
</script>


<style>
</style>
