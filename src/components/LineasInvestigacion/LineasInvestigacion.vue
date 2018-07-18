<template>
<div>
  <h3>Lineas de Investigacion</h3>
  <table class="q-table bordered striped full-width"> 
      <tr>
        <td>Id</td>
        <td>Nombre</td>
        <td>Id grupo</td>
        <td colspan="2"></td>
      </tr>
      <tr v-for="linea in lineas"
        :key="linea.id">
        <td class="">{{linea.id}}</td>
        <td class="">{{linea.name}}</td>
        <td class="">{{linea.id_grupo}}</td>
        <td><button class="orange" @click="editLine(linea)">M</button></td>
        <td><button class="red" @click="confirmRemoval(linea)">X</button></td>
      </tr>
    </table>
    <button class="primary">Crear nueva linea</button>
</div>
</template>

<script>
import {Dialog} from 'quasar'
import {mapState, mapActions} from 'vuex'

export default {
  computed: {
    ...mapState({lineas: 'investigationLines'}),
    groups () {
      return Array.from(new Set(this.lineas.map(l => l.id_grupo)))
    }
  },
  methods: {
    ...mapActions({
      updateLine: 'update-investigation-line',
      removeLine: 'remove-investigation-line'
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
    confirmRemoval (linea) {
      Dialog.create({
        title: 'Seguro que desea eliminar esta linea?',
        buttons: [
          'No', {
            label: 'Si',
            handler: () => this.removeLine(linea)
          }
        ]
      })
    }
  }
}
</script>
