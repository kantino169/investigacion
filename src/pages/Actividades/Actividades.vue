<template>
  <q-page padding>
    <q-btn
      class="q-md"
      color="primary"
      label="Agregar Actividad"
      @click="agregar(proyecto.id)" />
    <q-btn color="" :disabled="!selected" flat round icon="edit" @click="editar(selected)" />
    <q-btn color="negative" :disabled="!selected" flat round delete icon="delete" @click="borrar(selected)" />
    <tabla-actividades :actividades="actividades" :selected.sync="selected" />
    <q-btn class="q-mt-lg" icon="keyboard_backspace" label="ATRAS" @click="$router.push({name: 'MenuProyecto', params: {idProyecto: proyecto.id}})"></q-btn>
    <form-dialog ref="form" />
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TablaActividades from 'components/Actividades/TablaActividades'
import FormDialog from 'components/FormDialog'

export default {
  name: 'Actividades',
  components: { TablaActividades, FormDialog },
  async mounted () {
    await this.$store.dispatch('proyecto/cargarTodos')
    this.cargarTodas(this.proyecto.id)
  },
  data: () => ({selected: undefined}),
  computed: {
    ...mapGetters('actividades', ['actividades']),
    proyectos () {
      return this.$store.getters['proyecto/proyectos']
    },
    proyecto () {
      return this.proyectos.find(proyecto => proyecto.id === this.$route.params.idProyecto)
    }
  },
  methods: {
    ...mapActions('actividades', ['cargarTodas', 'crear', 'modificar', 'eliminar']),

    async agregar (idProyecto) {
      try {
        const datos = await this.$refs.form.getData({
          title: 'Nueva Actividades',
          form: {
            actividad: {label: 'Actividad'},
            // Ver como hacer el select, la idea es que se clickee como vi en el ejemplo de la tabla
            primers: {label: 'Primer semestre', type: 'check', model: true},
            segundos: {label: 'Segundo semestre', type: 'check', model: true}
          }
        })
        await this.crear({...datos, idProyecto})
      } catch (error) {
      }
    },
    async editar (act) {
      try {
        const id = act.id
        const {actividad, primers, segundos} = await this.$refs.form.getData({
          title: 'Modificar actividad',
          form: {
            actividad: {label: 'Actividad'},
            primers: {label: 'Primer Semestre', type: 'check', model: true},
            segundos: {label: 'Segundo Semestre', type: 'check', model: true}
          }
        })
        await this.modificar({id, actividad, primers, segundos})
      } catch (error) {
      }
    },
    async borrar (act) {
      try {
        await this.$q.dialog({
          title: 'Eliminar actividad',
          message: `Desea eliminar la actividad ${act.actividad}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        await this.eliminar(act)
        this.selected = undefined
      } catch (error) {
      }
    }
  }
}
</script>

<style>
</style>
