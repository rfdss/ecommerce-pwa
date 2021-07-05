<template>
  <b-container id="loginContainer">
    <b-row class="mt-md-5 mb-md-5" align-v="baseline" align-h="center">
      <b-col cols="12" md="4" class="bg-white border p-2 shadow-sm">
        <div class="text-center mt-5 mb-3 pt-5">
          <b-link to="/" class="logo-circle pt-5 pt-md-0 pr-2">
            <b-img
            class="shadow"
            src="~/static/whitelabel-logo.png"
            width="120"
            height="120"
            alt="Whitelabel"
            ></b-img>
          </b-link>
          <p class="h4 text-center mt-5 mt-md-0 pt-5">Login do Cliente</p>
        </div>

        <b-form @submit.prevent="handleLogin" @reset="handleResetForm">
          <div class="mx-5">
            <label for="iptEmail">E-mail</label>
            <b-form-input
            v-model="loginForm.email"
            class="mb-3 shadow-sm"
            placeholder="E-mail de acesso"
            ></b-form-input>

            <label for="iptPassword">Senha</label>
            <b-form-input
            v-model="loginForm.password"
            type="password"
            class="mb-3 shadow-sm"
            id="iptPassword"
            placeholder="Senha de acesso"
            ></b-form-input>

            <b-button
            variant="primary"
            class="w-100 my-3"
            @click="handleLogin"
            >ENTRAR</b-button>

            <p class="text-center m-0 mt-2 mb-4">
              Não tem uma conta? <b-link to="/cadastro">Cadastre-se aqui</b-link>
            </p>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Icon from '@/components/Icon'

import { mapActions } from 'vuex'
import omit from 'lodash/omit'

export default {
  layout: 'login-layout',
  components: {
    Icon,
  },
  
  data() {
    return {
      loginForm: {
       email: '',
       password: '',
      },
    }
  },

  methods: {
    ...mapActions([
      'login',
      'register',
      'setUserData',
      'setOverlay',
      'setToast',
    ]),

    handleLogin() {
      let { email, password } = this.loginForm

      if (!email || !password) {
        this.setToast({
          type: 'danger',
          title: 'Atenção!',
          content: 'Preencha os campos obrigatórios'
        })
        
        return false
      }

      const self = this
      this.setOverlay({ open: true, loading: true })

      this.login({ email, password })
      .then(({ data }) => {
        const userData = omit(data, 'password')
        self.setUserData(userData)
        self.setOverlay(null)
        self.$router.push({ name: 'index' })
      })
      .catch(error => {
        self.setOverlay({ open: false, loading: false })
        self.setToast({
          type: 'danger',
          title: 'Atenção!',
          content: error.response.data
        })
      })
    },

    handleRegister() {
      this.router.push({ name: 'cadastro' })
    },

    handleResetForm() {
      // Nothing
    }
  }
}
</script>

<style lang="scss">
</style>
