<template>
  <section>
    <Header class="d-block d-md-none" currentPage="Quem Somos" no-search />
    <Header class="d-none d-md-block" currentPage="Quem Somos" />

    <b-container class="mt-0 mb-5 mt-md-5">
      <h1 class="h2 text-dark d-none d-md-block mb-4">QUEM SOMOS</h1>
      <h1 class="h5 text-dark d-block d-md-none mb-4">QUEM SOMOS</h1>
      
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, dolorum perferendis. Unde deserunt consequuntur, consectetur soluta ipsa culpa ea, nisi blanditiis necessitatibus harum ab quae vero quis nobis id aliquam!
      </p>

      <p>
        <strong>SUA COMPRA 100% SEGURA</strong>
      </p>

      <p>
        Para garantir uma operação 100% segura, os dados de sua compra são criptografados. A
        criptografia é um sistema de codificação de informações criado para garantir que ninguém, em
        nenhuma hipótese, tenha acesso aos seus dados. Nenhuma informação trafega pela rede sem
        ser criptografada, utilizando os melhores sistemas disponíveis no mercado. A proteção é
        absoluta. A segurança da nossa loja é certificada pela <strong>Let&#39;s Encrypt</strong>, uma das maiores
        autoridades em segurança na Internet.
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
