<template>
  <section class="container">
    <b-row align-h="center" class="my-5 m-md-5 px-md-5">
      <div class="d-flex justify-content-center" v-if="loading">
        <div class="spinner-grow text-primary my-5 p-5" role="status">
          <span class="sr-only">Carregando...</span>
        </div>
      </div>
      
      <b-col cols="12" md="8" class="bg-white border px-0 py-4 shadow-sm" v-if="!loading">
        <p class="h4 text-center pb-4">Endereço de entrega</p>

        <b-form @submit="handleNext" @reset="handleResetForm">
          <div class="d-flex flex-column mx-3">
            <div>
              <b-row>
                <b-col cols="12" md="3">
                  <label for="iptCEP">CEP</label>
                  <b-form-input
                  v-model="deliveryAddress.cep"
                  class="mb-3 shadow-sm"
                  id="iptCEP"
                  name="iptCEP"
                  ref="iptCEP"
                  placeholder="CEP"
                  :disabled="deliveryAddress.cep ? true : false"
                  ></b-form-input>
                </b-col>

                <!-- :disabled="deliveryAddress.street ? true : false" -->
                <b-col cols="12" md="7">
                  <label for="iptStreet">Endereço</label>
                  <b-form-input
                  v-model="deliveryAddress.street"
                  class="mb-3 shadow-sm"
                  id="iptStreet"
                  name="iptStreet"
                  ref="iptStreet"
                  placeholder="Endereço"
                  ></b-form-input>
                </b-col>

                <!-- :disabled="deliveryAddress.number ? true : false" -->
                <b-col cols="12" md="2">
                  <label for="iptNumber">Número</label>
                  <b-form-input
                  v-model="deliveryAddress.number"
                  class="mb-3 shadow-sm"
                  id="iptNumber"
                  name="iptNumber"
                  ref="iptNumber"
                  placeholder="Número"
                  ></b-form-input>
                </b-col>
              </b-row>

              <!-- :disabled="deliveryAddress.district ? true : false" -->
              <b-row>
                <b-col cols="12" md="6">
                  <label for="iptDistrict">Bairro</label>
                  <b-form-input
                  v-model="deliveryAddress.district"
                  class="mb-3 shadow-sm"
                  id="iptDistrict"
                  name="iptDistrict"
                  ref="iptDistrict"
                  placeholder="Bairro"
                  ></b-form-input>
                </b-col>

                <!-- :disabled="deliveryAddress.complement ? true : false" -->
                <b-col cols="12" md="6">
                  <label for="iptComplement">Complemento</label>
                  <b-form-input
                  v-model="deliveryAddress.complement"
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
                  v-model="deliveryAddress.city"
                  class="mb-3 shadow-sm"
                  id="iptCity"
                  name="iptCity"
                  ref="iptCity"
                  placeholder="Cidade"
                  :disabled="deliveryAddress.city ? true : false"
                  ></b-form-input>
                </b-col>

                <b-col cols="12" md="6">
                  <label for="iptState">Estado/UF</label>
                  <b-form-input
                  v-model="deliveryAddress.state"
                  class="mb-3 shadow-sm"
                  id="iptState"
                  name="iptState"
                  ref="iptState"
                  placeholder="Estado/UF"
                  :disabled="deliveryAddress.state ? true : false"
                  ></b-form-input>
                </b-col>
              </b-row>
            </div>
            
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center align-items-md-start mt-4">
              <div>
                <p class="m-0 mt-2 mb-4 mb-md-0">
                  Deseja alterar o endereço?
                  <b-link class="pl-1" @click.prevent="handleChangeAddress">Ir para o perfil</b-link>
                </p>
              </div>

              <div class="d-flex flex-column justify-content-center align-items-center w-50">
                <div class="mt-auto w-100">
                  <b-button
                  variant="primary"
                  class="ml-0 w-100"
                  @click="handleNext"
                  >Próximo</b-button>
                </div>

                <div class="text-center text-md-right mt-4">
                  <b-link @click.prevent="handleBack">Voltar</b-link>
                </div>
              </div>
            </div>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import Icon from '@/components/Icon'

import { mapActions, mapState } from 'vuex'
import _ from 'lodash'

export default {
  layout: 'checkout-layout',
  components: {
    Icon,
  },

  data() {
    return {
      loading: true,
      deliveryAddress: {
        cep: '',
        street: '',
        number: '',
        district: '',
        complement: '',
        city: '',
        state: '',
      }
    }
  },

  created() {
    const self = this

    // if (this.user && this.user.customer) {
    //   this.deliveryAddress = _.cloneDeep(this.user.customer.deliveryAddress)
    // } else {
    //   let guestUserAddress = localStorage.getItem('guestUserAddress')
    //   guestUserAddress = JSON.parse(guestUserAddress)
    //   this.deliveryAddress = guestUserAddress
    // }

    const isAddressChanged = localStorage.getItem('isAddressChanged')
    if (isAddressChanged == true || isAddressChanged == 'true') {
      this.$router.push({ name: 'carrinho' })
    }

    this.deliveryAddress = _.cloneDeep(this.user.customer.deliveryAddress)

    setTimeout(() => {
      self.loading = false
    }, 1000)

    this.setCheckoutCurrentStep('delivery')
  },

  watch: {
    'deliveryAddress.cep': async function(newCep) {
      const self = this

      if (newCep.length == 8) {
        await this.$axios.get(`https://viacep.com.br/ws/${newCep}/json/`)
        .then(({ data }) => {
          self.deliveryAddress.cep = data.cep.replace('-', '')
          self.deliveryAddress.street = data.logradouro
          self.deliveryAddress.complement = data.complemento
          self.deliveryAddress.district = data.bairro
          self.deliveryAddress.city = data.localidade
          self.deliveryAddress.state = data.uf
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
      'setCheckoutCurrentStep',
      'register',
      'setUserData',
    ]),

    handleBack() {
      this.$router.back()
    },

    handleNext() {
      const json = JSON.stringify(this.deliveryAddress)
      localStorage.setItem('deliveryAddress', json)
      this.$router.push({ name: 'checkout-pagamento' })
    },

    handleChangeAddress() {
      localStorage.setItem('isAddressChanged', true)
      this.$router.push({ name: 'minha-conta' })
    },

    handleResetForm() {
      // TODO
    }
  }
}
</script>

<style>
</style>