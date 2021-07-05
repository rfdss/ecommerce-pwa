// AUTH MIDDLEWARE

export default function ({ isServer, store, req, redirect, route }) {
  // If nuxt generate, pass this middleware
  // if (isServer && !req) return
  
  const { user } = store.state
  const userData = sessionStorage.getItem('user')
  const pagesAuth = [
    'login',
    'minha-conta',
    // 'checkout',
    'checkout-revisao-pedido',
    'checkout-entrega',
    'checkout-pagamento'
  ]

  // Usuário está logado e tenta entrar na página de login
  // Redireciona pra home
  if (userData && userData.hasOwnProperty('id') && route.name === 'login') {
    return redirect('/')
  }

  // Usuário não está logado e tenta entrar em uma que precisa estar logado
  // Redireciona pra página de login
  if (!userData && pagesAuth.includes(route.name) && route.name != 'login') {
    return redirect('/login')
  }
  
  // Usuário está logado, salva os dados na store
  if (userData && !user.token) {
    store.commit('SET_USER_DATA', JSON.parse(userData))
  }
}