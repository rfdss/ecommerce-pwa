<template>
  <!-- <section class="d-flex flex-column justify-content-center align-items-center align-items-md-start mt-5"> -->
  <section class="mt-5">
    <template v-if="currentOrder && loading">
      <div class="d-flex justify-content-center">
        <div class="spinner-grow text-primary my-5 p-5" role="status">
          <span class="sr-only">Carregando...</span>
        </div>
      </div>
    </template>

    <template v-else>
      <section class="d-flex flex-column flex-md-row align-items-center mb-4">
        <span class="h2 text-dark m-0 mb-3 mb-md-0">
          Pedido <span class="text-primary">#{{ currentOrder.id }}</span>
        </span>

        <b-badge class="mb-3 mb-md-0 ml-3 p-0 p-2" pill variant="dark">
          <span class="h6 font-weight-normal">
            Data: {{ formatDate(currentOrder.insertDate) }}
          </span>
        </b-badge>

        <b-badge class="mb-3 mb-md-0 ml-3 p-0 p-2" pill variant="success">
          <span class="h6 font-weight-normal">
            Total: R$ {{ currentOrder.totalOrder.toFixed(2).replace('.', ',') }}
          </span>
        </b-badge>

        <b-badge class="mb-3 mb-md-0 ml-3 p-0 p-2" pill variant="primary">
          <span class="h6 font-weight-normal">
            Status: {{ currentOrder.status }}
          </span>
        </b-badge>
      </section>

      <b-row>
        <b-col cols="12" md="6">
          <b-card class="mb-4 shadow-sm">
            <b-card-title class="text-primary">
              Meus dados
            </b-card-title>

            <b-card-text class="text-dark mb-2">
              <span class="font-weight-bold">ID: </span> {{ currentOrder.customer.id || '-' }}
            </b-card-text>

            <b-card-text class="text-dark mb-2">
              <span class="font-weight-bold">Nome/Razão social:</span> {{ currentOrder.customer.name || '-' }}
            </b-card-text>

            <b-card-text class="text-dark mb-2">
              <span class="font-weight-bold">Nome fantasia:</span> {{ currentOrder.customer.tradeName || '-' }}
            </b-card-text>

            <b-card-text class="text-dark mb-2">
              <span class="font-weight-bold">CPF/CNPJ:</span> {{ currentOrder.customer.cnpj || '-' }}
            </b-card-text>

            <b-card-text class="text-dark mb-2">
              <span class="font-weight-bold">E-mail contato:</span> {{ currentOrder.customer.orderEmail || '-' }}
            </b-card-text>

            <b-card-text class="text-dark mb-2">
              <span class="font-weight-bold">E-mail NFe:</span> {{ currentOrder.customer.emailNFE || '-'}}
            </b-card-text>

            <b-card-text class="text-dark mb-2">
              <span class="font-weight-bold">Inscrição Estadual:</span> {{ currentOrder.customer.ie || '-' }}
            </b-card-text>
          </b-card>
        </b-col>

        <b-col cols="12" md="6">
          <b-card class="mb-4 shadow-sm">
            <b-card-title class="text-primary">
              Dados de pagamento
            </b-card-title>

            <b-card-text class="text-dark mb-2">
              <span class="font-weight-bold">Tipo de pagamento: </span> {{ formatSlipBank(currentOrder.payment.slipBank) }}
            </b-card-text>

            <b-card-text class="text-dark mb-2">
              <span class="font-weight-bold">Titular:</span> {{ currentOrder.payment.personName || '-' }}
            </b-card-text>

            <b-card-text class="text-dark mb-2">
              <span class="font-weight-bold">Cartão:</span> {{ currentOrder.payment.cardNumber || '-' }}
            </b-card-text>

            <b-card-text class="text-dark mb-2">
              <span class="font-weight-bold">Bandeira:</span> {{ currentOrder.payment.companyName || '-' }}
            </b-card-text>

            <b-card-text class="text-dark mb-2">
              <span class="font-weight-bold">Data validade:</span> {{ formatDate(currentOrder.payment.validateDate) || '-' }}
            </b-card-text>

            <b-card-text class="text-dark mb-2">
              <span class="font-weight-bold">Tipo de cartão:</span> {{ currentOrder.payment.cardType || '-' }}
            </b-card-text>
            
            <b-card-text class="text-dark mb-2">
              <span class="font-weight-bold">Status:</span> {{ currentOrder.status }}
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>

      <b-card class="mb-4 shadow-sm">
        <b-card-title class="text-primary">
          Dados de entrega
        </b-card-title>

        <b-card-text class="text-dark mb-2">
          <span class="font-weight-bold">CEP: </span> {{ currentOrder.deliveryAddress.cep || '-' }}
        </b-card-text>

        <b-card-text class="text-dark mb-2">
          <span class="font-weight-bold">Endereço:</span> {{ currentOrder.deliveryAddress.street || '-' }}
        </b-card-text>

        <b-card-text class="text-dark mb-2">
          <span class="font-weight-bold">Número:</span> {{ currentOrder.deliveryAddress.number || '-' }}
        </b-card-text>

        <b-card-text class="text-dark mb-2">
          <span class="font-weight-bold">Complemento:</span> {{ currentOrder.deliveryAddress.complement || '-' }}
        </b-card-text>

        <b-card-text class="text-dark mb-2">
          <span class="font-weight-bold">Bairro:</span> {{ currentOrder.deliveryAddress.district || '-' }}
        </b-card-text>

        <b-card-text class="text-dark mb-2">
          <span class="font-weight-bold">Cidade:</span> {{ currentOrder.deliveryAddress.city || '-' }}
        </b-card-text>

        <b-card-text class="text-dark mb-2">
          <span class="font-weight-bold">Estado:</span> {{ currentOrder.deliveryAddress.state || '-'}}
        </b-card-text>
      </b-card>

      <b-card class="mb-4 shadow-sm">
        <b-card-title class="text-primary">
          Itens do pedido
        </b-card-title>

        <b-card-text class="text-dark mb-1">
          <span class="font-weight-bold">Quantidade de itens:</span> {{ currentOrder.orderCustomerItems.length }}
        </b-card-text>

        <b-row class="d-none d-md-flex m-1 mt-4">
          <b-col cols="12" md="6" lg="8" class="p-0 pr-3">
            <span class="h5 text-dark">Produto</span>
          </b-col>

          <b-col cols="12" md="3" lg="2" class="p-0 pr-3 text-center">
            <span class="h5 text-dark">Quantidade</span>
          </b-col>

          <b-col cols="12" md="3" lg="2" class="p-0 pr-3 text-center">
            <span class="h5 text-dark">Subtotal</span>
          </b-col>
        </b-row>

        <b-row 
        class="bg-white border shadow-sm my-4 mx-1"
        v-for="(item, index) in currentOrder.orderCustomerItems" :key="index"
        >
          <b-col cols="12" md="8" class="p-0 pr-4">
            <div class="d-flex flex-column flex-md-row justify-content-start align-items-center h-100">
              <div class="mr-4 d-none d-md-block">
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
                <b-link @click.prevent class="h6 text-primary my-4 my-md-0">{{ item.offerTitle }}</b-link>
                <p class="h5 mb-4 mb-md-0">R$ {{ item.price.toFixed(2).replace('.', ',') }}</p>
                <!-- <b-link class="h6 text-dark">{{ item.supplier.name }}</b-link> -->
                <!-- <div>
                  <Icon 
                  v-for="i in 5"
                  :key="i"
                  :icon="i > item.supplier.rating ? 'entypo:star' : 'emojione:star'"
                  :class="{'gray': ( i > item.supplier.rating )}" 
                  :width="20"
                  :height="20"
                  />
                </div> -->

                <div class="d-block d-md-none mb-4 mb-md-0">
                  <p class="h6 text-primary">
                    {{ item.quantity }} itens
                  </p>
                  <p class="h6 text-primary">
                    <span class="text-dark">Subtotal: </span>R$ {{ (item.price * item.quantity).toFixed(2).replace('.', ',') }}
                  </p>
                </div>

              </div>
            </div>
          </b-col>
          
          <b-col cols="12" md="2" class="d-none d-md-flex">
            <div class="d-flex flex-column align-items-center justify-content-center h-100 text-center">
              <p class="h4 text-primary">{{ item.quantity }}</p>
            </div>
          </b-col>

          <b-col cols="12" md="2" class="d-none d-md-flex p-0">
            <div class="d-flex flex-column align-items-center justify-content-center h-100 pr-2">
              <p class="h4 text-primary">R$ {{ (item.price * item.quantity).toFixed(2).replace('.', ',') }}</p>
            </div>
          </b-col>
        </b-row>
      </b-card>
    </template>
  </section>
</template>

<script>
import _ from 'lodash'
import dayjs from 'dayjs'
import { mapActions, mapState } from 'vuex'

export default {
  components: {},

  data() {
    return {
      loading: true,
      slipBankOptions: [
        { value: 0, text: 'Pagamento online' },
        { value: 1, text: 'Boleto antecipado' },
      ],
      currentOrder: {}
    }
  },

  created() {
    const self = this
    setTimeout(() => {
      if (self.currentOrderStored != null) {
        self.currentOrder = { ...self.currentOrderStored, payment: {}}
        self.loading = false
      }
    }, 1500)
  },

  computed: {
    ...mapState({
      currentOrderStored: state => state.order.currentOrder
    }),
  },

  methods: {
    formatDate(date) {
      return dayjs(date).format('DD/MM/YYYY')
    },

    formatSlipBank(value) {
      const option = this.slipBankOptions.find(option => option.value == value)
      return (option) ? option.text : '-'
    }
  }
}
</script>

<style lang="scss">
</style>
