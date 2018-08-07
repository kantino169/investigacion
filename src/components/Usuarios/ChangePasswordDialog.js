import {Toast} from 'quasar'

export default (that, errors) => ({
  title: 'Cambiar contraseña',
  message: errors,
  form: {
    oldPassword: {
      type: 'password',
      label: 'Contraseña actual: ',
      model: ''
    },
    newPassword: {
      type: 'password',
      label: 'Nueva contraseña: ',
      model: ''
    },
    repeatNewPassword: {
      type: 'password',
      label: 'Repetir nueva contraseña',
      model: ''
    }
  },
  buttons: [
    'Cancelar', {
      label: 'Modificar',
      handler: ({oldPassword, newPassword, repeatNewPassword}) => {
        if (newPassword !== repeatNewPassword) {
          that.changePasswordDialog('La repetición no es igual a la nueva contraseña')
        }
        that.changePassword({oldPassword, newPassword})
          .then(() => Toast.create.positive({html: 'Contraseña modificada correctamente'}))
          .catch(() => Toast.create.negative({html: 'Error al modificar la contraseña'}))
      }
    }
  ]
})
