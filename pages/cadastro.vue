<template>
  <b-container>
    <b-row class="mt-5 mb-5" align-v="baseline" align-h="center">
      <b-col cols="12" :md="(step < 3) ? 4 : 7" class="bg-white border p-2 shadow-sm">
        <div class="text-center mt-5 mb-3 pt-5">
          <b-link to="/" class="logo-circle pr-2">
            <b-img
            class="shadow"
            src="~/static/whitelabel-ecommerce-app-logo.png"
            width="120"
            height="120"
            alt="Whitelabel Ecommerce PWA"
            ></b-img>
          </b-link>
          <p class="h4 text-center pt-5 pb-2">Cadastro do Cliente</p>
        </div>

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

            <!-- ENDEREÇO DE ENTREGA -->
            <div v-if="step >= 3">
              <b-row>
                <b-col cols="12" md="3">
                  <label for="iptCEP">CEP</label>
                  <b-form-input
                  v-model="form.customer.deliveryAddress.cep"
                  class="shadow-sm"
                  :class="{'mb-3': fieldError != 'cep', 'border-danger mb-2': fieldError == 'cep'}"
                  id="iptCEP"
                  name="iptCEP"
                  ref="iptCEP"
                  placeholder="Qual é o CEP?"
                  ></b-form-input>
                  <div class="mb-2" v-if="fieldError == 'cep'">
                    <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                  </div>
                </b-col>

                <b-col cols="12" md="7">
                  <label for="iptStreet">Endereço</label>
                  <b-form-input
                  v-model="form.customer.deliveryAddress.street"
                  class="shadow-sm"
                  :class="{'mb-3': fieldError != 'street', 'border-danger mb-2': fieldError == 'street'}"
                  id="iptStreet"
                  name="iptStreet"
                  ref="iptStreet"
                  placeholder="Qual é o endereço?"
                  ></b-form-input>
                  <div class="mb-2" v-if="fieldError == 'street'">
                    <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                  </div>
                </b-col>

                <b-col cols="12" md="2">
                  <label for="iptNumber">Número</label>
                  <b-form-input
                  v-model="form.customer.deliveryAddress.number"
                  class="shadow-sm"
                  :class="{'mb-3': fieldError != 'number', 'border-danger mb-2': fieldError == 'number'}"
                  id="iptNumber"
                  name="iptNumber"
                  ref="iptNumber"
                  placeholder="Qual é o numero do endereço?"
                  ></b-form-input>
                  <div class="mb-2" v-if="fieldError == 'number'">
                    <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                  </div>
                </b-col>                  
              </b-row>

              <b-row>
                <b-col cols="12" md="6">
                  <label for="iptDistrict">Bairro</label>
                  <b-form-input
                  v-model="form.customer.deliveryAddress.district"
                  class="shadow-sm"
                  :class="{'mb-3': fieldError != 'district', 'border-danger mb-2': fieldError == 'district'}"
                  id="iptDistrict"
                  name="iptDistrict"
                  ref="iptDistrict"
                  placeholder="Qual é o bairro?"
                  ></b-form-input>
                  <div class="mb-2" v-if="fieldError == 'district'">
                    <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                  </div>
                </b-col>

                <b-col cols="12" md="6">
                  <label for="iptComplement">Complemento</label>
                  <b-form-input
                  v-model="form.customer.deliveryAddress.complement"
                  class="mb-3 shadow-sm"
                  id="iptComplement"
                  name="iptComplement"
                  ref="iptComplement"
                  placeholder="Algum complemento?"
                  ></b-form-input>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12" md="6">
                  <label for="iptCity">Cidade</label>
                  <b-form-input
                  v-model="form.customer.deliveryAddress.city"
                  class="shadow-sm"
                  :class="{'mb-3': fieldError != 'city', 'border-danger mb-2': fieldError == 'city'}"
                  id="iptCity"
                  name="iptCity"
                  ref="iptCity"
                  placeholder="Qual é a cidade?"
                  ></b-form-input>
                  <div class="mb-2" v-if="fieldError == 'city'">
                    <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                  </div>
                </b-col>

                <b-col cols="12" md="6">
                  <label for="iptState">Estado/UF</label>
                  <b-form-input
                  v-model="form.customer.deliveryAddress.state"
                  class="shadow-sm"
                  :class="{'mb-3': fieldError != 'state', 'border-danger mb-2': fieldError == 'state'}"
                  id="iptState"
                  name="iptState"
                  ref="iptState"
                  placeholder="Qual é o Estado?"
                  ></b-form-input>
                  <div class="mb-2" v-if="fieldError == 'state'">
                    <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                  </div>
                </b-col>
              </b-row>
            </div>

            <b-button
            variant="primary"
            class="w-100 my-3"
            @click="handleRegister">
              <template v-if="step < 3">
                Próximo
              </template>

              <template v-else>
              Finalizar Cadastro
              </template>
            </b-button>

            <p class="text-center m-0 mt-2 mb-4">
              <template v-if="step == 1">
                Já possui uma conta?
                <b-link class="pl-1" to="/login">Fazer login</b-link>
              </template>

              <template v-else-if="step > 1">
                <b-link @click.prevent="handleBack">Voltar</b-link>
              </template>
            </p>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Icon from '@/components/Icon'

import _ from 'lodash'
import { mapActions, mapState } from 'vuex'

export default {
  layout: 'login-layout',
  components: {
    Icon,
  },
  
  data() {
    return {
      loading: false,
      
      step: 1,
      fieldError: '',
      fieldErrorMsg: '',

      personType: '',
      personTypeOptions: [
        { text: 'Pessoa Física', value : 'PF' },
        { text: 'Pessoa Jurídica', value: 'PJ' }
      ],

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

  watch: {
    'form.customer.deliveryAddress.cep': async function (newCep) {
      const self = this

      if (newCep.length == 8 && !this.loading) {
        await this.$axios.get(`https://viacep.com.br/ws/${newCep}/json/`)
        .then(({ data }) => {
          self.form.customer.deliveryAddress.cep = data.cep.replace('-', '')
          self.form.customer.deliveryAddress.street = data.logradouro
          self.form.customer.deliveryAddress.complement = data.complemento
          self.form.customer.deliveryAddress.district = data.bairro
          self.form.customer.deliveryAddress.city = data.localidade
          self.form.customer.deliveryAddress.state = data.uf
        })
        .catch(error => {
          console.log(error)
        })
      }
    }
  },

  methods: {
    ...mapActions([
      'login',
      'register',
      'setUserData',
      'setOverlay',
      'setToast'
    ]),

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

    handleBack() {
      if (this.step > 1) this.step--
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

      this.setOverlay({ loading: true, open: true })

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

          self.setUserData(userData)
          self.setOverlay(null)
          self.$router.push({ name: 'index' })

        }).catch(error => {
          alert(error.response.data)
        })
        
      })
      .catch(({ response }) => {
        self.setOverlay({ open: false, loading: false })
        self.setToast({
          type: 'danger',
          title: 'Atenção!',
          content: response.data
        })
      })
    },

    handleResetForm() {
      // Nothing
    }
  }
}
</script>

<style lang="scss">
</style>
