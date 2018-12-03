import Vue from 'vue'
import VueRouter from 'vue-router'
import { Notify } from 'quasar'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.auth)) {
      if (!store.getters['usuario/isLogged']) {
        Notify.create({
          type: 'negative',
          message: 'Error, debe haber iniciado sesión para acceder a esta página.'
        })
        return next({
          path: '/',
          query: { login: true }
        })
      }
    }
    next()
  })

  return Router
}
