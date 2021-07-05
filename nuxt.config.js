const pkg = require('./package')

const PRODUCTION_BASE_PATH = '/whitelabelapp'
const LOCAL_BASE_PATH = '/'

function getBasePath() {
  // return PRODUCTION_BASE_PATH
  return (process.env.NODE_ENV === 'production')
    ? PRODUCTION_BASE_PATH
    : LOCAL_BASE_PATH
}

module.exports = {
  mode: 'spa',
  
  env: {
    base: getBasePath(),
    baseUrl: getBasePath()
  },

  router: {
    base: getBasePath(),
    middleware: 'auth'
  },

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script: [
      { src: 'https://code.iconify.design/1/1.0.0/iconify.min.js' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/whitelabelapp/favicon.ico' }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  // loading: {
  //   color: '#0F6EB5',
  // },
  loading: false,

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/assets/main.scss',
    '~/plugins/vue-the-mask',
    '~/plugins/vee-validate',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    '@nuxtjs/onesignal',
    '@nuxtjs/pwa',
    '@neneos/nuxt-animate.css'
  ],
  
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // API_HOST: 'https://www.appbeefservices.com.br/testbeef',
    // API_PREFIX: '/api',
  },

  manifest: {
    name: "Whitelabel Ecommerce PWA",
    short_name: "Whitelabel Ecommerce PWA",
    description: 'Whitelabel Ecommerce PWA PWA',
    display: "fullscreen",
    // background_color: "#0F6EB5",
    background_color: "#ffffff",
    theme_color: "#002a46"
  },

  // Options
  oneSignal: {
    cdn: true,
    
    init: {
      appId: 'APP_ID_DA_SUA_CONTA_NO_ONE_SIGNAL',
      promptOptions: {
        actionMessage: 'Deseja receber nossas ofertas e novidades?',
        acceptButtonText: 'SIM',
        cancelButtonText: 'NÃO'
      }
    },
  },

  workbox: {
    dev: false,
    debug: false
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, { isClient, isDev }) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
      // }
    }
  }
}
