<template>
  <!-- <section :class="{'overflow-auto': overlayBox === 'search'}"> -->
  <section>
    <Header currentPage="Favoritos" />
    <section>
      <template v-if="favoriteItems.length <= 0">
        <b-container class="text-center my-5">
          <div class="d-flex flex-column flex-md-row justify-content-center align-items-center">
            <h1 class="h1 pl-md-3 pr-md-4 mb-3 mb-md-1">Meus favoritos</h1>
            <Icon icon="ei:heart" :width="60" :height="60" />
          </div>

          <p class="h4 font-weight-normal text-secondary mt-3 mb-4">
            Você ainda não tem nenhum<br/> produto favorito
          </p>
          
          <b-button 
          variant="secondary" 
          @click="handleBackEmptyFavorites"
          >Voltar e adicionar itens</b-button>
        </b-container>
      </template>

      <template v-else>
        <b-container class="mt-4">
          <h1 class="h2 text-center text-md-left mb-3 d-none d-md-block">Meus favoritos</h1>
          <h1 class="h4 text-center text-md-left mb-3 d-block d-md-none">Meus favoritos</h1>

          <b-row>
            <b-col
            v-for="(product, index) in favoriteItems" 
            :key="product.offerId + index"
            class="mb-3 mb-md-5 p-1 p-md-3"
            cols="6"
            md="3"
            >
              <b-card
                tag="article"
                class="product-card border shadow-sm h-100 w-100"
              >
                <b-link :to="`/produtos/${product.supplierId}/${product.offerId}`">
                  <b-card-img
                  v-if="product.image64"
                  class="border-bottom"
                  :src="product.image64">
                  </b-card-img>

                  <b-img
                  v-else
                  class="w-100 h-auto border-bottom"
                  src="~/static/no-image.png"
                  ></b-img>

                  <div class="p-3">
                    <b-card-title class="h6 font-weight-normal">
                      {{ product.title }}
                    </b-card-title>

                    <template v-if="product.todayPrice > 0">
                      <b-card-text class="h5 text-danger line-through">
                        R$ {{ product.price.toFixed(2).replace('.', ',') }}
                      </b-card-text>

                      <b-card-text class="h5 text-dark">
                        R$ {{ product.todayPrice.toFixed(2).replace('.', ',') }}
                      </b-card-text>
                    </template>

                    <b-card-text class="h5 text-dark" v-else>
                      R$ {{ product.price.toFixed(2).replace('.', ',') }}
                    </b-card-text>

                    <b-card-text class="h6 text-dark" v-if="product.promotionQuantity > 0">
                      <span class="font-weight-normal">
                        Acima de
                      </span>
                      {{ product.promotionQuantity }} {{ product.unit }} 
                      <span class="font-weight-normal">por</span>
                      R$ {{ product.promotionPrice.toFixed(2) }} / {{ product.unit }}
                    </b-card-text>

                    <b-card-text class="h6 text-dark" v-if="product.promotionQuantity2 > 0">
                      <span class="font-weight-normal">
                        Acima de
                      </span>
                      {{ product.promotionQuantity2 }} {{ product.unit }}
                      <span class="font-weight-normal">por</span>
                      R$ {{ product.promotionPrice2.toFixed(2) }} / {{ product.unit }}
                    </b-card-text>

                    <b-card-text class="h6 text-dark" v-if="product.promotionQuantity3 > 0">
                      <span class="font-weight-normal">
                        Acima de
                      </span>
                      {{ product.promotionQuantity3 }} {{ product.unit }}
                      <span class="font-weight-normal">por</span>
                      R$ {{ product.promotionPrice3.toFixed(2) }} / {{ product.unit }}
                    </b-card-text>

                    <b-card-text class="text-dark m-0">
                      {{ product.supplier.name }}
                    </b-card-text>
                    <b-card-text class="m-0">
                      <Icon 
                      v-for="i in 5"
                      :key="i"
                      :icon="i > product.supplierRating ? 'entypo:star' : 'emojione:star'"
                      :class="{'gray': ( i > product.supplierRating )}" 
                      :width="20"
                      :height="20"
                      />
                    </b-card-text>
                  </div>
                </b-link>

                <em slot="footer">
                  <div class="d-flex">
                    <b-form-input
                    type="number" 
                    min="1"
                    max="100"
                    v-model="favoritesVModels[product.offerId]"
                    :ref="`iptProduct${product.offerId}`"
                    ></b-form-input>

                    <button class="btn-handle-qtd text-primary ml-3" @click="handleAddToCart(product)">
                      <Icon icon="ei:cart" :width="40" :height="40" />
                    </button>

                    <button class="btn-handle-qtd text-primary" @click="handleRemoveFromFavorites(product)">
                      <Icon class="danger" icon="ei:close-o" :width="40" :height="40" />
                    </button>
                  </div>
                </em>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
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
      favoritesVModels: [],
    }
  },

  created() {
    this.favoriteItems.forEach(item => {
      this.favoritesVModels[item.offerId] = 1
    })
  },

  computed: {
    ...mapState({
      user: state => state.user,
      cartItems: state => state.cart.cartItems,
      favoriteItems: state => state.favorite.favoriteItems,
      overlayBox: state => state.overlay.box
    }),
  },

  methods: {
    ...mapActions([
      'cartAddItem',
      'cartUpdateItemQuantity',
      'favoriteRemoveItem',
      'setToast'
    ]),

    handleBackEmptyFavorites() {
      this.$router.push({ name: 'busca' })
    },

    handleRemoveFromFavorites(product) {
      this.favoriteRemoveItem(product.offerId)
      this.setToast({
        type: 'success',
        title: 'Atenção!',
        content: 'Item removido com sucesso'
      })
    },

    handleAddToCart(product) {
      const qty = parseInt(this.favoritesVModels[product.offerId])
      const hasOnCart = this.cartItems.find(p => p.offerId == product.offerId)
      let toastTitle = 'Parabéns!'
      let toastContent = 'Produto adicionado ao carrinho!'
      
      if (!hasOnCart) {
        this.cartAddItem({ ...product, quantidade: qty })
      } else {
        const newQty = parseInt(hasOnCart.quantidade + qty)
        this.cartUpdateItemQuantity({ item: product, quantidade: newQty })
        toastTitle = 'Atenção!'
        toastContent = 'Produto já existe no carrinho.<br/>Quantidade alterada com sucesso.'
      }
      
      this.setToast({
        type: 'success',
        title: toastTitle,
        content: toastContent
      })
    }
  }
}
</script>

<style lang="scss">

.bannerSwiper {
  .swiper-pagination {
    padding-bottom: 1rem;
  }

  .swiper-button-prev,
  .swiper-button-next {
    top: 9.5rem;
    padding: 0 4rem;
  }
}

.partnerSwiper {
  padding-bottom: 60px;

  .swiper-button-prev,
  .swiper-button-next {
    top: 7.5rem;
  }
  
}

</style>
