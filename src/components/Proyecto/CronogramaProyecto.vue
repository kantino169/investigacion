<template>
  <div>
    <h5>VIII. CRONOGRAMA O PLAN DE TAREAS PARA EL AÑO EN CURSO</h5>
    <div row>
      <q-btn
      class="q-md"
      color="primary"
      label="Agregar Actividad"
      @click="agregarActividad" />
    <q-btn color="" :disabled="!selected" flat round icon="edit" @click="modificarActividad(selected)" />
    <q-btn color="negative" :disabled="!selected" flat round delete icon="delete" @click="borrar(selected)" />
    <tabla-actividades :actividades="actividades" :selected.sync="selected" />
    <form-dialog ref="formActividad" />
    </div>
  </div>
</template>
<script>
import TablaActividades from 'components/Actividades/TablaActividades'
import FormDialog from 'components/FormDialog'
import { uid } from 'quasar'

export default {
  name: 'cronograma-proyecto',
  components: { TablaActividades, FormDialog },
  data () {
    return {
      actividades: [],
      selected: undefined
    }
  },
  methods: {
    async agregarActividad () {
      try {
        const datosActividad = await this.$refs.formActividad.getData({
          title: 'Nueva Actividad',
          form: {
            actividad: {label: 'Actividad'},
            primers: {label: 'Primer semestre', type: 'check', model: true},
            segundos: {label: 'Segundo semestre', type: 'check', model: true}
          }
        })
        this.actividades.push({...datosActividad, id: uid()})
      } catch (error) {
      }
    },
    async modificarActividad (act) {
      try {
        const {actividad, primers, segundos} = await this.$refs.formActividad.getData({
          title: 'Modificar Actividad',
          form: {
            actividad: {label: 'Actividad', model: act.actividad},
            primers: {label: 'Primer semestre', type: 'check', model: true},
            segundos: {label: 'Segundo semestre', type: 'check', model: true}
          }
        })
        act.actividad = actividad
        act.primers = primers
        act.segundos = segundos
      } catch (error) {
        console.log(error)
      }
    },
    async borrar (act) {
      try {
        await this.$q.dialog({
          title: 'Eliminar item',
          message: `Desea eliminar la actividad ${act.actividad}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        this.actividades.splice(this.actividades.indexOf(act.id), 1)
      } catch (error) {
      }
    }
  }
}
</script>
