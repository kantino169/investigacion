<template>
  <div>
    <q-table
      title="Actividades"
      :data="actividades"
      :columns="$options.columns"
      row-key="name"
      :pagination="{rowsPerPage: Number.MAX_SAFE_INTEGER}"
      :rows-per-page-options="[]" />
  </div>
</template>

<script>

const columns = [
  {
    name: 'actividad',
    sortable: true,
    align: 'left',
    label: 'Actividades de Investigación'
  },
  {
    name: 'primers',
    sortable: true,
    align: 'left',
    label: 'Primer Semestre'
  },
  {
    name: 'segundos',
    sortable: true,
    align: 'left',
    label: 'Segundo Semestre'
  }
]

export default {
  columns: columns.map(obj => ({...obj, field: obj.name})),
  props: {
    actividades: {
      type: Array,
      default: () => []
    }
  }
}

</script>
