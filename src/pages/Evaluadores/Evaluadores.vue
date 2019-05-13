<template>
  <q-page padding>
    <q-btn
      class="q-md"
      color="primary"
      label="Agregar Evaluador"
      @click="agregar" />
    <q-btn color="" :disabled="!selected" flat round icon="edit" @click="editar(selected)" />
    <q-btn color="negative" :disabled="!selected" flat round delete icon="delete" @click="borrar(selected)" />
    <tabla-evaluadores :evaluadores="evaluadores" :selected.sync="selected" />
    <form-dialog ref="form" />
  </q-page>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import FormDialog from '../../components/FormDialog'
import TablaEvaluadores from '../../components/Evaluadores/TablaEvaluadores'

export default {
  data: () => ({ selected: undefined }),
  components: {FormDialog, TablaEvaluadores},
  mounted () {
    this.cargarTodos()
  },
  computed: {
    evaluadores () {
      return this.$store.getters['evaluador/evaluadores']
    },
    ...mapGetters('usuario', ['isAdmin'])
  },
  methods: {
    ...mapActions('evaluador', ['cargarTodos', 'crear', 'modificar', 'eliminar']),
    async agregar () {
      try {
        const datos = await this.$refs.form.getData({
          title: 'Nuevo evaluador',
          form: {
            nombre: {label: 'Nombre'},
            apellido: {label: 'Apellido'},
            email: {label: 'Email', type: 'email'},
            telefono: {label: 'Telefono', type: 'number'},
            profesion: {label: 'Profesion'},
            especialidad: {label: 'Especialidad'},
            dni: {label: 'DNI', type: 'number'},
            lugarTrabajo: {label: 'Lugar de Trabajo'}
          }
        })
        await this.crear(datos)
      } catch (error) {
      }
    },
    async editar (evaluador) {
      try {
        const id = evaluador.id
        const datos = await this.$refs.form.getData({
          title: 'Modificar Evaluador',
          form: {
            nombre: {label: 'Nombre', model: evaluador.nombre},
            apellido: {label: 'Apellido', model: evaluador.apellido},
            email: {label: 'Email', model: evaluador.email},
            telefono: {label: 'Telefono', model: evaluador.telefono},
            profesion: {label: 'Profesion', model: evaluador.profesion},
            especialidad: {label: 'Especialidad', model: evaluador.especialidad},
            dni: {label: 'DNI', model: evaluador.dni},
            lugarTrabajo: {label: 'Lugar de Trabajo', model: evaluador.lugarTrabajo}
          }
        })
        await this.modificar({id, ...datos})
      } catch (error) {
      }
    },
    async borrar (evaluador) {
      try {
        await this.$q.dialog({
          title: 'Eliminar evaluador',
          message: `Desea eliminar el evaluador ${evaluador.nombre} ${evaluador.apellido}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        await this.eliminar(evaluador)
        this.selected = undefined
      } catch (error) {
      }
    }
  }
}
</script>
