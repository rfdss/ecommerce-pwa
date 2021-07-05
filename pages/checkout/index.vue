<template>
  <section class="container">
    <b-row align-h="center" class="my-5 m-md-5 px-md-5">
      <div class="d-flex justify-content-center" v-if="loading">
        <div class="spinner-grow text-primary my-5 p-5" role="status">
          <span class="sr-only">Carregando...</span>
        </div>
      </div>

      <template v-if="user.id">
        <b-col cols="12" class="text-center" v-if="!loading">
          <Icon
          icon="ei:user"
          :width="120"
          :height="120"
          />

          <p class="h5 text-dark mb-3">
            Olá, {{ userFirstName }}!
          </p>

          <p class="h6 font-weight-normal text-dark">
            <b>CPF/CNPJ:</b> {{ user.cpfCnpj }}
          </p>

          <p class="h6 font-weight-normal text-dark">
            <b>E-mail:</b> {{ user.email }}
          </p>

          <p class="h6 font-weight-normal text-dark mb-4">
            <b>Celular:</b> ({{ user.telefoneDdd }}) {{ user.telefoneNumero }}
          </p>

          <b-button
          variant="primary"
          class="my-4"
          @click="handleNext"
          >Continuar</b-button>

          <!-- <p class="m-0">
            <b-link
            @click.prevent="handleChangeAccount"
            >Entrar com outra conta</b-link>
          </p> -->
        </b-col>
      </template>

      <template v-else>
        <b-col cols="0" md="3" class="d-none d-m-block"></b-col>
        
        <b-col cols="12" md="5" class="bg-white border px-0 py-4 shadow-sm" v-if="!loading && hasAccount">
          <p class="h4 text-center pt-3 pb-2">Login do Cliente</p>

          <b-form
          @submit.prevent="handleLogin"
          @reset="handleResetForm"
          >
            <div class="text-center mx-5">
              <b-form-input
              class="mt-4 mb-3 shadow-sm"
              placeholder="E-mail de acesso"
              v-model="loginForm.email"
              ></b-form-input>

              <b-form-input
              class="shadow-sm"
              placeholder="Senha de acesso"
              type="password"
              v-model="loginForm.password"
              ></b-form-input>

              <b-button
              variant="primary"
              class="my-4 w-100"
              @click="handleLogin"
              >ENTRAR</b-button>

              <p class="m-0 my-4">
                Não tem uma conta?
                <b-link
                @click.prevent="toggleHasAccount"
                >Cadastre-se aqui</b-link>
              </p>
            </div>
          </b-form>
        </b-col>

        <b-col cols="12" md="6" class="bg-white border px-0 py-4 shadow-sm" v-if="!loading && !hasAccount">
          <p class="h4 text-center pt-3 pb-2">Cadastro do Cliente</p>

          <b-form @submit="handleRegister" @reset="handleResetForm">
            <div class="mx-3">
              <div v-if="step == 1">
                <!-- <template v-if="personType == 'PF'"> -->
                  <label for="iptCPF">CPF</label>
                  <the-mask
                  v-model="form.cpf"
                  :mask="['###.###.###-##']"
                  class="form-control shadow-sm"
                  :class="{'mb-3': fieldError != 'cpf', 'border-danger mb-2': fieldError == 'cpf'}"
                  id="iptCPF"
                  name="iptCPF"
                  ref="iptCPF"
                  placeholder="Qual é o seu CPF?"
                  />
                  <div class="mb-2" v-if="fieldError == 'cpf'">
                    <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                  </div>

                  <label for="iptName">Nome</label>
                  <b-form-input
                  v-model="form.name"
                  class="shadow-sm"
                  :class="{'mb-3': fieldError != 'name', 'border-danger mb-2': fieldError == 'name'}"
                  id="iptName"
                  ref="iptName"
                  placeholder="Qual é o seu nome?"
                  ></b-form-input>
                  <div class="mb-2" v-if="fieldError == 'name'">
                    <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                  </div>
                <!-- </template> -->
              </div>

              <div v-if="step == 2">
                <b-form-group class="mb-3 text-center" label="Tipo de cadastro">
                  <b-form-radio-group
                  v-model="personType"
                  :options="personTypeOptions"
                  buttons
                  button-variant="outline-primary"
                  id="personType"
                  name="personType"
                  ref="personType"
                  ></b-form-radio-group>
                </b-form-group>
                <div class="text-center mb-3" v-if="fieldError == 'personType'">
                  <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                </div>

                <template v-if="personType == 'PJ'">
                  <label for="iptCNPJ">CNPJ</label>
                  <the-mask
                  v-model="form.customer.cnpj"
                  :mask="['##.###.###./####-##']"
                  class="form-control shadow-sm"
                  :class="{'mb-3': fieldError != 'cnpj', 'border-danger mb-2': fieldError == 'cnpj'}"
                  id="iptCNPJ"
                  name="iptCNPJ"
                  ref="iptCNPJ"
                  placeholder="Qual é o seu CNPJ?"
                  />
                  <div class="mb-2" v-if="fieldError == 'cnpj'">
                    <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                  </div>

                  <label for="iptRazaoSocial">Razão social</label>
                  <b-form-input
                  v-model="form.customer.name"
                  class="shadow-sm"
                  :class="{'mb-3': fieldError != 'razaoSocial', 'border-danger mb-2': fieldError == 'razaoSocial'}"
                  id="iptRazaoSocial"
                  name="iptRazaoSocial"
                  ref="iptRazaoSocial"
                  placeholder="Razão social"
                  ></b-form-input>
                  <div class="mb-2" v-if="fieldError == 'razaoSocial'">
                    <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                  </div>

                  <label for="iptTradeName">Nome fantasia</label>
                  <b-form-input
                  v-model="form.customer.tradeName"
                  class="shadow-sm"
                  :class="{'mb-3': fieldError != 'tradeName', 'border-danger mb-2': fieldError == 'tradeName'}"
                  id="iptTradeName"
                  name="iptTradeName"
                  ref="iptTradeName"
                  placeholder="Nome fantasia"
                  ></b-form-input>
                  <div class="mb-2" v-if="fieldError == 'tradeName'">
                    <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                  </div>

                  <label for="iptEmailNFE">E-mail nota fiscal</label>
                  <b-form-input
                  v-model="form.customer.emailNFE"
                  type="email"
                  class="shadow-sm"
                  :class="{'mb-3': fieldError != 'emailNFE', 'border-danger mb-2': fieldError == 'emailNFE'}"
                  id="iptEmailNFE"
                  name="iptEmailNFE"
                  ref="iptEmailNFE"
                  placeholder="Qual é o seu e-mail para NFe?"
                  ></b-form-input>
                  <div class="mb-2" v-if="fieldError == 'emailNFE'">
                    <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                  </div>

                  <label for="iptIE">Inscrição estadual</label>
                  <b-form-input
                  v-model="form.customer.ie"
                  class="shadow-sm"
                  :class="{'mb-3': fieldError != 'ie', 'border-danger mb-2': fieldError == 'ie'}"
                  id="iptIE"
                  name="iptIE"
                  ref="iptIE"
                  placeholder="Inscrição estadual"
                  ></b-form-input>
                  <div class="mb-2" v-if="fieldError == 'ie'">
                    <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                  </div>
                </template>

                <label for="iptPhone">Celular</label>
                <the-mask
                v-model="form.phone"
                :mask="['(##) ####-####', '(##) #####-####']"
                class="form-control shadow-sm"
                :class="{'mb-3': fieldError != 'phone', 'border-danger mb-2': fieldError == 'phone'}"
                id="iptPhone"
                name="iptPhone"
                ref="iptPhone"
                placeholder="Qual é o seu celular?"
                ></the-mask>
                <div class="mb-2" v-if="fieldError == 'phone'">
                  <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                </div>

                <label for="iptEmail">E-mail</label>
                <b-form-input
                v-model="form.email"
                type="email"
                class="shadow-sm"
                :class="{'mb-3': fieldError != 'email', 'border-danger mb-2': fieldError == 'email'}"
                id="iptEmail"
                name="iptEmail"
                ref="iptEmail"
                placeholder="Qual é o seu e-mail?"
                ></b-form-input>
                <div class="mb-2" v-if="fieldError == 'email'">
                  <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                </div>

                <label for="iptPassword">Senha de acesso</label>
                <b-form-input
                v-model="form.password"
                type="password"
                class="shadow-sm"
                :class="{'mb-3': fieldError != 'password', 'border-danger mb-2': fieldError == 'password'}"
                id="iptPassword"
                name="iptPassword"
                ref="iptPassword"
                placeholder="Crie uma senha de acesso"
                ></b-form-input>
                <div class="mb-2" v-if="fieldError == 'password'">
                  <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                </div>
              </div>

              <b-button
              variant="primary"
              class="w-100 my-3"
              @click="handleRegister">
                <template v-if="step < 2">
                  Próximo
                </template>

                <template v-else>
                Finalizar Cadastro
                </template>
              </b-button>

              <p class="text-center m-0 mt-2 mb-4">
                Já possui uma conta?
                <b-link class="pl-1" @click.prevent="toggleHasAccount">Fazer login</b-link>
              </p>
            </div>
          </b-form>
        </b-col>

        <b-col cols="0" md="3" class="d-none d-m-block"></b-col>
      </template>
    </b-row>
  </section>
</template>

<script>
import Icon from '@/components/Icon'
import _ from 'lodash'
import { mapActions, mapState } from 'vuex'

export default {
  layout: 'checkout-layout',
  components: {
    Icon,
  },

  data() {
    return {
      hasAccount: true,
      loading: true,

      step: 1,
      fieldError: '',
      fieldErrorMsg: '',

      personType: '',
      personTypeOptions: [
        { text: 'Pessoa Física', value : 'PF' },
        { text: 'Pessoa Jurídica', value: 'PJ' }
      ],

      loginForm: {
        email: '',
        password: '',
      },

      form: {
        name: '',
        cpf: '',
        phone: '',
        email: '',
        password: '',
        customer: {
          name: '',
          tradeName: '',
          cnpj: '',
          emailNFE: '',
          ie: '',
          deliveryAddress: {
            cep: '',
            street: '',
            number: '',
            district: '',
            complement: '',
            city: '',
            state: ''
          }
        }
      }
    }
  },

  created() {
    const self = this

    setTimeout(() => {
      self.loading = false
    }, 1000)

    this.setCheckoutCurrentStep('auth')
  },

  computed: {
    ...mapState({
      user: state => state.user,
    }),

    userFirstName() {
      return (typeof(this.user != 'undefined') && this.user.name) 
        ? this.user.name.split(' ')[0]
        : ''
    },
  },

  methods: {
    ...mapActions([
      'setCheckoutCurrentStep',
      'login',
      'register',
      'setUserData',
      'setOverlay',
      'setToast'
    ]),

    handleNext() {
      this.$router.push({ name: 'checkout-revisao-pedido' })
    },

    handleChangeAccount() {
      this.setToast({
        type: 'warning',
        title: 'Atenção!',
        content: 'Ao mudar de conta, você será redirecionado<br> para o carrinho novamente ' +
          'onde será solicitado seu CEP<br> para a validação de valores minimos de cada fornecedor.'
      })
    },

    toggleHasAccount() {
      this.hasAccount = !this.hasAccount
    },

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
        let guestUserAddress = localStorage.getItem('guestUserAddress')
        guestUserAddress = JSON.parse(guestUserAddress)
        
        let userData = _.omit(data, 'password')

        if (typeof(guestUserAddress) != 'undefined' && guestUserAddress != null) {
          userData.customer = _.first(userData.customers) || {}
          userData.customer.deliveryAddress = guestUserAddress
          userData.customer.localAddress = guestUserAddress
        }
        
        self.setUserData(userData)
        self.setOverlay(null)
        self.$router.push({ name: 'checkout-revisao-pedido' })
      })
      .catch(error => {
        const errorMsg = (error.response) 
          ? error.response.data 
          : 'ERROR: Response data is undefined'

        self.setOverlay({ open: false, loading: false })
        self.setToast({
          type: 'danger',
          title: 'Atenção!',
          content: errorMsg
        })
      })
    },

    validateForm() {
      if (this.step == 1) {
        if (!this.form.cpf) {
          this.fieldError = 'cpf'
          this.fieldErrorMsg = '* CPF obrigatório'
          this.$refs.iptCPF.$el.scrollIntoView()
          return false
        }

        if (!this.form.name) {
          this.fieldError = 'name'
          this.fieldErrorMsg = '* Nome obrigatório'
          this.$refs.iptName.$el.scrollIntoView()
          return false
        }
      }

      if (this.step == 2) {
        if (!this.personType) {
          this.fieldError = 'personType'
          this.fieldErrorMsg = '* Tipo de cadastro obrigatório'
          this.$refs.personType.$el.scrollIntoView()
          return false
        }

        if (this.personType == 'PJ') {
          if (!this.form.customer.cnpj) {
            this.fieldError = 'cnpj'
            this.fieldErrorMsg = '* CNPJ obrigatório'
            this.$refs.iptCNPJ.$el.scrollIntoView()
            return false
          }

          if (!this.form.customer.name) {
            this.fieldError = 'razaoSocial'
            this.fieldErrorMsg = '* Razão social obrigatório'
            this.$refs.iptRazaoSocial.$el.scrollIntoView()
            return false
          }

          if (!this.form.customer.tradeName) {
            this.fieldError = 'tradeName'
            this.fieldErrorMsg = '* Nome fantasia obrigatório'
            this.$refs.iptTradeName.$el.scrollIntoView()
            return false
          }

          if (!this.form.customer.emailNFE) {
            this.fieldError = 'emailNFE'
            this.fieldErrorMsg = '* E-mail para nota fiscal obrigatório'
            this.$refs.iptEmailNFE.$el.scrollIntoView()
            return false
          }

          if (!this.form.customer.ie) {
            this.fieldError = 'ie'
            this.fieldErrorMsg = '* Inscrição estadual obrigatório'
            this.$refs.iptIE.$el.scrollIntoView()
            return false
          }
        }

        if (!this.form.phone) {
          this.fieldError = 'phone'
          this.fieldErrorMsg = '* Celular obrigatório'
          return false
        }

        if (!this.form.email) {
          this.fieldError = 'email'
          this.fieldErrorMsg = '* E-mail obrigatório'
          return false
        }

        if (!this.form.password) {
          this.fieldError = 'password'
          this.fieldErrorMsg = '* Senha de acesso obrigatório'
          return false
        }
      }

      if (this.step == 3) {
        if (!this.form.customer.deliveryAddress.cep) {
          this.fieldError = 'cep'
          this.fieldErrorMsg = '* CEP obrigatório'
          return false
        }
        // TODO: verificar se precisa validar campos de endereço, pois ao digitar o cep já preenche os mesmos
        // ou ao digitar o cep e preencher o restante, bloquear edição.
      }

      this.fieldError = ''
      this.fieldErrorMsg = ''
      return true
    },

    handleRegister() {
      if (!this.validateForm()) return false

      if (this.step < 3) {
        this.step++
        return false
      }

      if (this.personType == 'PF') {
        this.form.customer.cnpj = this.form.cpf
        this.form.customer.name = this.form.name
        this.form.customer.tradeName = this.form.name
        this.form.customer.emailNFE = this.form.email
        this.form.customer.ie = 0
      }

      const self = this
      const values = _.omit(this.form, 'passwordConfirm')

      this.setOverlay({ open: true, loading: true })

      this.register(values)
      .then(({ data }) => {
        const { email, password } = self.form

        self.login({ email, password })
        .then(response => {
          let userData = _.omit(response.data, 'password')
          const guestUserAddress = localStorage.getItem('guestUserAddress')
          
          if (typeof(guestUserAddress) != 'undefined' && guestUserAddress != null) {
            userData = { ...userData, address: guestUserAddress }
          }

          // if (typeof(guestUserAddress) != 'undefined' && guestUserAddress != null && !userData.customer) {
          //   userData.customer.deliveryAddress = guestUserAddress
          //   userData.customer.localAddress = guestUserAddress
          // }

          self.setUserData(userData)
          self.setOverlay(null)
          self.$router.push({ name: 'checkout-entrega' })

        }).catch(error => {
          alert(error.response.data)
        })
        
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

    handleResetForm() {
      // TO DO
    },
  }
}
</script>

<style>
</style>