import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

function beforeEnter (to, from, next) {
  if (!store.state.user) next('/')
  else next()
}

const router = new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/', component: load('SetIP/SetIP') }, // Default
    { path: '/index', component: load('Index') }, // Default
    { path: '/todos', component: load('Todos') },
    { path: '*', component: load('Error404') }, // Not found
    { path: '/alumnos', component: load('Alumnos/Alumnos') },
    { path: '/administradores', beforeEnter, component: load('Administradores/Administradores') },
    { path: '/proyectos', beforeEnter, component: load('Proyectos/Proyectos') },
    { path: '/disciplinas', component: load('Disciplinas/Disciplinas') },
    { path: '/lineasInvestigacion', component: load('LineasInvestigacion/LineasInvestigacion') },
    { path: '/fechasEntrega', component: load('FechasEntrega/FechasEntrega') },
    { path: '/estadisticas', component: load('Estadisticas/Estadisticas') },
    { path: '/evaluadores', component: load('Evaluadores/Evaluadores') },
    { path: '/equipos', component: load('Equipos/Equipos') },
    { path: '/profesores', component: load('Profesores/Profesores') },
    { path: '/evaluaciones', component: load('Evaluaciones/Evaluaciones') },
    { path: '/login', component: load('Login') },
    { path: '/proyectos/nuevo', beforeEnter, component: load('Proyectos/CargarProyecto') },
    { path: '/proyectos/:id', beforeEnter, component: load('Proyectos/VerProyecto') },
    { path: '/proyectos/:id/editar', beforeEnter, component: load('Proyectos/EditProyecto') },
    { path: '/grupos', beforeEnter, component: load('Grupos/Grupos') },
    { path: '/usuarios', beforeEnter, component: load('Usuarios/Usuarios') },
    { path: '/test', component: load('Test') }
  ]
})

store.subscribe(({type, payload}, state) => {
  if (type !== 'set-user') return
  if (!payload) {
    router.replace('/')
  }
})

export default router
