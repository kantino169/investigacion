<template>
  <q-page padding>
    <q-btn
      class="q-md"
      color="primary"
      label="Agregar Item"
      @click="agregar" />
    <tabla-presupuesto :presupuestos="presupuestos" />
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
    async editar ({id, nombre: nombreAnterior}) {
      try {
        const nombre = await this.$q.dialog({
          title: 'Modificar disciplina',
          message: 'Nombre:',
          prompt: {
            model: nombreAnterior,
            type: 'text'
          }
        })
        await this.modificar({id, nombre})
      } catch (error) {
      }
    },
    async borrar (disciplina) {
      try {
        await this.$q.dialog({
          title: 'Eliminar disciplina',
          message: `Desea eliminar la disciplina ${disciplina.nombre}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        await this.eliminar(disciplina)
      } catch (error) {
      }
    }
  }
}
</script>

<style>
</style>
