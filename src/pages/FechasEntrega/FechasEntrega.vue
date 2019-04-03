<template>
<div>
  <div class="row justify-center">
    <q-table
      title="Fechas de Entrega"
      :data="fechasEntrega"
      :columns="$options.columns"
      row-key="name"
    />
  </div>
  <div class="row justify-center">
      <q-btn v-if="isAdmin" icon="alarm_add" color="primary" label="Agregar nueva fecha de entrega" @click="agregar()"/>
    </div>
  <date-form-dialog ref="form" />
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DateFormDialog from '../../components/DateFormDialog'

const columns = [
  {
    name: 'año',
    label: 'Año'
  },
  {
    name: 'convocatoria',
    label: 'Propuesta de proyecto'
  },
  {
    name: 'fecha_limite',
    label: 'Fecha limite de entrega'
  },
  {
    name: 'prorroga',
    label: 'Prorroga'
  },
  {
    name: 'informe1',
    label: 'Primer Informe'
  },
  {
    name: 'informe2',
    label: 'Segundo Informe'
  },
  {
    name: 'informe3',
    label: 'Tercer Informe'
  }
]

export default {
  columns: columns.map(obj => ({...obj, field: obj.name})),
  components: {DateFormDialog},
  mounted () {
    this.cargarTodas()
  },
  computed: {
    fechasEntrega () {
      return this.$store.getters['fechaEntrega/fechasEntrega']
    },
    ...mapGetters('usuario', ['isAdmin'])
  },
  methods: {
    ...mapActions('fechaEntrega', ['cargarTodas', 'crear']),
    async agregar () {
      try {
        const datos = await this.$refs.form.getData({
          title: 'Nueva fecha',
          form: {
            convocatoria: {label: 'Convocatoria'},
            fechaLimite: {label: 'Fecha Limite'},
            prorroga: {label: 'Prorroga'},
            informe1: {label: 'Primer Informe'},
            informe2: {label: 'Segundo Informe'},
            informe3: {label: 'Tercer Informe'}
          }
        })
        await this.crear(datos)
      } catch (error) {
      }
    }
  }
}
</script>
