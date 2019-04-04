<template>
  <q-page padding>
    <q-btn
      class="q-md"
      color="primary"
      label="Agregar Actividad"
      @click="agregar" />
    <tabla-actividades :actividades="actividades" />
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
  mounted () { this.cargarTodas() },
  computed: mapGetters('actividades', ['actividades']),
  methods: {
    ...mapActions('actividades', ['cargarTodas', 'crear', 'modificar', 'eliminar']),

    async agregar () {
      try {
        const datos = await this.$refs.form.getData({
          title: 'Nueva Actividades',
          form: {
            actividad: {label: 'Actividad'}
            // Ver como hacer el select, la idea es que se clickee como vi en el ejemplo de la tabla
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
