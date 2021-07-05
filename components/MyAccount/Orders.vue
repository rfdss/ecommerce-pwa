<template>
  <section class="d-flex flex-column align-items-center mt-4 mt-md-5">
    <p class="h5 text-dark d-block d-md-none mb-4">Meus pedidos</p>
    <p class="h2 text-dark d-none d-md-block mb-4">Meus pedidos</p>

    <b-form-group class="mb-3">
      <b-form-radio-group
      v-model="orderStatus"
      :options="orderStatusOptions"
      buttons
      button-variant="outline-primary"
      id="orderStatus"
      name="orderStatus"
      ref="orderStatus"
      ></b-form-radio-group>
    </b-form-group>

    <template v-if="loading">
      <div class="d-flex justify-content-center">
        <div class="spinner-grow text-primary my-5 p-5" role="status">
          <span class="sr-only">Carregando...</span>
        </div>
      </div>
    </template>

    <template v-else>
      <b-row class="py-3">
        <template v-if="ordersList.length <= 0">
          <b-container class="text-center my-5">
            <div class="d-flex justify-content-center align-items-center">
              <h1 class="h3 mr-4 mt-2">OOPS!</h1>
              <Icon icon="simple-line-icons:list" :width="40" :height="40" />
            </div>

            <p class="h5 font-weight-normal text-secondary mt-3 mb-4 pb-1">
              Sem pedidos em histórico
            </p>
          </b-container>
        </template>

        <template v-else>
          <b-col
          v-for="order in ordersList"
          :key="order.id"
          class="p-0"
          cols="12"
          md="4"
          >
            <div>
              <b-card class="mb-4 px-3 shadow-sm">
                <b-card-title class="text-dark">
                  Pedido <span class="text-primary">#{{ order.id }}</span>
                </b-card-title>

                <b-badge class="mb-3" pill variant="secondary">
                  <span class="font-small-15 font-weight-normal">
                    {{ order.status }}
                  </span>
                </b-badge>

                <b-card-text class="text-dark mb-1">
                  <span class="font-weight-bold">Data:</span> {{ formatDate(order.insertDate) }}
                </b-card-text>

                <b-card-text class="text-dark mb-1">
                  <span class="font-weight-bold">Qtd. itens:</span> {{ order.orderCustomerItems.length }}
                </b-card-text>

                <b-card-text class="text-dark mb-3">
                  <span class="font-weight-bold">Total:</span> R$ {{ order.totalOrder.toFixed(2).replace('.', ',') }}
                </b-card-text>
                
                <!-- <b-card-text class="text-dark mb-3">
                  <span class="font-weight-bold">Fornecedor:</span> {{ order.supplier.name }}
                </b-card-text> -->
                
                <b-button variant="primary" size="sm" @click="handleOrderDetail(order.id)">
                  Visualizar pedido
                </b-button>
              </b-card>
            </div>
          </b-col>
        </template>
      </b-row>
    </template>
  </section>
</template>

<script>
import Icon from '@/components/Icon'

import _ from 'lodash'
import dayjs from 'dayjs'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Icon,
  },

  data() {
    return {
      loading: true,
      orderStatus: 1,
      orderStatusOptions: [
        { text: 'Em andamento', value : 1 },
        { text: 'Histórico', value: 0 }
      ],
    }
  },

  async created() {
    await this.fetchOrdersList(this.orderStatus)
    this.loading = false
  },

  watch: {
    async orderStatus() {
      this.loading = true
      await this.fetchOrdersList(this.orderStatus)
      this.loading = false
    }
  },

  computed: {
    ...mapState({
      user: state => state.user,
      ordersList: state => state.order.ordersList
    }),
  },

  methods: {
    ...mapActions([
      'fetchOrdersList',
      'fetchOrder',
      'setSidebarCurrentItem',
    ]),

    handleOrderDetail(orderId) {
      this.fetchOrder({ orderId: orderId, status: orderStatus })
      this.setSidebarCurrentItem('order-detail')
    },

    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },
  }
}
</script>

<style>
</style>
