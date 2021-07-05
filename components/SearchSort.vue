<template>
  <b-list-group class="animated bounceInUp border-0 h-50 mt-auto pb-5 overflow-auto rounded-0 shadow-sm sidebar-mobile">
    <b-link class="sidebar-btn-close" @click.prevent="handleCloseSearchSort">
      <Icon icon="ei:close" color="#fff" :height="30" :width="30" />
    </b-link>

    <div class="mt-4 mx-3">
      <p class="h4 text-dark mb-3">
        Ordenar por
      </p>
    </div>

    <b-list-group-item
    v-for="(sortItem, index) in sortByOptions"
    :key="index"
    class="border-left-0 border-right-0 py-3 px-3 rounded-0"
    href="#"
    @click.prevent="handleSetSearchSortBy(sortItem)"
    >{{ sortItem.text }}</b-list-group-item>
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
      sortByOpen: state => state.search.filter.sortByOpen,
      sortBy: state => state.search.filter.sortBy,
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

    handleCloseSearchSort() {
      this.$store.commit('SET_SORT_BY_OPEN', !this.sortByOpen)
    },

    handleSetSearchSortBy(item) {
      this.$store.commit('SET_SORT_BY', !this.sortBy)
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
