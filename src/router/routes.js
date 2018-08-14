
const routes = [
  {
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
        path: '/administradores',
        components: {
          default: () => import('pages/Administradores/Administradores.vue'),
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
