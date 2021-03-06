export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
 env:{
  NEXT_PUBLIC_PRI_KEY_FUND:process.env.NEXT_PUBLIC_PRI_KEY_FUND,
  NEXT_PUBLIC_PUB_KEY_FUND:process.env.NEXT_PUBLIC_PUB_KEY_FUND
 },
  head: {
    title: 'DAirbnb:Decentralized Airbnb',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/airbnb-logo.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
     'bootstrap-vue/nuxt',
     '@nuxtjs/dotenv',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.node = {
        fs: 'empty'
    }
    },
    env:{
      NEXT_PUBLIC_PRI_KEY_FUND:process.env.NEXT_PUBLIC_PRI_KEY_FUND,
      NEXT_PUBLIC_PUB_KEY_FUND:process.env.NEXT_PUBLIC_PUB_KEY_FUND
     }
  }
}
