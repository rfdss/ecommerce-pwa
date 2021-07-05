<template>
  <footer class="bg-white shadow-sm border-top d-none d-lg-block">
    <b-container class="py-5">
      <b-row align-v="baseline" align-h="center">
        <b-col cols="12" md="3" class="text-center text-md-left mb-5 mb-md-0">
          <p class="h4 text-primary mb-4">Institucional</p>
          <ul class="navbar-nav">
            <li class="py-2" v-for="item in institucionalItems" :key="item.id">
              <b-link class="text-dark" :to="item.href">{{ item.name }}</b-link>
            </li>
          </ul>
        </b-col>

        <b-col cols="12" md="3" class="text-center text-md-left">
          <p class="h4 text-primary mb-4">Fale conosco</p>
          <ul class="navbar-nav">
            <li class="py-2">
              <b-link class="text-dark" href="mail:contato@whitelabel.com.br">contato@whitelabel.com.br</b-link>
            </li>
          </ul>
        </b-col>

        <b-col cols="12" md="5" offset="1" class="d-none d-lg-block">
          <b-img src="~/static/payments.jpeg" alt=""></b-img>
          <b-row class="mt-5" align-v="center">
            <b-col>
              <b-img src="~/static/lets-encrypt.jpeg" width="100" height="100" alt=""></b-img>
            </b-col>

            <b-col>
              <b-img src="~/static/google-https.jpeg" width="100" height="40" alt=""></b-img>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  components: {
    Icon,
  },

  data() {
    return {
      institucionalItems: [
        { id: 1, name: 'Quem Somos', href: '/quem-somos' },
        { id: 2, name: 'Como comprar/navegar', href: '/como-comprar' },
        // { id: 3, name: 'Cancelamento', href: '/cancelamento' },
        { id: 4, name: 'Política de troca e devolução', href: '/politica-de-troca' },
        { id: 5, name: 'Termos de uso de Privacidade', href: '/termos' },
        { id: 6, name: 'Política de privacidade', href: '/politica-de-privacidade' },
      ]
    }
  },
  
  methods: {}
}
</script>

<style>
</style>
