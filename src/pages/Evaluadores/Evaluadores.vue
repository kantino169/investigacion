<template>
  <div class="q-mx-xl column" >
    <q-list class="q-mt-sm" separator>
      <q-btn class="q-ml-sm" label="Agregar" icon="create" @click="agregar()"></q-btn>
      <q-list-header>Evaluadores</q-list-header>
      <q-collapsible highlight v-for="evaluador in evaluadores" :key="evaluador.id" :label="evaluador.nombre + ' ' + evaluador.apellido"
      :sublabel="evaluador.profesion ">
        <q-item>
          <q-item-main :label="'Nombre: ' + evaluador.nombre + ' ' + evaluador.apellido"></q-item-main>
        </q-item>
        <q-item>
          <q-item-main :label="'Email: ' + evaluador.email"></q-item-main>
        </q-item>
        <q-item>
          <q-item-main :label="'Telefono: ' + evaluador.telefono"></q-item-main>
        </q-item>
        <q-item>
          <q-item-main :label="'Profesion: ' + evaluador.profesion"></q-item-main>
        </q-item>
        <q-item>
          <q-item-main :label="'Especialidad: ' + evaluador.especialidad"></q-item-main>
        </q-item>
        <q-item>
          <q-item-main :label="'Dni: ' + evaluador.dni"></q-item-main>
        </q-item>
        <q-item>
          <q-item-main :label="'Lugar de Trabajo: ' + evaluador.lugarTrabajo"></q-item-main>
        </q-item>
        <q-btn-group class="q-ml-md">
          <q-btn color="orange" title="Editar" icon="edit" @click="editar(evaluador)"/>
          <q-btn color="red" title="Eliminar" icon="delete" @click="borrar(evaluador)"/>
        </q-btn-group>
      </q-collapsible>
    </q-list>
    <form-dialog ref="form" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FormDialog from '../../components/FormDialog'

export default {
  components: {FormDialog},
  mounted () {
    this.cargarTodos()
  },
  computed: {
    evaluadores () {
      return this.$store.getters['evaluador/evaluadores']
    }
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
            email: {label: 'Email'},
            telefono: {label: 'Telefono'},
            profesion: {label: 'Profesion'},
            especialidad: {label: 'Especialidad'},
            dni: {label: 'DNI'},
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
      } catch (error) {
      }
    }
  }
}
</script>
