<template>
  <section>
    <Header currentPage="Minha conta" />
    <section>
      <b-row class="mx-0">
        <b-col cols="12" sm="3" md="3" class="bg-white d-none d-lg-block m-0 p-0">
          <Sidebar />
        </b-col>

        <!-- COL SPACER -->
        <!-- <b-col cols="0" sm="1" md="1" class="d-none d-md-block"></b-col> -->

        <!-- <b-col cols="12" sm="8" md="8" offset="1" class="bg-white border my-5 mx-auto p-3 shadow-sm"> -->
        <b-col cols="12" sm="12" md="8" offset="1" class="m-0 p-0 mx-auto">
          <template v-if="loading">
            <div class="d-flex justify-content-center">
              <div class="spinner-grow text-primary my-5 p-5" role="status">
                <span class="sr-only">Carregando...</span>
              </div>
            </div>
          </template>

          <template v-else>
            <!-- <div class="text-center"> -->
              <Profile v-if="sidebar != null && sidebar.currentItem === 'my-account'" />

              <Orders v-if="sidebar != null && sidebar.currentItem === 'my-orders'" />

              <OrderDetail v-if="sidebar != null && sidebar.currentItem === 'order-detail'" />
            <!-- </div> -->
          </template>
        </b-col>

        <!-- COL SPACER -->
        <!-- <b-col cols="0" sm="1" md="1" class="d-none d-md-block"></b-col> -->
      </b-row>
    </section>
  </section>
</template>

<script>
import Icon from '@/components/Icon'
import Header from '@/components/Header'
import Sidebar from '@/components/MyAccount/Sidebar'
import Profile from '@/components/MyAccount/Profile'
import Orders from '@/components/MyAccount/Orders'
import OrderDetail from '@/components/MyAccount/OrderDetail'

import _ from 'lodash'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Icon,
    Header,
    Sidebar,
    Profile,
    Orders,
    OrderDetail
  },

  data() {
    return {
      loading: true,
    }
  },

  created() {
    if (this.$route.params.hasOwnProperty('currentMenuItem')) {
      this.setSidebarCurrentItem(this.$route.params.currentMenuItem)
    }

    this.loading = false
  },

  computed: {
    ...mapState({
      sidebar: state => state.sidebar,
    })
  },

  methods: {
    ...mapActions([
      'setSidebarCurrentItem',
    ]),
  }
}
</script>

<style lang="scss">
</style>
