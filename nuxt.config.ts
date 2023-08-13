// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/sass/main.sass'],
    modules: [
      '@pinia/nuxt'
    ],
    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@use ~/assets/sass/_variables'
          }
        }
      }
    },
    nitro: {
      plugins: [
        '~/server/mongo.js'
      ]
    },
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    app: {
      head: {
          title: 'Adidas',
          meta: [
            {name: 'lang', content: 'en'}
          ]
      }
    },
    runtimeConfig: {
      mongodbUri: process.env.MONGODB_URI,
      tokenSecret: process.env.TokenSecret,
    },
    buildModules: [
      '@braid/vue-formulate/nuxt'
    ]
})
