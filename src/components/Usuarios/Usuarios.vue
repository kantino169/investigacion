<template>
<div>
  <div class="">
    <h4>Usuarios</h4>
  </div>
  <table class="q-table bordered full-width"> 
      <tr>
        <td>Id</td>
        <td>Nombre</td>
        <td>Email</td>
        <td>Tipo de usuario</td>
        <td colspan="2"></td>
      </tr>
      <tr v-for="usuario in usuarios"
        :key="usuario.id">
        <td class="">{{usuario.id}}</td>
        <td class="">{{usuario.name}}</td>
        <td class="">{{usuario.email}}</td>
        <td class="">{{usuario.tipo_usuario}}</td>
        <td class=""></td>
        <td><button class="orange" @click="editLine(linea)">Modificar linea</button></td>
        <td><button class="red" @click="confirmRemoval(usuario)">Eliminar usuario</button></td>
      </tr>
    </table>
    <button class="primary ">Crear nueva linea</button>
</div>
</template>

<script>
import {Dialog} from 'quasar'
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
      updateLine: 'update-investigation-line',
      removeUser: 'eliminar-usuario',
      cargarUsuarios: 'cargar-usuarios'
    }),
    editLine (linea) {
      Dialog.create({
        title: 'Editar linea de ivestigacion',
        form: {
          name: {
            type: 'textbox',
            label: 'Nombre',
            model: linea.name
          },
          group_id: {
            type: 'radio',
            model: linea.group_id,
            items: this.groups.map(id => ({label: id, value: id}))
          }
        },
        buttons: [
          'Cancelar', {
            label: 'Modificar',
            handler: (data) => { this.updateLine(Object.assign(data, {id: linea.id})) }
          }
        ]
      })
    },
    confirmRemoval (usuario) {
      Dialog.create({
        title: 'Seguro que desea eliminar este usuario?',
        buttons: [
          'No', {
            label: 'Si',
            handler: () => this.removeUser(usuario)
          }
        ]
      })
    }
  }
}
</script>
