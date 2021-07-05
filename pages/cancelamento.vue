<template>
  <section>
    <Header class="d-block d-md-none" currentPage="Cancelamento" no-search />
    <Header class="d-none d-md-block" currentPage="Cancelamento" />

    <b-container class="mt-0 mb-5 mt-md-5">
      <h1 class="h5 text-dark d-block d-md-none mb-4">CANCELAMENTO</h1>
      <h1 class="h2 text-dark d-none d-md-block mb-4">CANCELAMENTO</h1>

      <p>
        Se opção de pagamento escolhida foi boleto, e você ainda não efetuou o pagamento, o pedido
        será cancelado automaticamente <strong>no prazo de 3 dias</strong>, sem qualquer ônus para você.
      </p>

      <p>
        Caso a opção de pagamento escolhida tenha sido cartão, débito ou qualquer outra forma de
        pagamento, é necessário aguardar a confirmação para solicitar o cancelamento.
      </p>

      <p>
        Caso a opção de pagamento escolhida tenha sido cartão, débito ou qualquer outra forma de
        pagamento, é necessário aguardar a confirmação para solicitar o cancelamento.
      </p>
    </b-container>
  </section>
</template>

<script>
import Header from '@/components/Header'

export default {
  components: {
    Header
  },

  data() {
    return {}
  },

  methods: {}
}
</script>

<style>
</style>
