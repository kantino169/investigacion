<template>
  <div>
      <q-table
        title="Planillas"
        :data="planillas"
        :columns="$options.columns"
        :filter="filter"
        row-key="id"
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
    name: 'mes',
    sortable: true,
    align: 'left',
    label: 'Mes'
  },
  {
    name: 'idProyecto',
    sortable: true,
    align: 'left',
    label: 'Proyecto'
  }
]
export default {
  name: 'tabla-planillas',
  columns: columns.map(obj => ({...obj, field: obj.name})),
  data: () => ({
    filter: ''
  }),
  props: {
    planillas: {
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
