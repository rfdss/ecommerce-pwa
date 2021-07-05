<template>
  <section class="container">
    <b-row align-h="center" class="my-5">
      <div class="d-flex justify-content-center" v-if="loading">
        <div class="spinner-grow text-primary my-5 p-5" role="status">
          <span class="sr-only">Carregando...</span>
        </div>
      </div>
      
      <b-col cols="12" md="8" lg="8" class="bg-white border px-0 py-4 rounded shadow-sm" v-if="!loading">
        <b-row class="m-0 p-0 ml-2 mb-4">
          <b-col>
            <p class="h4 text-dark">Itens do pedido</p>
          </b-col>
        </b-row>

        <b-row class="d-none d-md-flex ml-4">
          <b-col cols="12" md="6" lg="8" class="p-0 pr-md-3">
            <span class="h5 text-dark">Produto</span>
          </b-col>

          <b-col cols="12" md="3" lg="2" class="p-0 pr-md-5 text-center">
            <span class="h5 text-dark">Quantidade</span>
          </b-col>

          <b-col cols="12" md="3" lg="2" class="p-0 pr-md-5 text-center">
            <span class="h5 text-dark">Subtotal</span>
          </b-col>
        </b-row>

        <b-row 
        class="bg-white border shadow-sm my-4 mx-4 rounded"
        v-for="(item, index) in cartItems" :key="index"
        >
          <b-col cols="12" md="8" class="p-0 border-bottom">
            <div :class="{
              'd-flex flex-column flex-md-row': true,
              'justify-content-start align-items-center': true,
              'h-100 py-3 px-3': true,
            }">
              <div class="d-none d-md-block mr-4">
                <b-link @click.prevent>
                  <b-img
                  v-if="item.image64"
                  :src="item.image64"
                  width="150"
                  height="100"
                  ></b-img>

                  <b-img
                  v-else
                  src="~/static/no-image.png"
                  width="150"
                  height="100"
                  ></b-img>
                </b-link>
              </div>

              <div class="d-flex flex-column justify-content-center">
                <b-link @click.prevent class="h6 text-primary">{{ item.title }}</b-link>
                <p class="h5">R$ {{ item.price.toFixed(2).replace('.', ',') }}</p>
                <b-link class="h6 text-dark">{{ item.supplier.name || 'Sem fornecedor cadastrado' }}</b-link>
                <div v-if="item.supplier.name">
                  <Icon 
                  v-for="i in 5"
                  :key="i"
                  :icon="i > item.supplier.rating ? 'entypo:star' : 'emojione:star'"
                  :class="{'gray': ( i > item.supplier.rating )}" 
                  :width="20"
                  :height="20"
                  />
                </div>

                <div class="d-block d-md-none mt-2">
                  <p class="h6 text-primary">
                    {{ item.quantidade }} itens
                  </p>
                  <p class="h6 text-primary">
                    <span class="text-dark">Total:</span> R$ {{ (item.price * item.quantidade).toFixed(2).replace('.', ',') }}
                  </p>
                </div>
              </div>
            </div>
          </b-col>
          
          <b-col cols="12" md="2" class="">
            <div :class="{
              'd-none d-md-flex flex-column': true,
              'justify-content-center align-items-center': true,
              'border-bottom h-100 p-0 py-4 py-md-0': true,
            }">
              <p class="h4 text-primary m-0">
                <span class="d-inline d-md-none">Quantidade: </span>{{ item.quantidade }}
              </p>
            </div>
          </b-col>

          <b-col cols="12" md="2" class="p-0 py-4 border-bottom d-none d-md-flex">
            <div class="d-flex flex-column align-items-center justify-content-center h-100">
              <p class="h4 text-primary m-0">
                <span class="d-inline d-md-none">Subtotal: </span>R$ {{ (item.price * item.quantidade).toFixed(2).replace('.', ',') }}
              </p>
            </div>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="12" md="4" lg="4" class="my-5 mt-md-0 px-0 px-md-4" v-if="!loading">
        <p class="h4 text-dark mb-0 text-center">Resumo do pedido</p>

        <b-card class="mt-3">
          <div class="d-flex justify-content-between">
            <p>Subtotal ({{ cartItems.length }} produtos)</p>
            <p>R$ {{ cartAmount.replace('.', ',') }}</p>
          </div>

          <div class="d-flex justify-content-between">
            <p>CEP de entrega</p>
            <p>{{ formatCep(user.customer.deliveryAddress.cep) }}</p>
          </div>

          <div class="d-flex justify-content-between">
            <p>Frete</p>
            <p>Grátis</p>
          </div>

          <div class="d-flex align-items-center justify-content-between text-dark font-weight-bold py-3 border-top">
            <p class="h5 mb-0">Total</p>
            <p class="h5 mb-0" >R$ {{ cartAmount.replace('.', ',') }}</p>
          </div>

          <div class="d-flex justify-content-between pt-4 border-top">
            <!-- <b-link class="w-100"> -->
              <b-button variant="success" class="w-100" @click="handleNext">Próximo</b-button>
            <!-- </b-link> -->
          </div>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import Icon from '@/components/Icon'

import _ from 'lodash'
import dayjs from 'dayjs'
import { mapActions, mapState } from 'vuex'

export default {
  layout: 'checkout-layout',
  components: {
    Icon,
  },

  data() {
    return {
      loading: true,
    }
  },

  created() {
    const self = this

    setTimeout(() => {
      self.loading = false
    }, 1000)

    this.calculateCartAmount()
    this.setCheckoutCurrentStep('order-review')
  },

  computed: {
    ...mapState({
      user: state => state.user,
      cartItems: state => state.cart.cartItems,
      cartAmount: state => state.cart.amount,
    }),
  },

  methods: {
    ...mapActions([
      'calculateCartAmount',
      'setCheckoutCurrentStep',
    ]),

    handleNext() {
      this.$router.push({ name: 'checkout-entrega' })
    },

    formatCep(cep) {
      return `${cep.substring(0,5)}-${cep.substring(5)}`
    }
  }
}
</script>

<style>
</style>