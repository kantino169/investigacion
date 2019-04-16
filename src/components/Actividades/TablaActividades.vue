<template>
  <div>
    <q-search v-model="filter"/>
    <q-table
      title="Actividades"
      :data="actividades"
      :columns="$options.columns"
      row-key="id"
      :filter="filter"
      :pagination="{rowsPerPage: Number.MAX_SAFE_INTEGER}"
      :rows-per-page-options="[]"
      selection="single"
      :selected.sync="selectedInput" >
    </q-table>
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
  data: () => ({
    filter: ''
  }),
  props: {
    actividades: {
      type: Array,
      default: () => []
    },
    selected: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    selectedInput: {
      get () { return this.selected ? [this.selected] : [] },
      set (val) {
        this.$emit('update:selected', val.length ? val[0] : undefined)
      }
    }
  }
}

</script>
