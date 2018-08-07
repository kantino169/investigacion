<template>
<div>
    <div>
      <h4 style="text-align: center">Grupos</h4>
    </div>
    <div class="buttons row justify-center">
      <button class="primary " @click="newGroupCreationDialog()">Crear nuevo grupo</button>
    </div>
    <table class="q-table bordered vertical-delimiter striped bordered full-width"> 
        <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th colspan="2"></th>
        </tr>
        <tbody>
          <tr v-for="grupo in grupos"
              :key="grupo.id">
              <td class="">{{grupo.id}}</td>
              <td class="">{{grupo.nombre}}</td>
              <td><button class="orange" @click="editGroupCreationDialog(grupo)">Modificar grupo</button></td>
              <td><button class="red" @click="confirmRemoval(grupo)">Eliminar grupo</button></td>
          </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import {Dialog, Toast} from 'quasar'
import {mapActions, mapState} from 'vuex'

export default {
  computed: {
    ...mapState({grupos: 'groups'})
  },
  mounted () {
    this.getGroups()
  },
  methods: {
    ...mapActions({
      createGroup: 'create-group',
      updateGroup: 'update-group',
      deleteGroup: 'remove-group',
      getGroups: 'get-groups'
    }),
    newGroupCreationDialog () {
      Dialog.create({
        title: 'Crear nuevo grupo',
        form: {
          name: {
            type: 'textbox',
            label: 'Nombre',
            model: ''
          }
        },
        buttons: [
          'Cancelar', {
            label: 'Crear',
            handler: (data) => { this.createGroup(data) }
          }
        ]
      })
    },
    editGroupCreationDialog (grupo) {
      Dialog.create({
        title: 'Editar grupo',
        form: {
          name: {
            type: 'textbox',
            label: 'Nombre',
            model: grupo.name
          }
        },
        buttons: [
          'Cancelar', {
            label: 'Modificar',
            handler: (data) => { this.updateGroup(Object.assign(data, {id: grupo.id})) }
          }
        ]
      })
    },
    confirmRemoval (grupo) {
      Dialog.create({
        title: 'Seguro que desea eliminar este grupo?',
        buttons: [
          'No', {
            label: 'Si',
            handler: () => this.deleteGroup(grupo).catch((error) => Toast.create.negative({html: error.toString()}))}
        ]
      })
    }
  }
}
</script>
