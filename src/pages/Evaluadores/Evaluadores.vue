<template>
  <q-page padding>
    <q-btn
      class="q-md"
      color="primary"
      label="Agregar Evaluador"
      @click="agregar" />
    <q-btn color="" :disabled="!selected" flat round icon="edit" @click="editar(selected)" />
    <q-btn color="negative" :disabled="!selected" flat round delete icon="delete" @click="borrar(selected)" />
    <div>
    <q-search v-model="filter"/>
      <q-table
        title="Evaluadores"
        :data="evaluadores"
        :columns="$options.columns"
        row-key="id"
        :filter="filter"
        :pagination="{rowsPerPage: Number.MAX_SAFE_INTEGER}"
        :rows-per-page-options="[]"
        selection="single"
        :selected.sync="selected" >
      </q-table>
    </div>
    <form-dialog ref="form" />
  </q-page>
</template>

<script>
const columns = [
  {
    name: 'nombre',
    sortable: true,
    align: 'left',
    label: 'Nombre'
  },
  {
    name: 'apellido',
    sortable: true,
    align: 'left',
    label: 'Apellido'
  },
  {
    name: 'email',
    sortable: true,
    align: 'left',
    label: 'Email'
  },
  {
    name: 'telefono',
    sortable: true,
    align: 'left',
    label: 'Telefono'
  },
  {
    name: 'profesion',
    sortable: true,
    align: 'left',
    label: 'Profesion'
  },
  {
    name: 'especialidad',
    sortable: true,
    align: 'left',
    label: 'Especialidad'
  },
  {
    name: 'lugarTrabajo',
    sortable: true,
    align: 'left',
    label: 'Lugar de Trabajo'
  },
  {
    name: 'dni',
    sortable: true,
    align: 'left',
    label: 'DNI'
  }
]
import { mapActions, mapGetters } from 'vuex'
import FormDialog from '../../components/FormDialog'

export default {
  columns: columns.map(obj => ({...obj, field: obj.name})),
  data: () => ({
    filter: '',
    selected: []
  }),
  components: {FormDialog},
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
            email: {label: 'Email'},
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
      } catch (error) {
      }
    }
  }
}
</script>
