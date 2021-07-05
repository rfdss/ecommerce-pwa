<template>
  <section class="container">
    <b-row align-h="center" class="my-5 m-md-5 px-md-5">
      <div class="d-flex justify-content-center" v-if="loading">
        <div class="spinner-grow text-primary my-5 p-5" role="status">
          <span class="sr-only">Carregando...</span>
        </div>
      </div>
      
      <b-col cols="12" md="12" lg="8" class="bg-white border px-0 py-5 shadow-sm" v-if="!loading">
        <p class="h4 text-center pb-4">Dados de Pagamento</p>
        <b-form
        @submit="handleSaveOrder"
        @reset="handleResetForm"
        >
          <div class="d-flex flex-column mx-3">
            <div class="mb-4">
              <template v-if="step == 1">
                <b-row class="mb-3">
                  <b-col cols="12" md="12">
                    <b-form-group class="text-center">
                      <b-form-radio-group
                      v-model="paymentType"
                      :options="slipBankOptions"
                      buttons
                      button-variant="outline-primary"
                      size="lg"
                      id="paymentType"
                      name="paymentType"
                      :disabled="step == 3 ? true : false"
                      ></b-form-radio-group>
                    </b-form-group>

                    <div class="text-center" v-if="fieldError == 'paymentType'">
                      <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                    </div>
                  </b-col>
                </b-row>
              </template>

              <template v-if="step == 2 || step == 3">
                <b-row>
                  <b-col cols="12" md="5">
                    <label for="iptCardNumber">Número do cartão</label>
                    <the-mask
                    v-model="payment.cardNumber"
                    :mask="['#### #### #### ####']"
                    class="form-control shadow-sm"
                    :class="{'mb-3': fieldError != 'cardNumber', 'border-danger mb-2': fieldError == 'cardNumber'}"
                    id="iptCardNumber"
                    placeholder="0000 0000 0000 0000"
                    :disabled="(payment.slipBank == 1 || step == 3) ? true : false"
                    ></the-mask>
                    <div class="mb-3" v-if="fieldError == 'cardNumber'">
                      <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                    </div>
                  </b-col>

                  <b-col cols="12" md="4">
                    <label for="iptSecurityCode">Código segurança</label>
                    <the-mask
                    v-model="payment.securityCode"
                    :mask="['###']"
                    class="form-control shadow-sm"
                    :class="{'mb-3': fieldError != 'securityCode', 'border-danger mb-2': fieldError == 'securityCode'}"
                    id="iptSecurityCode"
                    placeholder="000"
                    :disabled="(payment.slipBank == 1 || step == 3) ? true : false"
                    ></the-mask>
                    <div class="mb-3" v-if="fieldError == 'securityCode'">
                      <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                    </div>
                  </b-col>
                  
                  <b-col cols="12" md="3">
                    <label for="iptValidateDate">Data validade</label>
                    <the-mask
                    v-model="payment.validateDate"
                    :mask="['##/##']"
                    class="form-control shadow-sm"
                    :class="{'mb-3': fieldError != 'validateDate', 'border-danger mb-2': fieldError == 'validateDate'}"
                    id="iptValidateDate"
                    placeholder="mm/aa"
                    :disabled="(payment.slipBank == 1 || step == 3) ? true : false"
                    ></the-mask>
                    <div class="mb-3" v-if="fieldError == 'validateDate'">
                      <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                    </div>
                  </b-col>
                </b-row>

                <b-row>
                  <b-col cols="12" md="3">
                    <label for="slcCardCompany">Bandeira</label>
                    <b-form-select
                    class="shadow-sm"
                    :class="{'mb-3': fieldError != 'companyName', 'border-danger mb-2': fieldError == 'companyName'}"
                    v-model="payment.companyName"
                    :options="[
                      { value: null, text: 'Selecione...' },
                      { value: 'VISA', text: 'VISA' },
                      { value: 'MASTER', text: 'MASTER' },
                      { value: 'ELO', text: 'ELO' }
                    ]"
                    :disabled="(payment.slipBank == 1 || step == 3) ? true : false"
                    ></b-form-select>
                    <div class="mb-3" v-if="fieldError == 'companyName'">
                      <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                    </div>
                  </b-col>

                  <b-col cols="12" md="3">
                    <label for="slcCardType">Tipo do cartão</label>
                    <b-form-select
                    class="shadow-sm"
                    :class="{'mb-3': fieldError != 'cardType', 'border-danger mb-2': fieldError == 'cardType'}"
                    v-model="payment.cardType"
                    :options="[
                      { value: null, text: 'Selecione...' },
                      { value: 'CREDITO', text: 'CRÉDITO' },
                      { value: 'DEBITO', text: 'DÉBITO' }
                    ]"
                    :disabled="(payment.slipBank == 1 || step == 3) ? true : false"
                    ></b-form-select>
                    <div class="mb-3" v-if="fieldError == 'cardType'">
                      <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                    </div>
                  </b-col>

                  <b-col cols="12" md="6">
                    <label for="iptPersonName">Nome do titular</label>
                    <b-form-input
                    v-model="payment.personName"
                    class="shadow-sm"
                    :class="{'mb-3': fieldError != 'personName', 'border-danger mb-2': fieldError == 'personName'}"
                    id="iptPersonName"
                    placeholder="Igual o que está no cartão"
                    :disabled="(payment.slipBank == 1 || step == 3) ? true : false"
                    ></b-form-input>
                    <div class="mb-3" v-if="fieldError == 'personName'">
                      <span class="text-danger font-small-14">{{ fieldErrorMsg }}</span>
                    </div>
                  </b-col>
                </b-row>
              </template>
            </div>
            
            <div
            class="d-flex flex-column justify-content-center align-items-center"
            :class="{'text-center': step == 1, 'text-right': step > 1}"
            >
              <b-button
              variant="primary"
              :class="{'mx-5 px-5 w-50': step == 1, 'mx-0 px-0 w-50': step > 1}"
              @click="handleSaveOrder"
              :disabled="step > 2 ? true : false"
              >
                <template v-if="step == 1">
                  Próximo
                </template>

                <template v-if="step == 2">
                  Finalizar Pedido
                </template>
              </b-button>

              <div class="text-center mt-4">
                <b-link @click.prevent="handleBack">Voltar</b-link>
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
import dayjs from 'dayjs'

export default {
  layout: 'checkout-layout',
  components: {
    Icon,
  },

  data() {
    return {
      loading: true,
      step: 1,
      fieldError: '',
      fieldErrorMsg: '',

      paymentType: null,
      slipBankOptions: [
        { text: 'Pagamento online', value: 'PO' },
        { text: 'Boleto antecipado', value: 'BA' },
      ],

      payment: {
        personName: '',
        cardNumber: null,
        validateDate: null,
        securityCode: null,
        companyName: null,
        cardType: null,
        slipBank: 0
      }
    }
  },

  created() {
    const self = this

    const isAddressChanged = localStorage.getItem('isAddressChanged')
    if (isAddressChanged == true || isAddressChanged == 'true') {
      this.$router.push({ name: 'carrinho-revisao' })
    }

    setTimeout(() => {
      self.loading = false
    }, 1000)

    this.setCheckoutCurrentStep('payment')
  },

  watch: {
    paymentType() {
      if (this.paymentType == 'BA') {
        this.payment.personName = null
        this.payment.cardNumber = null
        this.payment.validateDate = null
        this.payment.securityCode = null
        this.payment.companyName = null
        this.payment.cardType = null
        this.payment.slipBank = 1
      } else {
        this.payment.slipBank = 0
      }
    }
  },

  methods: {
    ...mapActions([
      'setCheckoutCurrentStep',
      'resetCart',
      'saveOrder',
      'setOverlay',
      'setToast'
    ]),

    validateForm() {
      if (!this.paymentType) {
        this.fieldError = 'paymentType'
        this.fieldErrorMsg = '* Tipo de pagamento obrigatório'
        return false
      }

      if (this.step == 2 && this.payment.slipBank == 0) {
        if (!this.payment.cardNumber) {
          this.fieldError = 'cardNumber'
          this.fieldErrorMsg = '* Número do cartão obrigatório'
          return false
        }

        if (!this.payment.validateDate) {
          this.fieldError = 'validateDate'
          this.fieldErrorMsg = '* Data de validade obrigatório'
          return false
        }

        if (!this.payment.securityCode) {
          this.fieldError = 'securityCode'
          this.fieldErrorMsg = '* Código de segurança obrigatório'
          return false
        }

        if (!this.payment.companyName) {
          this.fieldError = 'companyName'
          this.fieldErrorMsg = '* Bandeira obrigatório'
          return false
        }

        if (!this.payment.cardType) {
          this.fieldError = 'cardType'
          this.fieldErrorMsg = '* Tipo do cartão obrigatório'
          return false
        }

        if (!this.payment.personName) {
          this.fieldError = 'personName'
          this.fieldErrorMsg = '* Nome do titular obrigatório'
          return false
        }
      }

      return true
    },

    handleSaveOrder() {
      if (!this.validateForm()) return false

      const self = this

      if (this.step < 2) {
        this.step++
        return false
      }

      let toastMsg = 'Ocorreu um erro ao processar seu pedido.<br/>' 
                   + 'Tente novamente em alguns instantes.'

      const orderData = {
        deliveryDate: dayjs(new Date()).format('YYYY-MM-DD'),
        deliveryObs: '',
        payment: this.payment
      }

      this.setOverlay({ open: true, loading: true })
      
      this.saveOrder(orderData)
      .then(({ data }) => {
        self.setOverlay({ open: false, loading: false })

        toastMsg = 'Pedido enviado com sucesso!'
        self.setToast({
          type: 'success',
          title: 'Parabéns!',
          content: toastMsg,
        })
        
        self.resetCart()
        localStorage.removeItem('cartItems')
        
        setTimeout(() => {
          self.$router.push({ name: 'minha-conta', params: { currentMenuItem: 'my-orders' }})
        }, 1500)

      }).catch(error => {
        self.setOverlay({ open: false, loading: false })
        toastMsg = error.response.data
        self.setToast({
          type: 'danger',
          title: 'Atenção!',
          content: toastMsg,
        })
      })
    },

    handleBack() {
      if (this.step == 2) this.step--
      else this.$router.back()
    },

    handleResetForm() {
      // Nothing
    },
  }
}
</script>

<style lang="scss">
</style>
