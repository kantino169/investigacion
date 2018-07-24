<template>
<div>
  <div class="">
    <h4 style="text-align: center">Lineas de Investigacion</h4>
  </div>
  <table class="q-table bordered full-width"> 
      <tr>
        <td>Id</td>
        <td>Nombre</td>
        <td>Id grupo</td>
        <td colspan="2"></td>
      </tr>
      <tr v-for="linea in lineas"
        :key="linea.id">
        <td class="">{{linea.id}}</td>
        <td class="">{{linea.linea}}</td>
        <td class="">{{linea.id_grupo}}</td>
        <td><button class="orange" @click="editLine(linea)">Modificar linea</button></td>
        <td><button class="red" @click="confirmRemoval(linea)">Eliminar linea</button></td>
      </tr>
    </table>
    <button class="primary" @click="newLineCreationDialog()">Crear nueva linea</button>
</div>
</template>

<script>
import {Dialog, Toast} from 'quasar'
import {mapState, mapActions} from 'vuex'

export default {
  computed: {
    ...mapState({lineas: 'investigationLines'}),
    groups () {
      return Array.from(new Set(this.lineas.map(l => l.id_grupo)))
    }
  },
  mounted () {
    this.getLineasDeInvestigacion()
  },
  methods: {
    ...mapActions({
      createLine: 'create-investigation-line',
      updateLine: 'update-investigation-line',
      removeLine: 'remove-investigation-line',
      getLineasDeInvestigacion: 'get-lines'
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
            items: this.groups.map(id => ({label: `Grupo ${id}`, value: id}))
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
