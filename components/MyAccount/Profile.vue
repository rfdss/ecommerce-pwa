<template>
  <section class="mt-5 mx-0 mx-md-2">
    <p class="h5 text-dark text-center text-md-left d-block d-md-none pb-3 pb-md-4">Meus dados</p>
    <p class="h2 text-dark text-center text-md-left d-none d-md-block pb-3 pb-md-4">Meus dados</p>

    <b-form
    class="border-bottom mb-5 bg-white pt-4 w-100"
    @submit="handleSaveProfile"
    @reset="handleResetForm"
    >
      <p class="h5 font-weight-normal border-bottom pb-4 pl-3">Dados pessoais</p>
      <div class="d-flex flex-column mx-3 py-3">
        <div>
          <b-row>
            <b-col cols="12" md="6">
              <label for="iptCPF">CPF</label>
              <the-mask
              v-model="form.cpf"
              :mask="['###.###.###-##']"
              class="form-control shadow-sm"
              :class="{'mb-3': fieldError != 'cpf', 'border-danger mb-3': fieldError == 'cpf'}"
              id="iptCPF"
              name="iptCPF"
              ref="iptCPF"
              placeholder="Número do seu CPF"
              />
              <div class="mb-2" v-if="fieldError == 'cpf'">
                <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
              </div>
            </b-col>

            <b-col cols="12" md="6">
              <label for="iptName">Nome</label>
              <b-form-input
              v-model="form.name"
              class="shadow-sm"
              :class="{'mb-3': fieldError != 'name', 'border-danger mb-2': fieldError == 'name'}"
              id="iptName"
              name="iptName"
              ref="iptName"
              placeholder="Nome completo"
              ></b-form-input>
              <div class="mb-2" v-if="fieldError == 'name'">
                <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
              </div>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" md="6">
              <label for="iptEmail">E-mail</label>
              <b-form-input
              v-model="form.email"
              class="shadow-sm"
              id="iptEmail"
              name="iptEmail"
              ref="iptEmail"
              placeholder="Seu melhor e-mail"
              ></b-form-input>
            </b-col>

            <b-col cols="12" md="6">
              <label for="iptPhone">Celular</label>
              <the-mask
              v-model="form.phone"
              :mask="['(##) ####-####', '(##) #####-####']"
              class="form-control shadow-sm"
              :class="{'mb-3': fieldError != 'phone', 'border-danger mb-2': fieldError == 'phone'}"
              id="iptPhone"
              name="iptPhone"
              ref="iptPhone"
              placeholder="Número do seu celular"
              />
            </b-col>
          </b-row>
        </div>

        <div class="text-right my-4">
          <b-button
          variant="primary"
          class="ml-0 w-100"
          @click="handleSaveProfile"
          >Salvar alterações</b-button>
        </div>
      </div>
    </b-form>

    <b-form
    class="border-bottom mb-5 bg-white pt-4 w-100"
    @submit="handleSaveCustomer"
    @reset="handleResetForm"
    >
      <p class="h5 font-weight-normal border-bottom pb-4 pl-3">Dados de faturamento</p>
      <div class="d-flex flex-column mx-3 py-3">
        <div>
          <b-row>
            <b-col cols="12" md="4">
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
            </b-col>

            <b-col cols="12" md="8">
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
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12">
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
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" md="6">
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
            </b-col>

            <b-col cols="12" md="6">
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
            </b-col>
          </b-row>

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
              placeholder="CEP"
              ></b-form-input>
              <div class="mb-2" v-if="fieldError == 'cep'">
                <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
              </div>
            </b-col>

            <b-col cols="12" md="7">
              <label for="iptStreet">Endereço</label>
              <b-form-input
              v-model="form.customer.deliveryAddress.street"
              class="mb-3 shadow-sm"
              id="iptStreet"
              name="iptStreet"
              ref="iptStreet"
              placeholder="Endereço"
              ></b-form-input>
            </b-col>
            
            <b-col cols="12" md="2">
              <label for="iptNumber">Número</label>
              <b-form-input
              v-model="form.customer.deliveryAddress.number"
              class="mb-3 shadow-sm"
              id="iptNumber"
              name="iptNumber"
              ref="iptNumber"
              placeholder="Número"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" md="6">
              <label for="iptDistrict">Bairro</label>
              <b-form-input
              v-model="form.customer.deliveryAddress.district"
              class="mb-3 shadow-sm"
              id="iptDistrict"
              name="iptDistrict"
              ref="iptDistrict"
              placeholder="Bairro"
              ></b-form-input>
            </b-col>

            <b-col cols="12" md="6">
              <label for="iptComplement">Complemento</label>
              <b-form-input
              v-model="form.customer.deliveryAddress.complement"
              class="mb-3 shadow-sm"
              id="iptComplement"
              name="iptComplement"
              ref="iptComplement"
              placeholder="Complemento"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" md="6">
              <label for="iptCity">Cidade</label>
              <b-form-input
              v-model="form.customer.deliveryAddress.city"
              class="mb-3 shadow-sm"
              id="iptCity"
              name="iptCity"
              ref="iptCity"
              placeholder="Cidade"
              ></b-form-input>
            </b-col>

            <b-col cols="12" md="6">
              <label for="iptState">Estado/UF</label>
              <b-form-input
              v-model="form.customer.deliveryAddress.state"
              class="mb-3 shadow-sm"
              id="iptState"
              name="iptState"
              ref="iptState"
              placeholder="Estado"
              ></b-form-input>
            </b-col>
          </b-row>
        </div>
        
        <div class="d-flex justify-content-end align-items-center my-4">
          <div class="mt-auto w-100 w-md-50">
            <b-button
            variant="primary"
            class="ml-0 w-100"
            @click="handleSaveCustomer"
            >Salvar alterações</b-button>
          </div>
        </div>
      </div>
    </b-form>
  </section>
</template>

<script>

import { mapActions, mapState } from 'vuex'
import _ from 'lodash'

export default {
  data() {
    return {
      fieldError: '',
      fieldErrorMsg: '',

      form: {
        cpf: '',
        name: '',
        phone: '',
        email: '',
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
      },
    }
  },

  created() {
    const self = this

    setTimeout(() => {

      self.form.name = self.user.name
      self.form.cpf = self.user.cpfCnpj
      self.form.email = self.user.email
      self.form.phone = `${self.user.telefoneDdd}${self.user.telefoneNumero}`

      if (self.user.customer != null) {
        self.form.customer = _.cloneDeep(self.user.customer)
        console.log(self.user.customer)
      }

    }, 1000)
  },

  watch: {
    'form.customer.deliveryAddress.cep': async function(newCep) {
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
          alert(error.response.data)
        })
      }
    }
  },

  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },

  methods: {
    ...mapActions([
      'register',
      'saveAddress',
      'setUserAddress',
      'logout',
      'setToast'
    ]),

    validateMyDataForm() {
      if (!this.form.cpf) {
        this.fieldError = 'cpf'
        this.fieldErrorMsg = '* CPF obrigatório'
        return false
      }

      if (!this.form.name) {
        this.fieldError = 'name'
        this.fieldErrorMsg = '* Nome obrigatório'
        this.$refs.iptName.$el.scrollIntoView()
        return false
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

      this.fieldError = ''
      this.fieldErrorMsg = ''
      return true
    },

    validateCustomerForm() {
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

      if (!this.form.customer.deliveryAddress.cep) {
        this.fieldError = 'cep'
        this.fieldErrorMsg = '* CEP obrigatório'
        this.$refs.iptCEP.$el.scrollIntoView()
        return false
      }

      this.fieldError = ''
      this.fieldErrorMsg = ''
      return true
    },

    handleSaveProfile() {
      if (!this.validateMyDataForm()) return false
      
      let toastMsg = 'Nenhuma alteração foi realizada!'
      let toastType = 'success'
      
      const self = this

      this.register(this.form)
      .then(async (response) => {
        if (response.data === 'Created' || response.data === 'Ok') {
          toastMsg = 'Alterações salvas com sucesso!'
        } else {
          toastType = 'danger'
          toastMsg = 'Problemas ao salvar os dados, tente novamente.'
        }

        const userAux = _.cloneDeep(self.user)
        const phone = self.form.phone.replace(/\D/g, '')

        userAux.cpf = self.form.cpf
        userAux.name = self.form.name
        userAux.email = self.form.email
        userAux.telefoneDdd = phone.substring(0, 2)
        userAux.telefoneNumero = phone.substring(2, phone.length)

        self.setUserData(userAux)

        self.setToast({
          type: toastType,
          title: 'Atenção!',
          content: toastMsg,
        })
      })
      .catch(error => {
        self.setToast({
          type: 'danger',
          title: 'Atenção!',
          content: error.response.data,
        })
      })
    },

    handleSaveCustomer() {
      if (!this.validateCustomerForm()) return false

      let toastMsg = 'Nenhuma alteração foi realizada!'
      let toastType = 'success'

      const self = this

      this.saveAddress(this.form.customer)
      .then((response) => {
        if (response.data === 'Created' || response.data === 'Ok') {
          toastMsg = 'Alterações salvas com sucesso!'
        } else {
          toastType = 'danger'
          toastMsg = 'Problemas ao salvar o endereço, tente novamente.'
        }

        self.setUserAddress(self.form.customer.deliveryAddress)

        self.setToast({
          type: toastType,
          title: 'Atenção!',
          content: toastMsg,
        })
      })
      .catch(error => {
        self.setToast({
          type: 'danger',
          title: 'Atenção!',
          content: error.response.data,
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
