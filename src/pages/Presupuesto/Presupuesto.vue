<template>
  <q-page padding>
    <q-btn
      class="q-md"
      color="primary"
      label="Agregar Item"
      @click="agregar" />
    <q-btn color="" :disabled="!selected" flat round icon="edit" @click="editar(selected)" />
    <q-btn color="negative" :disabled="!selected" flat round delete icon="delete" @click="borrar(selected)" />
    <tabla-presupuesto :presupuestos="presupuestos" :selected.sync="selected"/>
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
  mounted () { this.cargarTodas() },
  data: () => ({selected: undefined}),
  computed: mapGetters('presupuesto', ['presupuestos']),
  methods: {
    ...mapActions('presupuesto', ['cargarTodas', 'crear', 'modificar', 'eliminar']),

    async agregar () {
      try {
        const datos = await this.$refs.form.getData({
          title: 'Nuevo Item',
          form: {
            rubro: {label: 'Rubro'},
            monto: {label: 'Monto', type: 'number'}
          }
        })
        await this.crear(datos)
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
      } catch (error) {
      }
    }
  }
}
</script>

<style>
</style>
