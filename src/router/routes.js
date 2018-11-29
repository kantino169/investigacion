
const routes = [
  {
    // No autenticadas
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        components: {
          default: () => import('pages/Index.vue'),
          drawer: () => import('layouts/Drawer.vue')
        }
      },
      {
        path: '/fechasEntrega',
        components: {
          default: () => import('pages/FechasEntrega/FechasEntrega.vue'),
          drawer: () => import('layouts/Drawer.vue')
        }
      },
      {
        path: '/proyectos',
        components: {
          default: () => import('pages/Proyectos/Proyectos.vue'),
          drawer: () => import('layouts/Drawer.vue')
        }
      },
      {
        path: '/usuarios',
        components: {
          default: () => import('pages/Usuarios/Usuarios.vue'),
          drawer: () => import('layouts/Drawer.vue')
        }
      },
      {
        path: '/disciplinas',
        components: {
          default: () => import('pages/Disciplinas/Disciplinas.vue'),
          drawer: () => import('layouts/Drawer.vue')
        }
      },
      {
        path: '/evaluadores',
        components: {
          default: () => import('pages/Evaluadores/Evaluadores.vue'),
          drawer: () => import('layouts/Drawer.vue')
        }
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    meta: { auth: true },
    children: [
      // Autenticadas
      {
        path: '/lineas',
        components: {
          default: () => import('pages/LineasInvestigacion/LineasInvestigacion.vue'),
          drawer: () => import('layouts/Drawer.vue')
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
