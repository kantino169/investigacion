<template>
<div>
  <div class="row justify-center">
    <q-table
      title="Fechas de Entrega"
      :data="tableData"
      :columns="columns"
    />
  </div>
  <div class="row justify-center">
      <q-btn icon="alarm_add" color="primary" label="Agregar nueva fecha de entrega" />
    </div>
</div>
</template>

<script>
/* const fechas = [
  { id: '1', nombre: 'Primer fecha' },
  { id: '2', nombre: 'Segunda fecha' }
] */

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
      },
      {
        name: 'prorroga',
        label: 'Prorroga'
      }
    ],
    tableData: []
  })
}
</script>
