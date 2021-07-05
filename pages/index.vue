<template>
  <section>
    <Header noStickyTop />
    <!-- <div class="pb-5">
      <swiper class="bannerSwiper bg-dark shadow" :options="swiperOption">
        <swiper-slide v-for="i in 10" :key="i">
          <b-jumbotron class="bg-dark text-white text-center rounded-0" :header="`Banner teste ${i}`" :lead="`Banner teste ${i}`">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <b-button variant="primary" href="#">Ver mais</b-button>
          </b-jumbotron>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div> -->

    <!-- SPACER -->
    <div class="pb-5"></div>
    
    <b-container>
      <p class="h3 pb-3">Parceiros</p>
      <swiper class="partnerSwiper" :options="partnerSwiperOption">
        <swiper-slide v-for="i in 10" :key="i">
          <b-card
            img-src="~/static/no-image.png"
            img-alt="Image"
            img-top
            tag="article"
            class="border shadow-sm"
          >
            <b-card-title class="h6 font-weight-normal text-center">
              Parceiro teste {{ i }}
            </b-card-title>
          </b-card>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

      <b-row class="mt-5"></b-row>

      <!-- HOME PRODUCTS - BEST OFFERS -->
      <div class="d-flex justify-content-center" v-if="bestOffers.length <= 0">
        <div class="spinner-grow text-primary my-5 p-5" role="status">
          <span class="sr-only">Carregando...</span>
        </div>
      </div>

      <div 
      class="mb-5"
      v-if="bestOffers.length > 0"
      >
        <p class="h3 pb-3">Melhores Ofertas</p>
        <div>
          <b-row>
            <b-col
            class="mb-3 mb-md-5 p-1 p-md-3"
            cols="6"
            md="3"
            v-for="product in bestOffers"
            :key="product.offerId"
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
                  <div class="d-flex flex-column flex-md-row">
                    <div class="w-100">
                      <b-form-input 
                      v-model="bestOffersVModels[product.offerId]"
                      class="text-center text-md-right"
                      type="number"
                      min="1"
                      max="100"
                      ></b-form-input>
                    </div>

                    <div class="w-100 mt-3 mt-md-0 ml-0 ml-md-3">
                      <button
                      class="btn-handle-qtd text-primary ml-3 ml-md-0"
                      @click="handleAddToCart(product)"
                      >
                        <Icon icon="ei:cart" :width="40" :height="40" />
                      </button>

                      <button
                      class="btn-handle-qtd text-primary"
                      @click="handleAddToFavorites(product)"
                      >
                        <Icon icon="ei:heart" :width="40" :height="40" />
                      </button>
                    </div>
                  </div>
                </em>
              </b-card>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-container>
  </section>
</template>

<script>
import Icon from '@/components/Icon'
import Header from '@/components/Header'

// Vue Awesome Swipper
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Icon,
    Header,
    swiper,
    swiperSlide
  },
  
  data() {
    return {
      bestOffers: [],
      bestOffersVModels: [],
      
      swiperOption: {
        loop: true,
        autoplay: true,
        slidesPerView: 1,
        centeredSlides: false,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        }
      },
      
      partnerSwiperOption: {
        loop: true,
        autoplay: true,
        slidesPerView: 4,
        centeredSlides: false,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 30,
          }
        }
      }
    }
  },

  async created() {
    await this.fetchProducts({
      supplierId: 0,
      groupId: 0,
      categoryId: 0,
      title: 0
    })
    
    const self = this
    setTimeout(() => {
      this.bestOffers = this.offers.slice(0, 8)
      this.bestOffers.forEach(item => {
        self.bestOffersVModels[item.offerId] = 1
      })
    }, 1000)
  },

  computed: {
    ...mapState({
      user: state => state.user,
      cartItems: state => state.cart.cartItems,
      groupsList: state => state.group.groupsList,
      offers: state => state.offer.offersList,
      overlayBox: state => state.overlay.box
    }),
  },

  methods: {
    ...mapActions([
      'fetchGroupsList',
      'fetchProducts',
      'favoriteAddItem',
      'cartAddItem',
      'cartUpdateItemQuantity',
      'setToast'
    ]),

    handleAddToFavorites(product) {
      this.favoriteAddItem(product)
      this.setToast({
        type: 'success',
        title: 'Parabéns!',
        content: 'Produto adicionado aos favoritos!'
      })
    },

    handleAddToCart(product) {
      const qty = parseInt(this.bestOffersVModels[product.offerId])
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
    top: 40%;
  }
}

@media screen and (max-width: 425px) {
  .partnerSwiper {
    padding-bottom: 60px;
    .swiper-button-prev,
    .swiper-button-next {
      top: 35% !important;
    }
  }
}
</style>
