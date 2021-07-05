<template>
  <section>
    <Header currentPage="Carrinho revisão" />
    <section class="container my-4 pb-4">
      <template v-if="cartItems.length <= 0">
        <template v-if="loading">
          <div class="d-flex justify-content-center">
            <div class="spinner-grow text-primary my-5 p-5" role="status">
              <span class="sr-only">Carregando...</span>
            </div>
          </div>
        </template>

        <template v-else>
          <b-container class="text-center my-5">
            <div class="d-flex justify-content-center align-items-center">
              <h1 class="h1 pl-3 pr-4 mb-1">Meu Carrinho</h1>
              <Icon icon="ei:cart" :width="60" :height="60" />
            </div>

            <p class="h4 font-weight-normal text-secondary mt-3 mb-4">
              Seu carrinho está vazio
            </p>

            <b-button 
            variant="secondary"
            @click="handleBackEmptyCart"
            >Voltar e adicionar produtos</b-button>
          </b-container>
        </template>
      </template>

      <template v-else>
        <b-row>
          <b-col cols="12" md="8" lg="8" class="px-0 px-md-4 pr-md-5">
            <h1 class="h2 text-center text-md-left mb-3 d-none d-md-block">Meu Carrinho</h1>
            <!-- <h1 class="h4 text-center text-md-left mb-3 d-block d-md-none">Meu Carrinho</h1> -->
            
            <div class="w-100 text-center text-md-left mb-md-5" v-if="hasMinOrderValueError">
              <b-button
              class="mt-md-3"
              variant="secondary"
              @click="handleBackEmptyCart"
              >Voltar e adicionar produtos</b-button>
            </div>

            <b-row class="d-none d-md-flex m-1 mt-4">
              <b-col cols="12" md="5" lg="7" class="p-0 pr-3">
                <span class="h5 text-dark">Fornecedor</span>
              </b-col>

              <b-col cols="12" md="3" lg="2" class="p-0 pl-5 text-center">
                <span class="h5 text-dark">Qtd.</span>
              </b-col>

              <b-col cols="12" md="4" lg="3" class="p-0 pl-4 text-center">
                <span class="h5 text-dark">Subtotal</span>
              </b-col>
            </b-row>

            <b-row 
            class="bg-white border shadow-sm my-4"
            v-for="(item, index) in groupedCartItems" :key="index"
            >
              <b-col cols="12" md="8" class="p-0 border-bottom">
                <div :class="{
                  'd-flex flex-column flex-md-row': true,
                  'justify-content-start align-items-center': true,
                  'h-100 py-4 px-3': true,
                }">
                  <div class="d-none d-md-block mb-4 mb-md-0 mr-md-4">
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
                    <b-link @click.prevent class="h5 text-primary">
                      {{ item.supplierName }}
                    </b-link>
                    
                    <div class="mb-2">
                      <Icon 
                      v-for="i in 5"
                      :key="i"
                      :icon="i > item.supplierRating ? 'ei:star' : 'emojione:star'"
                      :class="{'yellow': ( i > item.supplierRating )}" 
                      :width="25"
                      :height="25"
                      />
                    </div>

                    <p class="h6 text-dark mb-3">
                      Entrega: <span class="font-weight-normal">{{ item.deliveryDays }}</span>
                    </p>

                    <p class="h5 text-primary d-block d-md-none">
                      {{ item.qtdItems }} itens
                    </p>

                    <p class="h5 text-primary d-block d-md-none">
                      <span class="text-dark">Total:</span> R$ {{ item.sumTotal.toFixed(2).replace('.', ',') }}
                    </p>

                    <p class="text-danger" v-if="item.hasMinOrderValueError">
                      * Valor minimo para este fornecedor<br/> é de R$ {{ item.minOrderValue.toFixed(2) }}
                    </p>
                  </div>
                </div>
              </b-col>
              
              <b-col cols="12" md="1" class="d-none d-md-block p-0">
                <div :class="{
                  'd-flex flex-column': true,
                  'justify-content-center align-items-center': true,
                  'border-right h-100 pr-4 py-4': true,
                }">
                  <p class="h4 text-primary">
                    {{ item.qtdItems }}
                  </p>
                </div>
              </b-col>

              <b-col cols="12" md="3" class="d-none d-md-block p-0">
                <div :class="{
                  'd-flex flex-column': true,
                  'justify-content-center align-items-center': true,
                  'h-100 pr-2 py-4': true,
                }">
                  <p class="h4 text-primary">R$ {{ item.sumTotal.toFixed(2).replace('.', ',') }}</p>
                </div>
              </b-col>
            </b-row>
          </b-col>

          <b-col cols="12" md="4" lg="4" class="px-0 pr-md-0">
            <p class="h4 mb-1 ml-2">Resumo do pedido</p>

            <b-card class="mt-3">
              <div class="d-flex justify-content-between">
                <p>Subtotal ({{ cartItems.length }} produtos)</p>
                <p>R$ {{ cartAmount }}</p>
              </div>

              <div class="d-flex justify-content-between">
                <p>Frete</p>
                <p>Grátis</p>
              </div>

              <!-- <div class="d-flex justify-content-between">
                <p>Desconto</p>
                <p>10%</p>
              </div> -->

              <div class="d-flex align-items-center justify-content-between font-weight-bold py-3 border-top">
                <p class="h5 mb-0">Total</p>
                <p class="h5 mb-0" >R$ {{ cartAmount }}</p>
              </div>

              <div class="d-flex justify-content-between pt-4 border-top">
                <b-link
                class="w-100"
                :to="!hasMinOrderValueError ? '/checkout' : ''"
                >
                  <b-button
                  variant="success"
                  class="w-100"
                  :disabled="hasMinOrderValueError"
                  >Ir para o checkout</b-button>
                </b-link>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </template>
    </section>
  </section>
</template>

<script>
import Icon from '@/components/Icon'
import Header from '@/components/Header'

import _ from 'lodash'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Icon,
    Header
  },
  
  data() {
    return {
      loading: true,
      groupedCartItems: [],
      hasMinOrderValueError: false,
    }
  },

  created() {
    this.validateCartItems()
  },

  computed: {
    ...mapState({
      user: state => state.user,
      cartItems: state => state.cart.cartItems,
      cartAmount: state => state.cart.amount
    }),
  },

  methods: {
    ...mapActions([
      'getMinOrderValues',
    ]),

    handleBackEmptyCart() {
      this.$router.push({ name: 'busca' })
    },

    async validateCartItems() {
      const { cartItems } = this
      
      let deliveryAddress = localStorage.getItem('guestUserAddress')
      deliveryAddress = JSON.parse(deliveryAddress)

      if (this.user && this.user.hasOwnProperty('id') && this.user.customer) {
        deliveryAddress = this.user.customer.deliveryAddress
      }

      const groupedList = _.groupBy(cartItems, 'supplierId')
      const uniqList = _.uniqBy(cartItems, 'supplierId')

      const getMinOrderValuesData = {
        cep: deliveryAddress.cep,
        suppliers: uniqList.map(item => {
          return { supplierId: item.supplierId }
        })
      }

      let minOrderValuesList = []

      await this.getMinOrderValues(getMinOrderValuesData)
      .then(({ data }) => {
        minOrderValuesList = data
      })
      .catch(({ response }) => {
        alert(response.data)
      })
      
      this.groupedCartItems = uniqList.map(item => {
        let {
          deliveryDays,
          supplierId,
          supplier: { name, rating },
        } = item

        const itemGroupedList = groupedList[item.supplierId]
        const qtdItems = itemGroupedList.length

        let sumTotal = _.sumBy(itemGroupedList, (item) => {
          const {
            promotionPrice, promotionQuantity, price, quantidade,
            promotionPrice2, promotionQuantity2, promotionPrice3, promotionQuantity3,
          } = item

          let auxPrice = price

          if (quantidade > promotionQuantity3 && promotionQuantity3 > 0 ) {
            auxPrice = promotionPrice3
            return quantidade * auxPrice
          }
          
          if (quantidade >  promotionQuantity2  && promotionQuantity2 > 0 ) {
            auxPrice = promotionPrice2
            return quantidade * auxPrice
          }
          
          if (quantidade >  promotionQuantity  && promotionQuantity > 0) {
            auxPrice = promotionPrice
            return quantidade * auxPrice
          }
          
          return quantidade * auxPrice
        })

        sumTotal = sumTotal.toFixed(2)

        const minOrderValue = minOrderValuesList.find(s => s.supplierId == supplierId).minOrderValue
        const minDeliveryDays = minOrderValuesList.find(s => s.supplierId == supplierId).minDeliveryTime
        const maxDeliveryDays = minOrderValuesList.find(s => s.supplierId == supplierId).maxDeliveryTime        
        const newDeliveryDays = "de " + minDeliveryDays + " dias até "+maxDeliveryDays + " dias"

        if (sumTotal < minOrderValue) {
          this.hasMinOrderValueError = true
        }

        return {
          supplierId,
          qtdItems,
          sumTotal: parseInt(sumTotal),
          supplierName: name,
          supplierRating: parseInt(rating),
          deliveryDays: newDeliveryDays || 'Sem entregas cadastradas',
          minOrderValue: minOrderValue,
          hasMinOrderValueError: this.hasMinOrderValueError
        }
      })

      if (this.hasMinOrderValueError) {
        localStorage.removeItem('isCartReviewOk')
      } else {
        localStorage.setItem('isCartReviewOk', 'true')
      }

      this.loading = false
    },
  }
}
</script>

<style>
</style>
