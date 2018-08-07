<template>
<div>
  <div class="">
    <h4>Usuarios</h4>
  </div>
  <div class="buttons row justify-center">
    <button class="primary" @click="signup">Crear nuevo usuario</button>
  </div>
  <table class="q-table bordered vertical-delimiter striped full-width"> 
      <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>Email</th>
        <th>Tipo de usuario</th>
        <th colspan="2"></th>
      </tr>
      <tbody>
        <tr v-for="usuario in usuarios"
          :key="usuario.id">
          <td class="">{{usuario.id}}</td>
          <td class="">{{usuario.nombre}}</td>
          <td class="">{{usuario.email}}</td>
          <td class="">{{usuario.tipo_usuario}}</td>
          <!-- <td class=""></td> -->
          <td><button class="green" @click="giveAccessCreationDialog(usuario)">Dar privilegios</button></td>
          <td><button class="orange" @click="editUserCreationDialog(usuario)">Modificar datos usuario</button></td>
          <td><button class="red" @click="confirmRemoval(usuario)">Eliminar usuario</button></td>
        </tr>
      </tbody>
    </table>
</div>
</template>

<script>
import {Dialog, Toast} from 'quasar'
import SignupDialog from '../Usuarios/SignupDialog'
import {mapState, mapActions} from 'vuex'

export default {
  computed: {
    ...mapState({usuarios: 'userList'})
  },
  mounted () {
    this.cargarUsuarios()
  },
  methods: {
    ...mapActions({
      updateUser: 'update-user',
      removeUser: 'eliminar-usuario',
      cargarUsuarios: 'cargar-usuarios', // listado de los usuarios
      giveAccess: 'give-access'
    }),
    editUserCreationDialog (usuario) {
      Dialog.create({
        title: `Editar usuario: ${usuario.nombre}`,
        form: {
          name: {
            type: 'textbox',
            label: 'Nombre',
            model: usuario.name
          },
          email: {
            type: 'textbox',
            label: 'Email',
            model: usuario.email
          }
        },
        buttons: [
          'Cancelar', {
            label: 'Modificar',
            handler: (data) => { this.updateUser(Object.assign(data, {id: usuario.id})).then(() => Toast.create.positive({html: 'Usuario modificado con exito'})) }
          }
        ]
      })
    },
    confirmRemoval (usuario) {
      Dialog.create({
        title: `Seguro que desea eliminar el usuario ${usuario.nombre}?`,
        buttons: [
          'No', {
            label: 'Si',
            handler: () => this.removeUser(usuario)
          }
        ]
      })
    },
    signup () {
      console.log('hi')
      Dialog.create(SignupDialog(this))
    },
    giveAccessCreationDialog (usuario) {
      Dialog.create({
        title: 'Editar privilegios del usuario', // {{this.usuario.name}}
        form: {
          tipo_usuario: {
            type: 'radio',
            model: '0',
            items: [
              {label: 'Privilegios nivel: Alumno', value: '0'},
              {label: 'Privilegios nivel: Profesor', value: '1'},
              {label: 'Privilegios nivel: Administrador', value: '2'}
            ]
          }
        },
        buttons: [
          'Cancelar', {
            label: 'Modificar',
            handler: (data) => { this.giveAccess(Object.assign(data, {id: usuario.id})).then(() => Toast.create.positive({html: 'Privilegios modificados con exito'})) }
          }
        ]
      })
    }
  }
}
</script>
