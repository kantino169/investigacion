import { Loading, Toast } from 'quasar'

export default that => ({
  title: 'Iniciar sesión',
  form: {
    email: {
      type: 'textbox',
      label: 'Correo electrónico',
      model: ''
    },
    password: {
      type: 'password',
      label: 'Contraseña',
      model: ''
    }
  },
  buttons: [ 'Cancelar',
    {
      label: 'Entrar',
      async handler (datos) {
        try {
          Loading.show()
          await that.$store.dispatch('iniciar-sesion', datos)
        }
        catch (error) {
          Toast.create.negative(error)
        }
        finally {
          Loading.hide()
        }
      }
    }
  ]
})
