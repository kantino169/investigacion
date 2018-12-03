<template>
<div>
  <div class="row justify-center">
    <q-table
      title="Fechas de Entrega"
      :data="fechasEntrega"
      :columns="columns"
      row-key="name"
    />
  </div>
  <div class="row justify-center">
      <q-btn icon="alarm_add" color="primary" label="Agregar nueva fecha de entrega" />
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    columns: [
      {
        name: 'año',
        label: 'Año'
      },
      {
        name: 'propuesta',
        label: 'Propuesta de proyecto'
      },
      {
        name: 'fechaLimite',
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
  }),
  mounted () {
    this.cargarTodas()
  },
  computed: {
    fechasEntrega () {
      return this.$store.getters['fechaEntrega/fechasEntrega']
    }
  },
  methods: {
    ...mapActions('fechaEntrega', ['cargarTodas'])
  }
}
</script>
