<template>
  <b-list-group class="animated bounceInUp border-0 h-100 mt-auto pb-5 overflow-auto rounded-0 shadow-sm sidebar-mobile">
    <b-link class="sidebar-btn-close" @click.prevent="handleCloseSearchFilter">
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
        <b-link
        class="font-small-15"
        @click="clearFilters"
        >Limpar filtros</b-link>

        <b-button
        variant="primary"
        size="sm"
        @click="applyFilters"
        >Aplicar filtros</b-button>
      </div>
    </b-card>
  </b-list-group>
</template>

<script>
import Icon from '@/components/Icon'
import _ from 'lodash'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Icon,
  },

  data() {
    return {
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

  computed: {
    ...mapState({
      sidebar: state => state.sidebar,
      user: state => state.user,
      groupsList: state => state.group.groupsList,
      filterByOpen: state => state.search.filter.filterByOpen,
      filterBy: state => state.search.filter.filterBy,
    }),
  },
  
  created() {
  },

  methods: {
    ...mapActions([
      'setSidebarOpen',
      'setSidebarCurrentItem',
      'logout'
    ]),

    handleCloseSearchFilter() {
      this.$store.commit('SET_FILTER_BY_OPEN', !this.filterByOpen)
    },

    clearFilters() {
      this.searchForm.supplierId = null
      this.searchForm.groupId = null
      this.searchForm.categoryId = null
      this.searchForm.keyword = null
      this.searchForm.priceRangeFrom = 0
      this.searchForm.priceRangeTo = 0
      this.searchForm.orderBy = null
      this.searchForm.perPage = 10
    },

    applyFilters() {
    },
  }
}
</script>

<style lang="scss">
.sidebar-mobile {
  width: 100%;
  height: 100%;
  background-color: var(--white);
}

.sidebar-btn-close {
  position: absolute;
  left: auto;
  right: 10px;
  top: 10px;
}
</style>
