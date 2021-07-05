<template>
  <section>
    <Header currentPage="Carrinho" />
    <section>
      <b-container class="my-4 pb-4">
        <template v-if="cartItems.length <= 0">
          <b-container class="text-center my-5">
            <div class="d-flex flex-column flex-md-row justify-content-center align-items-center">
              <h1 class="h1 pl-md-3 pr-md-4 mb-3 mb-md-1">Meu Carrinho</h1>
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

        <template v-else>
          <b-row>
            <b-col
            class="px-0 px-md-4 pr-md-5"
            cols="12"
            md="8"
            lg="8"
            >
              <h1 class="h2 text-center text-md-left mb-3 d-none d-md-block">Meu Carrinho</h1>
              <h1 class="h4 text-center text-md-left mb-3 d-block d-md-none">Meu Carrinho</h1>

              <!-- CUSTOM TABLE - HEADER -->
              <b-row class="d-none d-md-flex m-1 mt-4">
                <b-col cols="12" md="6" lg="8" class="p-0 pr-3">
                  <span class="h5 text-dark">Produto</span>
                </b-col>

                <b-col cols="12" md="3" lg="2" class="p-0 pr-3 text-center">
                  <span class="h5 text-dark">Quantidade</span>
                </b-col>

                <b-col cols="12" md="3" lg="2" class="p-0 pl-3 text-center">
                  <span class="h5 text-dark">Subtotal</span>
                </b-col>
              </b-row>

              <!-- CUSTOM TABLE - BODY -->
              <b-row 
              class="bg-white border shadow-sm my-4"
              v-for="(item, index) in cartItems" :key="index"
              >
                <!-- CUSTOM TABLE - TR (Produto) -->
                <b-col
                class="p-0 border-bottom"
                cols="12"
                md="8"
                >
                  <!-- CUSTOM TABLE - TD (Produto) -->
                  <div :class="{
                    'd-flex flex-row flex-md-row': true,
                    'justify-content-start align-items-center': true,
                    'h-100 py-3 py-md-4 pr-4 pr-md-4': true,
                  }">
                    <div class="h-100 mr-3 mr-md-4">
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

                      <template v-if="item.todayPrice > 0">
                        <p class="h5 text-danger line-through">
                          R$ {{ item.price.toFixed(2).replace('.', ',') }}
                        </p>

                        <p class="h5 text-dark">
                          R$ {{ item.todayPrice.toFixed(2).replace('.', ',') }}
                        </p>
                      </template>

                      <p class="h5 text-dark" v-else>
                        R$ {{ item.price.toFixed(2).replace('.', ',') }}
                      </p>

                      <b-link class="h6 text-dark">{{ item.supplier.name }}</b-link>
                      <div>
                        <Icon 
                        v-for="i in 5"
                        :key="i"
                        :icon="i > item.supplier.rating ? 'entypo:star' : 'emojione:star'"
                        :class="{'gray': ( i > item.supplier.rating )}" 
                        :width="20"
                        :height="20"
                        />
                      </div>
                    </div>
                  </div>
                </b-col>
                
                <!-- CUSTOM TABLE - TR (Quantidade) -->
                <b-col
                class="p-0 pt-4 pb-3 py-md-0 border-bottom"
                cols="12"
                md="2"
                >
                  <!-- CUSTOM TABLE - TD (Quantidade) -->
                  <div :class="{
                    'd-flex flex-row flex-md-column justify-content-center align-items-center': true,
                    'justify-content-start align-items-center': true,
                    'h-100 py-md-4 px-4 px-md-0 pr-md-4': true,
                  }">
                    <div class="w-100 mr-3 mr-md-0">
                      <b-form-input
                      v-model="productsVModel[item.offerId]"
                      class="shadow-sm text-center mb-md-3"
                      :value="item.quantidade"
                      :ref="`iptProduct${item.offerId}`"
                      ></b-form-input>
                    </div>
                    
                    <div class="d-flex flex-column w-100 ml-3 ml-md-0">
                      <b-button 
                      class="w-100 mb-2" 
                      size="sm" 
                      @click="handleUpdateQuantity(item)"
                      >Atualizar</b-button>

                      <b-button 
                      class="w-100"
                      size="sm"
                      variant="outline-danger"
                      @click="handleRemoveItem(item)"
                      >Remover</b-button>
                    </div>
                  </div>
                </b-col>

                <!-- CUSTOM TABLE - TR (Subtotal) -->
                <b-col
                class="p-0 py-4 py-md-0 border-bottom d-none d-md-block"
                cols="12"
                md="2"
                >
                  <!-- CUSTOM TABLE - TD (Subtotal) -->
                  <div :class="{
                    'd-flex flex-column': true,
                    'justify-content-center align-items-center': true,
                    'h-100 py-md-4': true,
                  }">
                    <p class="h4 text-primary m-0" v-if="item.todayPrice > 0">
                      R$ {{ (item.todayPrice * item.quantidade).toFixed(2).replace('.', ',') }}
                    </p>

                    <p class="h4 text-primary m-0" v-else>
                      R$ {{ (item.price * item.quantidade).toFixed(2).replace('.', ',') }}
                    </p>
                  </div>
                </b-col>
              </b-row>
            </b-col>

            <!-- CART RESUME BOX -->
            <b-col
            class="px-0 pr-md-0"
            :class="{'always-on-top': hasCepError}"
            cols="12"
            md="4"
            lg="4"
            >
              <div class="d-flex justify-content-between">
                <p class="h4 mb-0 ml-2" :class="{'text-white': hasCepError}">Resumo do pedido</p>
                <b-link class="h4 mr-2 mb-0" @click.prevent="handleCloseOverlay" v-if="hasCepError">
                  <Icon icon="ei:close" color="#fff" :height="30" :width="30" />
                </b-link>
              </div>

              <b-card class="mt-3">
                <div class="d-flex justify-content-between">
                  <p>Subtotal ({{ cartItems.length }} produtos)</p>
                  <p>R$ {{ cartAmount }}</p>
                </div>

                <div class="d-flex justify-content-between">
                  <p>Frete</p>
                  <p>Grátis</p>
                </div>

                <div class="d-flex align-items-center justify-content-between font-weight-bold py-3 border-top">
                  <p class="h5 mb-0">Total</p>
                  <p class="h5 mb-0" >R$ {{ cartAmount.replace('.', ',') }}</p>
                </div>

                <div class="d-flex flex-column justify-content-between pt-4 border-top">
                  <label for="iptDeliveryCEP">CEP de entrega</label>
                  <b-form-input
                  v-model="userAddressCep"
                  class="shadow-sm"
                  :class="{'mb-4': !hasCepError, 'border border-danger text-danger mb-3': hasCepError}"
                  :disabled="user.id ? true : false"
                  id="iptDeliveryCEP"
                  placeholder="Digite seu CEP (apenas números)"
                  ></b-form-input>
                  
                  <p class="label-error font-weight-normal text-danger mb-4" v-if="hasCepError">
                    * CEP obrigatório para continuar
                  </p>

                  <b-link
                  class="w-100"
                  @click.prevent="handleSetUserAddressCEP"
                  >
                    <b-button
                    variant="success"
                    class="w-100"
                    >Próximo</b-button>
                  </b-link>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </template>
      </b-container>
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
      userAddressCep: '',
      hasCepError: false,
      productsVModel: [],
    }
  },

  created() {
    this.calculateCartAmount()

    if (this.user.id && this.user.hasOwnProperty('id')) {
      this.userAddressCep = this.user.customer.deliveryAddress.cep || ''
    }

    this.cartItems.forEach(item => {
      this.productsVModel[item.offerId] = parseInt(item.quantidade)
    })
  },

  computed: {
    ...mapState({
      user: state => state.user,
      cartItems: state => state.cart.cartItems,
      cartAmount: state => state.cart.amount,
    }),
  },

  watch: {
    userAddressCep(newValue) {
      if (newValue != null && newValue != '') {
        this.hasCepError = false
        this.setOverlay(null)
      }
    }
  },
  
  methods: {
    ...mapActions([
      'fetchGroupsList',
      'cartUpdateItemQuantity',
      'cartRemoveItem',
      'calculateCartAmount',
      'resetCart',
      'setUserData',
      'setOverlay',
      'setToast'
    ]),

    async handleSetUserAddressCEP() {
      const self = this
      let userAddressCep = this.userAddressCep

      if (!this.user.hasOwnProperty('id')) {
        await this.$axios.get(`https://viacep.com.br/ws/${userAddressCep}/json/`)
        .then(({ data }) => {

          const guestUserAddress = {
            cep: data.cep.replace('-', ''),
            street: data.logradouro,
            number: 0,
            complement: data.complemento,
            district: data.bairro,
            city: data.localidade,
            state: data.uf
          }

          localStorage.setItem('guestUserAddress', JSON.stringify(guestUserAddress))
          localStorage.removeItem('isAddressChanged')

          self.hasCepError = false
          self.$router.push({ name: 'carrinho-revisao' })
        })
        .catch(error => {
          self.hasCepError = true
          self.setOverlay({ box: 'cartResume', open: true })
        })
        
      } else {
        localStorage.removeItem('isAddressChanged')
        this.$router.push({ name: 'carrinho-revisao' })
        this.hasCepError = false
      }
    },

    setUserAddressData(obj, data) {
      obj.address.cep = data.cep.replace('-', '')
      obj.address.street = data.logradouro
      obj.address.complement = data.complemento
      obj.address.district = data.bairro
      obj.address.city = data.localidade
      obj.address.state = data.uf
    },

    handleBackEmptyCart() {
      this.$router.push({ name: 'busca' })
    },

    handleResetCart() {
      this.resetCart()
    },

    handleUpdateQuantity(item) {
      const qty = parseInt(this.productsVModel[item.offerId])

      if (qty > 0) {
        this.cartUpdateItemQuantity({ item: item, quantidade: qty })
        this.setToast({
          type: 'success',
          title: 'Atenção!',
          content: 'Quantidade alterada com sucesso'
        })
      } else {
        this.setToast({
          type: 'danger',
          title: 'Atenção!',
          content: 'Para remover um item clique no botão Remover',
        })
      }
    },

    handleRemoveItem(item) {
      this.cartRemoveItem(item.offerId)
      this.setToast({
        type: 'success',
        title: 'Atenção!',
        content: 'Item removido com sucesso'
      })
    },

    handleCloseOverlay() {
      this.setOverlay(null)
      this.hasCepError = false
    }
  }
}
</script>

<style lang="scss">
</style>
