<template>
<div>
    <table class="q-table bordered full-width"> 
        <tr>
            <td>Id</td>
            <td>Nombre</td>
            <td colspan="2"></td>
        </tr>
        <tr v-for="grupo in grupos"
            :key="grupo.id">
            <td class="">{{grupo.id}}</td>
            <td class="">{{grupo.nombre}}</td>
            <td><button class="orange" @click="editLine(grupo)">Modificar linea</button></td>
            <td><button class="red" @click="confirmRemoval(grupo)">Eliminar linea</button></td>
        </tr>
    </table>
    <button class="primary ">Crear nuevo grupo</button>
</div>
</template>

<script>
import {Dialog} from 'quasar'
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
      updateGroup: 'update-group-line',
      removeGroup: 'remove-group-line',
      getGroups: 'get-groups'
    }),
    editGroup (grupo) {
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
            handler: () => this.removeGroup(grupo)
          }
        ]
      })
    }
  }
}
</script>
