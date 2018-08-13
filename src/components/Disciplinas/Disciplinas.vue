<template>
<div>
  <div>
    <h4>Disciplinas de estudio</h4>
  </div>
  <div class="buttons row justify-center">
    <button class="primary" @click="newDisciplineCreationDialog()">Crear nueva disciplina</button>
  </div>
    <table class="q-table bordered striped vertical-delimeter full-width"> 
        <tr>
            <th>Id</th>
            <th>Nombre</th>
        </tr>
        <tbody>
          <tr v-for="disciplina in disciplinas"
              :key="disciplina.id">
              <td class="">{{disciplina.id}}</td>
              <td class="">{{disciplina.nombre}}</td>
              <td><button class="orange" @click="updateDisciplineCreationDialog(disciplina)">Modificar disciplina</button></td>
              <td><button class="red" @click="confirmRemoval(disciplina)">Eliminar disciplina</button></td>
          </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import {Dialog, Toast} from 'quasar'
import {mapState, mapActions} from 'vuex'

export default {
  computed: {
    ...mapState({disciplinas: 'studyDisciplines'})
  },
  mounted () {
    this.getDisciplinasDeEstudio()
  },
  methods: {
    ...mapActions({
      getDisciplinasDeEstudio: 'get-disciplines',
      createDiscipline: 'create-studyDiscipline',
      updateDiscipline: 'update-studyDiscipline',
      deleteDiscipline: 'remove-studyDiscipline'
    }),
    newDisciplineCreationDialog () {
      Dialog.create({
        title: 'Crear nueva disciplina de estudio',
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
            handler: async (data) => {
              try {
                await this.createDiscipline(data)
                Toast.create.positive({html: 'Disciplina creada con exito'})
              }
              catch (error) {
                Toast.create.negative({html: 'Error. No ha sido posible crear la disciplinas'})
              }
            }
          }
        ]
      })
    },
    updateDisciplineCreationDialog (disciplina) {
      Dialog.create({
        title: 'Editar disciplina de estudio',
        form: {
          name: {
            type: 'textbox',
            label: 'Nombre',
            model: disciplina.nombre
          }
        },
        buttons: [
          'Cancelar', {
            label: 'Modificar',
            handler: async (data) => {
              try {
                await this.updateDiscipline(Object.assign(data, {id: disciplina.id}))
                Toast.create.positive({html: 'Disciplina modificada con exito'})
              }
              catch (error) {
                Toast.create.negative({html: 'Error. No se ha podido modificar la disciplina'})
              }
            }
          }
        ]
      })
    },
    confirmRemoval (disciplina) {
      Dialog.create({
        title: 'Seguro que desea eliminar esta disciplina de estudio?',
        buttons: [
          'No', {
            label: 'Si',
            handler: () => this.deleteDiscipline(disciplina).then(() => { Toast.create.positive({html: 'Disciplina eliminada con exito'}) }).catch((error) => Toast.create.negative({html: error.toString()}))}
        ]
      })
    }
  }
}
</script>
