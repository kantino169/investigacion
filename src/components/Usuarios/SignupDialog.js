import { Loading, Toast } from 'quasar'

export default that => ({
  title: 'Crear cuenta',
  form: {
    email: {
      type: 'textbox',
      label: 'Correo electrónico',
      model: ''
    },
    name: {
      type: 'textbox',
      label: 'Nombre',
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
      label: 'Crear',
      async handler (datos) {
        try {
          Loading.show()
          await that.$store.dispatch('crear-cuenta', datos)
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
