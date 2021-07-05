<template>
  <header class="checkout-header bg-primary text-white">
    <b-container class="h-100">
      <b-row class="h-100">
        <b-link @click.prevent="handleBack" class="btn-checkout-back">
          <Icon 
          :class="{'white': true}"
          icon="ant-design:arrow-left-outline"
          :width="25"
          :height="25"
          />
        </b-link>

        <b-col
        :class="{
          'd-none h-100 d-md-flex justify-content-md-center align-items-md-center': true,
          'd-flex justify-content-center align-items-center active-tab': checkout.currentStep === 'auth'
        }">
          <b-link to="/checkout">
            <p class="h4 text-white text-center" :class="{'text-primary-dark': checkout.currentStep !== 'auth'}">
              Identificação
            </p>
          </b-link>
        </b-col>

        <b-col
        :class="{
          'd-none h-100 d-md-flex justify-content-md-center align-items-md-center': true,
          'd-flex justify-content-center align-items-center active-tab': checkout.currentStep === 'order-review'
        }">
          <b-link to="/checkout/revisao-pedido">
            <p class="h4 text-white text-center" :class="{'text-primary-dark': checkout.currentStep !== 'order-review'}">
              Revisão
            </p>
          </b-link>
        </b-col>

        <b-col
        :class="{
          'd-none h-100 d-md-flex justify-content-md-center align-items-md-center': true,
          'd-flex justify-content-center align-items-center active-tab': checkout.currentStep === 'delivery'
        }">
          <b-link to="/checkout/entrega">
            <p class="h4 text-white text-center" :class="{'text-primary-dark': checkout.currentStep !== 'delivery'}">
              Entrega
            </p>
          </b-link>
        </b-col>

        <b-col
        :class="{
          'd-none h-100 d-md-flex justify-content-md-center align-items-md-center': true,
          'd-flex justify-content-center align-items-center active-tab': checkout.currentStep === 'payment'
        }">
          <b-link to="/checkout/pagamento">
            <p class="h4 text-white text-center" :class="{'text-primary-dark': checkout.currentStep !== 'payment'}">
              Pagamento
            </p>
          </b-link>
        </b-col>
      </b-row>
    </b-container>
  </header>
</template>

<script>
import Icon from '@/components/Icon'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Icon,
  },

  data() {
    return {
    }
  },
  
  computed: {
    ...mapState({
      checkout: state => state.checkout,
    }),
  },

  methods: {
    ...mapActions([
      'login',
      'register',
      'setOverlay'
    ]),

    handleBack() {
      this.$router.back()
    },

    handleCloseOverlay() {
      location.reload()
      this.setOverlay({ loading: false, box: null, open: false })
    },

    handleCurrentCategory(id) {
      this.setCurrentGroup(id)
    },

    handleLogin() {
      this.setOverlay({ box: null, open: false })
      this.$router.push({ name: 'login' })
    },

    handleLogout() {
      this.setOverlay({ box: null, open: false })
      this.logout()
      this.$router.push({ name: 'login' })
    },
  }
}
</script>

<style lang="scss">
.checkout-header {
  height: 84px;
}

.active-tab {
  &::before {
    border-bottom: 12px solid var(--primary);
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    content: "";
    height: 0;
    margin-right: -12px;
    position: absolute;
    right: 50%;
    top: 100%;
    width: 0;
    transform: rotate(180deg);
  }
}

.btn-checkout-back {
  position: absolute;
  top: 25px;
  bottom: 0;
  left: 20px;
  right: 0;
  width: 30px;
  height: 30px;
}
</style>
