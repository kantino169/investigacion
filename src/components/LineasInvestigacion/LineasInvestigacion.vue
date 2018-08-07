<template>
<div>
  <div class="">
    <h4 style="text-align: center">Lineas de Investigacion</h4>
  </div>
  <div class="buttons row justify-center">
    <button class="primary" @click="newLineCreationDialog()">Crear nueva linea</button>
  </div>
  <table class="q-table bordered striped vertical-delimiter full-width"> 
      <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>Grupo</th>
      </tr>
      <tbody>
        <tr v-for="linea in lineas"
          :key="linea.id">
          <td class="">{{linea.id}}</td>
          <td class="">{{linea.linea}}</td>
          <td class="">{{linea.group.label}}</td>
          <td><button class="orange" @click="editLine(linea)">Modificar linea</button></td>
          <td><button class="red" @click="confirmRemoval(linea)">Eliminar linea</button></td>
        </tr>
      </tbody>
    </table>
</div>
</template>

<script>
import {Dialog, Toast} from 'quasar'
import {mapActions} from 'vuex'

export default {
  computed: {
    lineas () {
      return this.$store.state.investigationLines.map(line => Object.assign({
        group: this.groups.find(g => g.value === line.id_grupo) || {label: 'Grupo no encontrado'}
      }, line))
    },
    groups () {
      return this.$store.state.groups.map(group => ({label: `Grupo ${group.nombre}`, value: group.id}))
    }
  },
  mounted () {
    this.getGroups()
    this.getLineasDeInvestigacion()
  },
  methods: {
    ...mapActions({
      createLine: 'create-investigation-line',
      updateLine: 'update-investigation-line',
      removeLine: 'remove-investigation-line',
      getLineasDeInvestigacion: 'get-lines',
      getGroups: 'get-groups'
    }),
    newLineCreationDialog () {
      Dialog.create({
        title: 'Crear nueva linea de investigacion',
        form: {
          name: {
            type: 'textbox',
            label: 'Nombre',
            model: ''
          },
          group_id: {
            type: 'radio',
            model: '',
            items: this.groups
          }
        },
        buttons: [
          'Cancelar', {
            label: 'Crear',
            handler: (data) => { this.createLine(data) }
          }
        ]
      })
    },
    editLine (linea) {
      Dialog.create({
        title: 'Editar linea de investigacion',
        form: {
          name: {
            type: 'textbox',
            label: 'Nombre',
            model: linea.name
          },
          group_id: {
            type: 'radio',
            model: linea.group_id,
            items: this.groups
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
    confirmRemoval (linea) {
      Dialog.create({
        title: 'Seguro que desea eliminar esta linea de investigacion?',
        buttons: [
          'No', {
            label: 'Si',
            handler: () => this.removeLine(linea).catch((error) => Toast.create.negative({html: error.toString()}))}
        ]
      })
    }
  }
}
</script>
