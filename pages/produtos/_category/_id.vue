<template>
  <section>
    <Header currentPage="Produto detalhes" />
    <section class="container my-4 pb-4">
      <template v-if="!currentProduct">
        <!-- Loading -->
        <template v-if="loading">
          <div class="d-flex justify-content-center">
            <div class="spinner-grow text-primary my-5 p-5" role="status">
              <span class="sr-only">Carregando...</span>
            </div>
          </div>
        </template>

        <!-- Product Not Found -->
        <template v-else>
          <b-container class="text-center my-5">
            <div class="d-flex justify-content-center align-items-center">
              <h1 class="h1 pl-3 pr-3 mt-2">OOPS!</h1>
              <Icon icon="ei:tag" :width="65" :height="65" />
            </div>

            <p class="h4 font-weight-normal text-secondary mt-3 mb-4 pb-1">
              Produto não encontrado
            </p>

            <b-button 
            variant="secondary"
            @click="handleBackHome"
            >Voltar para página inicial</b-button>
          </b-container>
        </template>
      </template>

      <template v-else>
        <b-breadcrumb
        class="bg-white border d-none d-md-flex mb-md-5 shadow-sm"
        :items="breadcrumbItems"
        ></b-breadcrumb>

        <b-row class="shadow-sm border bg-white">
          <b-col cols="12" class="p-0 pr-md-4">
            <b-row>
              <b-col class="py-0">
                <div
                v-if="hasProductImage(currentProduct.image64)"
                class="d-flex flex-column align-items-center justify-content-center border-right h-100 pb-5"
                >
                  <Icon icon="ei:archive" class="secondary" :width="150" :height="150" />
                  <p class="h4 text-secondary font-weight-normal">
                    Produto sem imagem
                  </p>
                </div>

                <b-link @click.prevent v-else>
                  <b-img
                  class="product-detail-img"
                  :src="currentProduct.image64"
                  ></b-img>
                </b-link>

                <div class="product-detail__btn-add-favorite">
                  <button
                  id="btnAddFavorite"
                  class="btn-handle-qtd text-primary"
                  @click="handleAddToFavorites">
                    <Icon
                    icon="ei:heart"
                    :width="45"
                    :height="45"
                    />
                  </button>
                  <b-tooltip target="btnAddFavorite" placement="top">
                    Adicionar como favorito
                  </b-tooltip>
                </div>
              </b-col>
              
              <b-col class="pt-4 mx-4 mx-md-0">
                <b-link @click.prevent>
                  <h1 class="h4 text-primary mb-3">{{ currentProduct.title }}</h1>
                </b-link>
                
                <div class="d-flex align-items-center justify-content-start mb-3">
                  <p class="m-0 mr-5">
                    Cód.: <span class="text-primary">{{ currentProduct.offerId }}</span>
                  </p>
                  <p class="m-0">
                    Marca: <span class="text-primary">{{ currentProduct.brand || '-' }}</span>
                  </p>
                </div>

                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex flex-column">
                    <p class="h1 font-weight-normal text-dark">
                      R$ {{ currentProduct.price.toFixed(2).replace('.', ',') }}
                    </p>
                    <template v-if="currentProduct.supplier.name">
                      <b-link class="h5 font-weight-normal text-secondary my-2">
                        {{ currentProduct.supplier.name }}
                      </b-link>
                      <p class="m-0" v-if="currentProduct.supplier.name">
                        <Icon
                        v-for="i in 5"
                        :key="i"
                        :icon="i > currentProduct.supplier.rating ? 'entypo:star' : 'emojione:star'"
                        :class="{'gray': ( i > currentProduct.supplier.rating )}" 
                        :width="20"
                        :height="20"
                        />
                      </p>
                    </template>
                  </div>
                </div>

                <div class="d-flex justify-content-end mt-3 py-4 border-top">
                  <div class="d-flex flex-column">
                    <div class="d-flex align-items-center mb-3">
                      <div class="d-flex flex-column w-100 mr-5">
                        <p class="h5 text-dark">Quantidade</p>
                        <b-form-input
                        class="shadow-sm text-center mb-3"
                        v-model="quantity"
                        ></b-form-input>
                      </div>

                      <div class="d-flex flex-column w-100 text-right">
                        <p class="h5 text-dark">Subtotal</p>
                        <p class="h5 text-dark">
                          R$ {{ (currentProduct.price * quantity).toFixed(2).replace('.', ',') }}
                        </p>
                      </div>
                    </div>

                    <b-button
                    variant="primary"
                    size="lg"
                    @click="handleAddToCart">
                    Adicionar ao carrinho
                    </b-button>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-row class="bg-white border shadow-sm mx-md-1 my-5 p-4">
          <h2 class="mb-4">Descrição completa</h2>
          <p v-for="i in 5" :key="i">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Facilis tenetur tempore ea doloribus voluptatem deserunt culpa possimus nihil libero,
            nulla aut nobis quibusdam, eum enim tempora voluptatibus quidem sit quo.
          </p>
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
    Header,
  },
  
  data() {
    return {
      loading: true,
      quantity: 1,
      currentProduct: null,

      breadcrumbItems: [
        { text: 'Whitelabel Ecommerce PWA' },
        { text: 'Produtos' },
        { text:  this.$route.params.category },
        { text:  this.$route.params.id },
        { text: 'Detalhes' }
      ],
    }
  },

  created() {
    const supplierId = this.$route.params.category
    const productId = this.$route.params.id

    if (!supplierId || !productId || supplierId == 0 || productId == 0) {
      this.loading = false
      return false
    }

    const self = this
    // this.setCurrentPage('Produto detalhes')
    
    this.fetchProductById({ supplierId, productId })
    .then(({ data }) => {
      self.currentProduct = { ...data, quantidade: 1 }
      self.breadcrumbItems[2] = self.currentProduct.offerId
      self.breadcrumbItems[3] = self.currentProduct.title
      self.loading = false
    }).catch(error => {
      this.loading = false
    })
  },

  computed: {
    ...mapState({
      user: state => state.user,
      cartItems: state => state.cart.cartItems,
      groupsList: state => state.group.groupsList,
      offers: state => state.offer.offersList,
    }),
  },

  methods: {
    ...mapActions([
      'fetchGroupsList',
      'fetchProducts',
      'fetchProductById',
      'cartAddItem',
      'cartUpdateItemQuantity',
      'favoriteAddItem',
      'setCurrentPage',
      'setToast'
    ]),

    handleBackHome() {
      this.$router.push({ name: 'index' })
    },

    handleAddToFavorites() {
      this.favoriteAddItem(this.currentProduct)
      this.setToast({
        type: 'success',
        title: 'Parabéns!',
        content: 'Produto adicionado aos favoritos.'
      })
    },

    handleAddToCart() {
      let { cartItems, currentProduct, quantity } = this
      quantity = parseInt(quantity)

      const hasOnCart = cartItems.find(p => p.offerId == currentProduct.offerId)
      
      let toastTitle = 'Parabéns!'
      let toastContent = 'Produto adicionado ao carrinho'
      
      if (!hasOnCart) {
        this.cartAddItem({ ...currentProduct, quantidade: quantity })
      } else {
        const newQty = parseInt(hasOnCart.quantidade + quantity)
        this.cartUpdateItemQuantity({ item: currentProduct, quantidade: newQty })
        toastTitle = 'Atenção!'
        toastContent = 'Produto já existe no carrinho.<br/>Quantidade alterada com sucesso.'
      }
      
      this.setToast({
        type: 'success',
        title: toastTitle,
        content: toastContent
      })

      const self = this
      setTimeout(() => {
        self.$router.push({ name: 'carrinho' })
      }, 1500)
    },

    hasProductImage(productImage) {
      return _.isEmpty(productImage)
    },
  }
}
</script>

<style lang="scss">
.product-detail-img {
  width: 700px;
  min-height: 500px;
}

.product-detail__btn-add-favorite {
  position: absolute;
  top: 10px;
  left: auto;
  right: 20px;
}
</style>
