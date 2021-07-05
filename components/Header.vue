<template>
  <header
  :class="{
    'bg-white shadow-sm': !noSearch,
    'bg-transparent': noSearch,
    'sticky-top': !noStickyTop && isMobile
  }">
    <b-container class="pt-md-3 pb-4 py-lg-4">
      <b-row align-v="center" class="bg-primary d-flex d-lg-none mb-4 mb-md-0">
        <b-col :class="{
        'p-1': $route.name == 'index',
        'p-3': $route.name != 'index'
        }">
          <div class="d-flex justify-content-between align-items-center">
            <b-link class="d-flex align-items-center" @click.prevent="handleOpenSidebar" v-if="$route.name == 'index'">
              <Icon class="white" icon="ei:navicon" :width="50" :height="50"/>
            </b-link>

            <b-link class="d-flex align-items-center" @click.prevent="handleBack" v-if="$route.name != 'index'">
              <Icon class="white" icon="ant-design:arrow-left-outline" :width="25" :height="25"/>
            </b-link>

            <p class="h5 font-weight-normal text-white m-0 mx-auto pr-3" v-if="currentPage">
              {{ currentPage }}
            </p>

            <!-- FAVORITES / CART -->
            <div class="d-flex align-items-center" v-if="$route.name == 'index' || $route.name == 'carrinho-revisao'">
              <div id="favoritesIconMobile" class="icon-box-favorites__mobile mr-3" v-if="$route.name == 'index'">
                <b-link class="d-flex align-items-center" to="/favoritos" @click="handleCloseOverlay">
                  <Icon class="white" icon="ei:heart" :width="50" :height="50" />
                  <b-badge class="icon-box-mobile__badge shadow" variant="danger" v-if="favoriteItems.length > 0">
                    {{ favoriteItems.length }}
                  </b-badge>
                </b-link>
              </div>
              <b-tooltip target="favoritesIcon" placement="top">
                Meus Favoritos
              </b-tooltip>
              
              <div id="cartIconMobile" class="icon-box-cart__mobile mr-3">
                <b-link class="d-flex align-items-center" to="/carrinho" @click="handleCloseOverlay">
                  <Icon class="white" icon="ei:cart" :width="50" :height="50" />
                  <b-badge class="icon-box-mobile__badge shadow" variant="danger" v-if="cartItems.length > 0">
                    {{ cartItems.length }}
                  </b-badge>
                </b-link>
              </div>
              <b-tooltip target="cartIcon" placement="top">
                Meu Carrinho
              </b-tooltip>
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row align-v="center">
        <b-col
        class="d-none d-md-flex text-center text-lg-left pb-4 pb-lg-0 order-0"
        cols="12"
        md="12"
        lg="1"
        >
          <b-link to="/" @click="handleCloseOverlay">
            <b-img src="~/static/whitelabel-ecommerce-app-logo.png" width="100" height="100" alt=""></b-img>
          </b-link>
        </b-col>

        <!-- SEARCH -->
        <b-col
        v-if="!noSearch"
        class="pl-lg-5 pb-2 pb-lg-0 order-2 order-md-1"
        :class="{'always-on-top': overlayBox === 'search'}"
        cols="12"
        md="12"
        lg="7"
        >
          <b-form-input
          class="shadow-sm"
          size="lg"
          placeholder="Busca rápida... O que você procura?"
          v-model="searchKeyword"
          @focus="handleSearchFocus"
          @keyup="handleSearchProduct"
          ></b-form-input>

          <div class="search-box rounded overflow-auto" :class="{'open': overlayBox === 'search'}">
            <ul class="m-0 px-3 py-4 overflow-auto" v-if="searchResults.length <= 0">
              <li class="h5" v-if="!searchKeyword">
                Você buscou:
                <ul class="m-0 p-0 mt-3">
                  <template v-if="searchHistory.length <= 0">
                    <li class="h6 font-weight-normal">Não há histórico de busca</li>
                  </template>
                  <template v-else>
                    <li class="h6 font-weight-normal" v-for="historyItem in searchHistory" :key="historyItem.id">
                      {{ historyItem.title }}
                    </li>
                  </template>
                </ul>
              </li>
              <li v-if="searchKeyword && searchEvent !== null">Buscando...</li>
              <li v-if="searchKeyword && searchEvent === null">Nenhum produto encontrado</li>
            </ul>

            <!-- SEARCH RESULTS -->
            <ul class="m-0 px-3 pt-4 overflow-auto" v-else>
              <li>
                <div class="d-flex justify-content-between align-items-center">
                  <span>Exibindo {{ getSearchResults.length }} de {{ searchResults.length }}</span>
                  <b-link @click="handleCloseOverlay" :to="`/busca?keyword=${searchKeyword}`">Ver todos</b-link>
                </div>
              </li>

              <li 
              v-for="product in getSearchResults" 
              class="my-4"
              :key="product.offerId + Math.random(0, 777)"
              >
                <b-row class="bg-white border shadow-sm m-0">
                  <b-col class="p-2" cols="12" md="10">
                    <div class="d-flex flex-column flex-md-row align-items-md-center h-100 ml-2 ml-m-0">
                      <div class="d-none d-md-block pr-3">
                        <b-link @click.prevent>
                          <b-img
                          v-if="product.image64"
                          :src="product.image64"
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
                        <b-link 
                        @click="handleCloseOverlay"
                        :to="`/produtos/${product.supplierId}/${product.offerId}`"
                        class="text-primary pb-1"
                        >{{ product.title }}</b-link>
                        
                        <template v-if="product.todayPrice > 0">
                          <span class="h5 text-danger line-through">
                            R$ {{ product.price.toFixed(2).replace('.', ',') }}
                          </span>

                          <span class="h5 text-dark">
                            R$ {{ product.todayPrice.toFixed(2).replace('.', ',') }}
                          </span>
                        </template>

                        <span class="h5 text-dark" v-else>
                          R$ {{ product.price.toFixed(2).replace('.', ',') }}
                        </span>
                        
                        <span class="text-dark">{{ product.supplier.name }}</span>

                        <span>
                          <Icon 
                          v-for="i in 5"
                          :key="i + product.offerId"
                          :icon="i > product.supplier.rating ? 'entypo:star' : 'emojione:star'"
                          :class="{'gray': ( i > product.supplier.rating )}" 
                          :width="20"
                          :height="20"
                          />
                        </span>
                      </div>
                    </div>
                  </b-col>

                  <b-col class="d-none d-md-block text-center my-auto p-0 pt-1" cols="12" md="2">
                    <b-link
                    @click="handleCloseOverlay"
                    :to="`/produtos/${product.supplierId}/${product.offerId}`"
                    >
                      <Icon 
                      :class="{'secondary': true}"
                      icon="simple-line-icons:arrow-right" 
                      :width="30" 
                      :height="30"
                      />
                    </b-link>
                  </b-col>
                </b-row>
              </li>
            </ul>
          </div>
        </b-col>

        <!-- ACCOUNT / FAVORITES / CART -->
        <b-col
        class="d-none d-lg-block pb-4 pb-md-0 order-1 order-md-2"
        cols="12"
        md="4"
        >
          <div class="d-flex justify-content-between w-100">
            <div class="d-flex align-items-center w-50" :class="{'always-on-top': overlayBox === 'account'}">
              <Icon icon="ei:user" :width="70" :height="70" />
              <div class="d-flex flex-column ml-1">
                <span 
                class="h6 font-weight-normal mb-1" 
                :class="{'text-white': overlayBox === 'account'}"
                v-if="user.name">
                  {{ userFirstName }}
                </span>
                
                <span
                class="h5 font-weight-normal mb-1"
                :class="{'text-white': overlayBox === 'account'}"
                v-else>
                  Olá!
                </span>

                <b-link
                class="font-small-15 font-weight-normal"
                to="/minha-conta">
                  Minha conta
                </b-link>
              </div>
            </div>

            <!-- FAVORITES / CART -->
            <div class="d-flex justify-content-end w-50">
              <div id="favoritesIcon" class="icon-box-favorites">
                <b-link to="/favoritos" @click="handleCloseOverlay">
                  <Icon icon="ei:heart" :width="70" :height="70" />
                  <span class="icon-box__badge shadow" v-if="favoriteItems.length > 0">
                    {{ favoriteItems.length }}
                  </span>
                </b-link>
              </div>
              <b-tooltip target="favoritesIcon" placement="top">
                Meus Favoritos
              </b-tooltip>
              
              <div id="cartIcon" class="icon-box-cart">
                <b-link to="/carrinho" @click="handleCloseOverlay">
                  <Icon icon="ei:cart" :width="70" :height="70" />
                  <span class="icon-box__badge shadow" v-if="cartItems.length > 0">
                    {{ cartItems.length }}
                  </span>
                </b-link>
              </div>
              <b-tooltip target="cartIcon" placement="top">
                Meu Carrinho
              </b-tooltip>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <!-- NAVBAR -->
    <b-navbar class="navbar-menu d-none d-lg-block p-0" type="dark" variant="primary">
      <b-container class="h-100">
        <b-navbar-nav class="d-flex justify-content-between w-100 h-100">
          <b-nav-item class="d-flex align-items-center mr-3 ml-3 ml-md-0 all-items">
            <Icon 
            icon="ei:navicon"
            :width="35"
            :height="35"
            class="d-none d-lg-block text-white mr-1"
            />
            
            <b-link class="text-white" to="/busca">Todos departamentos</b-link>

            <div class="container navbar-sub-all bg-white rounded-bottom shadow border">
              <b-row>
                <b-col cols="12" md="3">
                  <ul class="p-3">
                    <li class="py-2">
                      <p class="h4 text-primary-dark pb-2 border-bottom">Departamentos</p>
                    </li>
                    <li 
                    v-for="group in groupsList" :key="group.id"
                    class="py-2" 
                    :class="{'active-group': group.id == currentGroup.id}"
                    >
                      <b-link @click.prevent="handleCurrentGroup(group.id)">{{ group.title }}</b-link>
                    </li>
                  </ul>
                </b-col>

                <b-col class="bg-light shadow" cols="12" md="9" v-if="currentGroup">
                  <b-row class="pl-2 py-4">
                    <b-col 
                    v-for="product in currentGroup.products" :key="product.id"
                    class="mb-3" 
                    cols="4" 
                    >
                      <p class="m-0 p-0">
                        <b-link
                        @click="handleCloseOverlay"
                        :to="`/busca?groupId=${currentGroup.id}&categoryId=${product.id}`"
                        >{{ product.title }}</b-link>
                      </p>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </div>
          </b-nav-item>

          <b-nav-item 
          class="d-none d-lg-flex align-items-center mr-3"
          v-for="group in groupsList.slice(0, 9)" :key="group.id"
          >
            {{ group.title }}
            <div class="container navbar-sub bg-white rounded-bottom shadow border">
              <p class="h4 text-primary-dark pb-2 border-bottom">{{ group.title }}</p>
              <b-row v-if="group.products.length <= 0">
                <p class="text-dark mx-3 mt-3 mb-0">Nenhuma categoria para este grupo</p>
              </b-row>

              <b-row v-else>
                <b-col class="mt-3" cols="3" v-for="product in group.products" :key="product.id">
                  <p class="m-0 p-0">
                    <b-link 
                    @click="handleCloseOverlay"
                    :to="`/busca?groupId=${group.id}&categoryId=${product.id}`"
                    >{{ product.title }}</b-link>
                  </p>
                </b-col>
              </b-row>
            </div>
          </b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
  </header>
</template>

<script>
import Icon from '@/components/Icon'
import { mapActions, mapState } from 'vuex'

export default {
  props: {
    currentPage: String,
    noSearch: Boolean,
    noStickyTop: Boolean
  },

  components: {
    Icon,
  },

  data() {
    return {
      searchKeyword: '',
      showMyAccount: false,
      searchEvent: null,
      searchHistory: [],
      deferredPrompt: null
    }
  },

  async created() {
    this.setOverlay(null)
    this.setOverlay({ loading: true, open: true })
    await this.fetchGroupsList()
    this.setOverlay({ loading: false, open: false })

    const self = this

    window.addEventListener('beforeinstallprompt', (e) => {
      // e.preventDefault()
      // self.deferredPrompt = e
      e.prompt()

      // addBtn.addEventListener('click', (e) => {
      //   self.deferredPrompt.prompt()
      //   self.deferredPrompt.userChoice.then((choiceResult) => {
      //     if (choiceResult.outcome === 'accepted') {
      //       console.log('User accepted the A2HS prompt')
      //     } else {
      //       console.log('User dismissed the A2HS prompt')
      //     }
      //     self.deferredPrompt = null
      //   })
      // })
    })

    // Inside page components
    this.$OneSignal.push(() => {
      self.$OneSignal.isPushNotificationsEnabled((isEnabled) => {
        if (!isEnabled) {
          self.$OneSignal.showSlidedownPrompt()
        }
      })
    })

    // this.$OneSignal.push(['addListenerForNotificationOpened', (data) => {
    //   self.setToast({
    //     type: 'primary',
    //     content: data
    //   })
    // }]);
  },
  
  computed: {
    ...mapState({
      user: state => state.user,
      groupsList: state => state.group.groupsList,
      currentGroup: state => state.group.currentGroup,
      cartItems: state => state.cart.cartItems,
      favoriteItems: state => state.favorite.favoriteItems,
      searchResults: state => state.search.offers,
      overlayBox: state => state.overlay.box
    }),

    userFirstName() {
      return (typeof(this.user != 'undefined') && this.user.name) 
        ? this.user.name.split(' ')[0]
        : ''
    },

    getSearchResults() {
      return this.searchResults.slice(0, 5)
    },

    isMobile() {
      return window.screen.width > 425 ? false : true
    }
  },

  methods: {
    ...mapActions([
      'fetchGroupsList',
      'fetchSearchBarProducts',
      'logout',
      'resetSearch',
      'setCurrentGroup',
      'setSidebarOpen',
      'setOverlay'
    ]),

    handleCloseOverlay() {
      this.setOverlay(null)
      location.reload()
    },

    handleCurrentGroup(id) {
      this.setCurrentGroup(id)
    },

    handleOpenSidebar() {
      this.setSidebarOpen(true)
    },

    handleSearchFocus() {
      this.setOverlay({ box: 'search', open: true })
    },

    handleMyAccount() {
      this.setOverlay({ box: 'account', open: true })
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

    handleBack() {
      this.$router.push({ name: 'index' })
    },

    handleSearchProduct() {
      if (this.searchEvent !== null) {
        clearTimeout(this.searchEvent)
      }

      if (!this.searchKeyword) {
        this.resetSearch()
        this.searchEvent = null
        clearTimeout(this.searchEvent)
        return false
      }

      this.searchEvent = setTimeout(async () => {
        if (this.searchKeyword) {
          await this.fetchSearchBarProducts({
            supplierId: 0,
            groupId: 0,
            categoryId: 0,
            title: this.searchKeyword,
          })

          this.searchEvent = null
          clearTimeout(this.searchEvent)
        }
      }, 1500)
    },
  }
}
</script>

<style lang="scss">
// @media screen and (min-width: 1200px) {
//   header.sticky-top {
//   }
// }

.icon-box-cart {
  position: absolute;
  top: 10%;
  left: 80%;
}

.icon-box-cart__mobile {
  position: absolute;
  left: 83%;
}

.icon-box-favorites {
  position: absolute;
  top: 10%;
  left: 55%;
}

.icon-box-favorites__mobile {
  position: absolute;
  left: 65%;
}

.icon-box__badge {
  position: absolute;
  border-radius: 50%;
  height: 40%;
  width: 42%;
  color: #fff;
  background-color: blue;
  text-align: center;
  font-size: 14px;
  top: 0;
  right: 0;
  bottom: 0;
  padding-top: 6%;
}

.icon-box-mobile__badge {
  position: relative;
  top: 0;
  left: -30%;
  bottom: 0;
  margin-bottom: auto;
}
</style>
