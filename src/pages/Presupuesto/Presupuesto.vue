<template>
  <q-page padding>
    <q-btn
      class="q-md"
      color="primary"
      label="Agregar Item"
      @click="agregar(proyecto.id)" />
    <q-btn color="" :disabled="!selected" flat round icon="edit" @click="editar(selected)" />
    <q-btn color="negative" :disabled="!selected" flat round delete icon="delete" @click="borrar(selected)" />
    <tabla-presupuesto :presupuestos="presupuestos" :selected.sync="selected"/>
    <q-btn class="q-mt-lg" icon="keyboard_backspace" label="ATRAS" @click="$router.push({name: 'MenuProyecto', params: {idProyecto: proyecto.id}})"></q-btn>
    <form-dialog ref="form" />
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TablaPresupuesto from 'components/Presupuesto/tablaPresupuesto'
import FormDialog from 'components/FormDialog'

export default {
  name: 'Presupuesto',
  components: { TablaPresupuesto, FormDialog },
  async mounted () {
    await this.$store.dispatch('proyecto/cargarTodos')
    this.cargarTodas(this.proyecto.id)
  },
  data: () => ({selected: undefined}),
  computed: {
    ...mapGetters('presupuesto', ['presupuestos']),
    proyectos () {
      return this.$store.getters['proyecto/proyectos']
    },
    proyecto () {
      return this.proyectos.find(proyecto => proyecto.id === this.$route.params.idProyecto)
    }
  },
  methods: {
    ...mapActions('presupuesto', ['cargarTodas', 'crear', 'modificar', 'eliminar']),

    async agregar (idProyecto) {
      try {
        const datos = await this.$refs.form.getData({
          title: 'Nuevo Item',
          form: {
            rubro: {label: 'Rubro'},
            monto: {label: 'Monto', type: 'number'}
          }
        })
        await this.crear({...datos, idProyecto})
      } catch (error) {
      }
    },
    async editar (presupuesto) {
      try {
        const id = presupuesto.id
        const nombreAnterior = presupuesto.rubro
        const {rubro, monto} = await this.$refs.form.getData({
          title: 'Modificar Item',
          form: {
            rubro: {label: 'Rubro', prompt: nombreAnterior},
            monto: {label: 'Monto', type: 'number'}
          }
        })
        await this.modificar({rubro, monto, id})
      } catch (error) {
      }
    },
    async borrar (presupuesto) {
      try {
        await this.$q.dialog({
          title: 'Eliminar item',
          message: `Desea eliminar el Item ${presupuesto.rubro}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        await this.eliminar(presupuesto)
        this.selected = undefined
      } catch (error) {
      }
    }
  }
}
</script>

<style>
</style>
