<template>
  <b-list-group class="animated bounceInLeft border-0 pb-5 overflow-auto rounded-0 shadow-sm sidebar-mobile">
    <b-link class="sidebar-btn-close" @click.prevent="handleCloseSidebar">
      <Icon icon="ei:close" color="#fff" :height="40" :width="40" />
    </b-link>
    <div class="mt-4 mx-3">
      <p class="h4 text-dark mb-3">
        Minha conta
      </p>

      <p class="h5 font-weight-normal text-dark mb-3" v-if="user.name">
        Olá, {{ userFirstName }}!
      </p>

      <p class="h5 font-weight-normal text-dark mb-3" v-else>
        Olá!
      </p>
    </div>

    <b-list-group-item
    v-for="menuItem in sidebar.items"
    :key="menuItem.key"
    class="border-left-0 border-right-0 py-3 px-3 rounded-0"
    href="#"
    @click.prevent="handleSetSidebarCurrentItem(menuItem.key)"
    >{{ menuItem.value }}</b-list-group-item>

    <b-list-group-item
    class="border-right-0 border-bottom-0 border-left-0 py-3 px-3 rounded-0"
    href="#"
    @click.prevent="handleLogout"
    >Sair</b-list-group-item>

    <div class="mt-4 mx-3">
      <p class="h4 text-dark mb-3">
        Menu
      </p>
    </div>

    <div role="tablist">
      <b-list-group-item
      v-for="group in groupsList"
      :key="group.id"
      class="border-right-0 border-bottom-0 border-left-0 py-3 px-3 rounded-0"
      href="#"
      role="tab"
      @click.prevent
      v-b-toggle="`gpCollapse${group.id}`"
      >
        {{ group.title }}
        <b-collapse
        accordion="gpAccordion"
        class="mt-2 mb-3 border rounded"
        :id="`gpCollapse${group.id}`"
        role="tabpanel"
        >
          <template v-if="group.products.length <= 0">
            <b-list-group-item class="border-0 py-2 px-3" href="#">
              Sem categorias para este grupo
            </b-list-group-item>
          </template>

          <template v-else>
            <b-list-group-item
            v-for="category in group.products"
            :key="category.id"
            class="border-0 py-2 px-3"
            href="#"
            @click.prevent="handleGoToItem(group.id, category.id)"
            >{{ category.title }}</b-list-group-item>
          </template>
        </b-collapse>
      </b-list-group-item>
    </div>

    <div class="mt-4 mx-3">
      <p class="h4 text-dark mb-3">
        Sobre
      </p>
    </div>

    <b-list-group-item
    v-for="item in institucionalItems"
    :key="item.id"
    class="border-right-0 border-bottom-0 border-left-0 py-3 px-3 rounded-0"
    href="#"
    @click.prevent="handleGoToAboutItem(item.page)"
    >{{ item.name }}</b-list-group-item>

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
      institucionalItems: [
        { id: 1, name: 'Quem Somos', page: 'quem-somos' },
        { id: 2, name: 'Como comprar/navegar', page: 'como-comprar' },
        // { id: 3, name: 'Cancelamento', page: 'cancelamento' },
        { id: 4, name: 'Política de troca e devolução', page: 'politica-de-troca' },
        { id: 5, name: 'Termos de uso de Privacidade', page: 'termos' },
        { id: 6, name: 'Política de privacidade', page: 'politica-de-privacidade' },
      ]
    }
  },

  computed: {
    ...mapState({
      sidebar: state => state.sidebar,
      user: state => state.user,
      groupsList: state => state.group.groupsList,
    }),

    userFirstName() {
      return (typeof(this.user != 'undefined') && this.user.name) 
        ? this.user.name.split(' ')[0] 
        : ''
    },
  },
  
  created() {
  },

  methods: {
    ...mapActions([
      'setSidebarOpen',
      'setSidebarCurrentItem',
      'logout'
    ]),

    handleCloseSidebar() {
      this.setSidebarOpen(false)
    },

    handleSetSidebarCurrentItem(item) {
      this.setSidebarCurrentItem(item)
      this.setSidebarOpen(false)
      this.$router.push({ name: 'minha-conta' })
    },

    handleGoToItem(groupId, categoryId) {
      this.setSidebarOpen(false)
      this.$router.push({ path: `/busca?groupId=${groupId}&categoryId=${categoryId}` })
    },

    handleGoToAboutItem(item) {
      this.setSidebarOpen(false)
      this.$router.push({ name: item })
    },

    handleLogout() {
      this.logout()
      this.$router.push({ name: 'login' })
    }
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
