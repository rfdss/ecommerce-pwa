<template>
  <section>
    <Header currentPage="Busca" :noStickyTop="filterByOpen || sortByOpen" />
    
    <section>
      <b-container class="mt-4 mb-5">
        <b-row>
          <b-breadcrumb 
          class="bg-white border d-none d-md-flex mx-3 mx-md-0 mb-3 mb-md-5 shadow-sm w-100" 
          :items="breadcrumbItems"
          ></b-breadcrumb>
        </b-row>

        <b-row>
          <!-- FILTERS -->
          <b-col cols="12" md="4" lg="3" class="d-none d-md-flex pl-md-0 pr-md-5">
            <b-card
              tag="article"
              class="border-0 h-100 p-4 shadow-sm"
              no-body
            >
              <div class="d-flex justify-content-between">
                <b-card-title class="h5 font-weight-normal mb-3">Filtros</b-card-title>
              </div>

              <b-form-select
              class="mb-3"
              v-model="searchForm.supplierId"
              :options="supplierOptions"
              ></b-form-select>

              <b-form-select 
              class="mb-3" 
              v-model="searchForm.groupId" 
              :options="groupOptions"
              ></b-form-select>

              <b-form-select 
              class="mb-4" 
              v-model="searchForm.categoryId" 
              :options="categoryOptions"
              ></b-form-select>

              <p class="m-0">De: R$ {{ searchForm.priceRangeFrom }}</p>
              <b-form-input 
              type="range" 
              class="mb-3" 
              v-model="searchForm.priceRangeFrom" 
              min="0" 
              max="100"
              ></b-form-input>

              <p class="m-0">Até: R$ {{ searchForm.priceRangeTo }}</p>
              <b-form-input
              type="range"
              class="mb-3"
              v-model="searchForm.priceRangeTo"
              min="0"
              max="100"
              ></b-form-input>

              <div class="d-flex justify-content-between align-items-center mt-2">
                <b-button
                variant="outline-secondary"
                size="sm"
                @click="clearFilters('pwa')"
                >Limpar filtros</b-button>
                
                <b-button
                variant="primary"
                size="sm"
                @click="applyFilters('pwa')"
                >Aplicar filtros</b-button>
              </div>
            </b-card>
          </b-col>

          <b-col cols="12" md="4" lg="3" class="d-flex d-md-none pl-md-0 pr-md-5">
            <div class="d-flex d-md-block justify-content-between align-items-center w-100 mb-3">
              <div>
                <b-link @click.prevent="handleToggleSearchSort">
                  <Icon
                  icon="iwwa:sort-by"
                  class="primary"
                  :width="20"
                  :height="20"
                  />
                  <span class="ml-1">Ordenar</span>
                </b-link>
              </div>

              <div>
                <b-link @click.prevent="handleToggleSearchFilter">
                  <Icon
                  icon="uil:sliders-v-alt"
                  class="primary"
                  :width="20"
                  :height="20"
                  />
                  <span class="ml-1">Filtrar</span>
                </b-link>
              </div>
            </div>
          </b-col>

          <!-- SEARCH RESULTS -->
          <b-col cols="12" md="8" lg="9" class="pr-md-0 pl-4">
            <div>
              <div :class="{
                'bg-white rounded': true,
                'd-none d-md-flex flex-column flex-md-row': true,
                'justify-content-md-between align-items-md-center': true,
                'mt-4 mt-md-0 mb-4 p-3 pl-0 shadow-sm': true,
              }">
                <div class="mb-3 mb-md-0">
                  <p class="m-0" v-if="filteredOffers.length <= 0">Nenhum produto encontrado</p>
                  <p class="m-0" v-else>Exibindo {{ filteredOffers.length }} de {{ offersList.length }}</p>
                </div>

                <div class="d-flex flex-column flex-md-row justify-content-end">
                  <div class="mb-3 mb-md-0">
                    <b-form-select
                    v-model="searchForm.orderBy"
                    :options="sortByOptions"
                    ></b-form-select>
                  </div>

                  <div class="ml-md-3">
                    <b-form-select
                    v-model="searchForm.perPage"
                    :options="paginateOptions"
                    ></b-form-select>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-center" v-if="loading">
                <div class="spinner-grow text-primary my-5 p-5" role="status">
                  <span class="sr-only">Carregando...</span>
                </div>
              </div>

              <b-container 
              class="text-center my-5"
              v-if="!loading && filteredOffers.length <= 0"
              >
                <div class="d-flex justify-content-center align-items-center">
                  <h1 class="h1 pt-2 mb-1">Oops!</h1>
                </div>

                <p class="h3 font-weight-normal text-secondary mt-3 mb-4">
                  Nenhum produto encontrado
                </p>
              </b-container>

              <div class="pl-md-3" v-if="!loading && filteredOffers.length > 0">
                <b-row>
                  <b-col
                  v-for="item in filteredOffers"
                  :key="item.offerId"
                  class="mb-5 p-1 p-md-3"
                  cols="6"
                  md="6"
                  lg="4"
                  >
                    <b-card
                      tag="article"
                      class="product-card border shadow-sm h-100 w-100"
                    >
                      <b-link :to="`/produtos/${item.supplierId}/${item.offerId}`">
                        <!-- <div class="d-flex flex-row flex-md-column"> -->
                          <b-card-img
                          v-if="item.image64"
                          class="border-bottom"
                          :src="item.image64">
                          </b-card-img>

                          <b-img
                          v-else
                          class="w-100 h-auto border-bottom"
                          src="~/static/no-image.png"
                          ></b-img>

                          <div class="p-3">
                            <b-card-title class="h6 font-weight-normal">
                              {{ item.title }}
                            </b-card-title>

                            <template v-if="item.todayPrice > 0">
                              <b-card-text class="h5 text-danger line-through">
                                R$ {{ item.price.toFixed(2).replace('.', ',') }}
                              </b-card-text>

                              <b-card-text class="h5 text-dark">
                                R$ {{ item.todayPrice.toFixed(2).replace('.', ',') }}
                              </b-card-text>
                            </template>

                            <b-card-text class="h5 text-dark" v-else>
                              R$ {{ item.price.toFixed(2).replace('.', ',') }}
                            </b-card-text>

                            <b-card-text class="h6 text-dark" v-if="item.promotionQuantity > 0">
                              <span class="font-weight-normal">
                                Acima de
                              </span>
                              {{ item.promotionQuantity }} {{ item.unit }} 
                              <span class="font-weight-normal">por</span>
                              R$ {{ item.promotionPrice.toFixed(2) }} / {{ item.unit }}
                            </b-card-text>

                            <b-card-text class="h6 text-dark" v-if="item.promotionQuantity2 > 0">
                              <span class="font-weight-normal">
                                Acima de
                              </span>
                              {{ item.promotionQuantity2 }} {{ item.unit }}
                              <span class="font-weight-normal">por</span>
                              R$ {{ item.promotionPrice2.toFixed(2) }} / {{ item.unit }}
                            </b-card-text>

                            <b-card-text class="h6 text-dark" v-if="item.promotionQuantity3 > 0">
                              <span class="font-weight-normal">
                                Acima de
                              </span>
                              {{ item.promotionQuantity3 }} {{ item.unit }}
                              <span class="font-weight-normal">por</span>
                              R$ {{ item.promotionPrice3.toFixed(2) }} / {{ item.unit }}
                            </b-card-text>

                            <b-card-text class="text-dark m-0">
                              {{ item.supplier.name }}
                            </b-card-text>
                            <b-card-text class="m-0">
                              <Icon 
                              v-for="i in 5"
                              :key="i + item.offerId"
                              :icon="i > item.supplierRating ? 'entypo:star' : 'emojione:star'"
                              :class="{'gray': ( i > item.supplierRating )}" 
                              :width="20"
                              :height="20"
                              />
                            </b-card-text>
                          </div>
                        <!-- </div> -->
                      </b-link>

                      <em slot="footer">
                        <div class="d-flex flex-column flex-md-row">
                          <div class="w-10">
                            <b-form-input
                            type="number"
                            min="1"
                            max="100"
                            v-model="offersVModel[item.offerId]"
                            ></b-form-input>
                          </div>

                          <div class="w-100 mt-3 mt-md-0 ml-0 ml-md-3">
                            <button
                            :id="`btnAddToCart${item.offerId}`"
                            class="btn-handle-qtd text-primary ml-3"
                            @click="handleAddToCart(item)">
                              <Icon icon="ei:cart" :width="40" :height="40" />
                            </button>
                            <b-tooltip :target="`btnAddToCart${item.offerId}`" placement="bottom">
                              Adicionar ao carrinho
                            </b-tooltip>

                            <button
                            :id="`btnAddToFavorite${item.offerId}`"
                            class="btn-handle-qtd text-primary"
                            @click="handleAddToFavorites(item)">
                              <Icon icon="ei:heart" :width="40" :height="40" />
                            </button>
                            <b-tooltip :target="`btnAddToFavorite${item.offerId}`" placement="bottom">
                              Adicionar como favorito
                            </b-tooltip>
                          </div>
                        </div>
                      </em>
                    </b-card>
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- SIDEBAR SEARCH SORT -->
    <div
    v-if="sortByOpen"
    :class="{
      'overlay': true,
      'h-100': true,
      'd-flex': true,
      'align-items-baseline': true,
      'justify-content-center': true,
      'open': true
    }"
    >
      <!-- <SearchSort /> -->
      <b-list-group class="animated bounceInUp border-0 h-50 mt-auto pb-5 overflow-auto rounded-0 shadow-sm sidebar-mobile">
        <b-link class="sidebar-btn-close" @click.prevent="handleToggleSearchSort">
          <Icon icon="ei:close" color="#fff" :height="30" :width="30" />
        </b-link>

        <div class="mt-4 mx-3">
          <p class="h4 text-dark mb-3">
            Ordenar por
          </p>
        </div>

        <b-list-group-item
        v-for="(sortItem, index) in sortByOptions.filter(sortByItem => sortByItem.value != null)"
        :key="index"
        class="border-left-0 border-right-0 py-3 px-3 rounded-0"
        href="#"
        @click.prevent="handleSetSearchSortBy(sortItem.value)"
        >{{ sortItem.text }}</b-list-group-item>
      </b-list-group>
    </div>

    <!-- SIDEBAR SEARCH FILTER -->
    <div
    v-if="filterByOpen"
    :class="{
      'overlay': true,
      'h-100': true,
      'd-flex': true,
      'align-items-baseline': true,
      'justify-content-center': true,
      'open': true
    }"
    >
      <!-- <SearchFilter
      :supplierOptions="supplierOptions"
      :groupOptions="groupOptions"
      :categoryOptions="categoryOptions"
      /> -->
      <b-list-group class="animated bounceInUp border-0 h-100 mt-auto pb-5 overflow-auto rounded-0 shadow-sm sidebar-mobile">
        <b-link class="sidebar-btn-close" @click.prevent="handleToggleSearchFilter">
          <Icon icon="ei:close" color="#fff" :height="30" :width="30" />
        </b-link>

        <div class="mt-4 mx-3">
          <p class="h4 text-dark mb-3">
            Filtrar por
          </p>
        </div>

        <b-card
          tag="article"
          class="border-0 p-4"
          no-body
        >
          <div class="d-flex justify-content-between">
            <b-card-title class="h5 font-weight-normal mb-3">Filtros</b-card-title>
          </div>

          <b-form-select
          class="mb-3"
          v-model="searchForm.supplierId"
          :options="supplierOptions"
          ></b-form-select>

          <b-form-select 
          class="mb-3" 
          v-model="searchForm.groupId" 
          :options="groupOptions"
          ></b-form-select>

          <b-form-select 
          class="mb-4" 
          v-model="searchForm.categoryId" 
          :options="categoryOptions"
          ></b-form-select>

          <!-- <p class="h6">Preço</p> -->
          <p class="m-0">De: R$ {{ searchForm.priceRangeFrom }}</p>
          <b-form-input 
          type="range" 
          class="mb-3" 
          v-model="searchForm.priceRangeFrom" 
          min="0" 
          max="100"
          ></b-form-input>

          <p class="m-0">Até: R$ {{ searchForm.priceRangeTo }}</p>
          <b-form-input
          type="range"
          class="mb-3"
          v-model="searchForm.priceRangeTo"
          min="0"
          max="100"
          ></b-form-input>

          <div class="d-flex justify-content-between align-items-center mt-2">
            <b-button
            variant="outline-secondary"
            @click="clearFilters('pwa')"
            >Limpar filtros</b-button>

            <b-button
            variant="primary"
            @click="applyFilters('pwa')"
            >Aplicar filtros</b-button>
          </div>
        </b-card>
      </b-list-group>
    </div>
  </section>
</template>

<script>
import Icon from '@/components/Icon'
import Header from '@/components/Header'
import SearchSort from '@/components/SearchSort'
import SearchFilter from '@/components/SearchFilter'

import _ from 'lodash'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Icon,
    Header,
    SearchSort,
    SearchFilter
  },
  
  data() {
    return {
      loading: false,
      offersVModel: [],

      breadcrumbItems: [
        { text: 'Home', href: '/' },
        { text: 'Produtos', href: '/busca' },
      ],

      searchForm: {
        supplierId: null,
        groupId: null,
        categoryId: null,
        keyword: '',
        priceRangeFrom: 0,
        priceRangeTo: 0,
        orderBy: null,
        perPage: 10 // default
      },

      supplierOptions: [
        { value: null, text: 'Fornecedor' }
      ],

      groupOptions: [
        { value: null, text: 'Grupo' },
      ],

      categoryOptions: [
        { value: null, text: 'Categoria' },
      ],

      sortByOptions: [
        {
          value: null,
          text: 'Ordenar por'
        },
        {
          value: { field: 'supplier.rating', order: 'desc' },
          text: 'Mais relevante'
        },
        {
          value: { field: 'price', order: 'asc' },
          text: 'Menor preço'
        },
        {
          value: { field: 'price', order: 'desc' },
          text: 'Maior preço'
        },
      ],

      paginateOptions: [
        { value: 10, text: 'Exibir 10 por página' },
        { value: 30, text: 'Exibir 30 por página' },
        { value: 50, text: 'Exibir 50 por página' },
        // { value: 9999, text: 'Exibir todos' },
      ],
    }
  },

  async created() {
    const { supplierId, groupId, categoryId, keyword } = this.$route.query
    
    this.searchForm.supplierId = supplierId || null
    this.searchForm.groupId = groupId || null
    this.searchForm.categoryId = categoryId || null
    this.searchForm.keyword = keyword || null

    await this.handleSearchProducts()
    await this.fetchSuppliers()
    await this.fetchGroupsList()

    const auxSupplierOptions = this.suppliersList.map(s => {
      return { value: s.id, text: s.name }
    })

    this.supplierOptions = [ ...this.supplierOptions, ...auxSupplierOptions]
    
    const auxGroupOptions = this.groupsList.map(g => {
      return { value: g.id, text: g.title }
    })

    this.groupOptions = [ ...this.groupOptions, ...auxGroupOptions ]

    if (groupId && categoryId) {
      const currentGroup = this.groupsList.filter(g => g.id == groupId)[0]

      this.categoryOptions = currentGroup.products.map(c => {
        return { value: c.id, text: c.title }
      })

      this.breadcrumbItems.push({ text: this.groupOptions.find(o => o.value == groupId).text })
      this.breadcrumbItems.push({ text: this.categoryOptions.find(c => c.value == categoryId).text })
    }
  },

  watch: {
    'searchForm.groupId': function(groupId) {
      this.loading = true

      if (!groupId) {
        this.loading = false
        return false
      }

      this.searchForm.categoryId = null
      const currentGroup = this.groupsList.filter(g => g.id == groupId)

      if (currentGroup) {
        const firstCategoryProducts = currentGroup[0].products.map(p => {
          return { value: p.id, text: p.title }
        })

        this.categoryOptions = [
          { value: null, text: 'Categoria' },
          ...firstCategoryProducts
        ]
      }

      this.loading = false
    },

    'searchForm.priceRangeFrom': function(priceRangeFrom) {
      this.activeLoading()
    },

    'searchForm.priceRangeTo': function(priceRangeTo) {
      this.activeLoading()
    },

    'searchForm.perPage': function(perPage) {
      this.activeLoading()
    }
  },

  computed: {
    ...mapState({
      suppliersList: state => state.supplier.suppliersList,
      groupsList: state => state.group.groupsList,
      searchFilters: state => state.search.filter,
      filterByOpen: state => state.search.filter.filterByOpen,
      sortByOpen: state => state.search.filter.sortByOpen,
      offersList: state => state.offer.offersList,
      cartItems: state => state.cart.cartItems,
      favoriteItems: state => state.favorite.favoriteItems,
      user: state => state.user,
    }),

    filteredOffers() {
      let { searchForm, offersList } = this
      let filtered = offersList

      if (searchForm.priceRangeFrom && searchForm.priceRangeFrom > 0) {
        filtered = filtered.filter(p => p.price >= searchForm.priceRangeFrom)
      }

      if (searchForm.priceRangeTo && searchForm.priceRangeTo > 0) {
        filtered = filtered.filter(p => p.price <= searchForm.priceRangeTo)
      }

      if (searchForm.orderBy) {
        const { field, order } = searchForm.orderBy
        filtered = _.orderBy(filtered, [field], [order])
      }

      return filtered.slice(0, searchForm.perPage)
    }
  },

  methods: {
    ...mapActions([
      'fetchSuppliers',
      'fetchGroupsList',
      'fetchProducts',

      'cartAddItem',
      'cartUpdateItemQuantity',
      'favoriteAddItem',

      'setFilterByOpen',
      'setSortByOpen',
      'setSortBy',
      'setToast'
    ]),

    handleToggleSearchSort() {
      this.setSortByOpen(!this.sortByOpen)
    },

    handleSetSearchSortBy(item) {
      this.searchForm.orderBy = item
      this.setSortBy(item)
      this.handleToggleSearchSort()
    },

    handleToggleSearchFilter() {
      this.setFilterByOpen(!this.filterByOpen)
    },

    clearFilters(env) {
      this.searchForm.supplierId = null
      this.searchForm.groupId = null
      this.searchForm.categoryId = null
      this.searchForm.keyword = null
      this.searchForm.priceRangeFrom = 0
      this.searchForm.priceRangeTo = 0
      this.searchForm.orderBy = null
      this.searchForm.perPage = 10
      this.handleSearchProducts()
      
      if (env == 'pwa') {
        this.handleToggleSearchFilter()
      }
    },

    applyFilters(env) {
      this.handleSearchProducts()
      if (env == 'pwa') {
        this.handleToggleSearchFilter()
      }
    },

    async handleSearchProducts() {
      this.loading = true

      await this.fetchProducts({
        supplierId: this.searchForm.supplierId || 0,
        groupId: this.searchForm.groupId || 0,
        categoryId: this.searchForm.categoryId || 0,
        title: this.searchForm.keyword || 0,
      })

      const self = this
      setTimeout(() => {
        this.offersList.forEach(item => {
          self.offersVModel[item.offerId] = 1
        })

        this.loading = false
      }, 1000)
    },

    handleAddToFavorites(item) {
      this.favoriteAddItem(item)
      this.setToast({
        type: 'success',
        title: 'Parabéns!',
        content: 'Produto adicionado aos favoritos'
      })
    },

    handleAddToCart(item) {
      const qty = parseInt(this.offersVModel[item.offerId])
      const hasOnCart = this.cartItems.find(p => p.offerId == item.offerId)
      
      let toastTitle = 'Parabéns!'
      let toastContent = 'Produto adicionado ao carrinho'
      
      if (!hasOnCart) {
        this.cartAddItem({ ...item, quantidade: qty })
      } else {
        const newQty = parseInt(hasOnCart.quantidade + qty)
        this.cartUpdateItemQuantity({ item: item, quantidade: newQty })
        toastTitle = 'Atenção!'
        toastContent = 'Produto já existe no carrinho.<br/>Quantidade alterada com sucesso.'
      }
      
      this.setToast({
        type: 'success',
        title: toastTitle,
        content: toastContent
      })
    },

    activeLoading() {
      const self = this
      self.loading = true
      setTimeout(() => {
        self.loading = false
      }, 2000)
    },
  }
}
</script>

<style lang="scss">
</style>
