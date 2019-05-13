<template>
  <div>
      <q-table
        title="Horas semanales"
        :data="horas"
        :columns="$options.columns"
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
    name: 'fecha',
    sortable: true,
    align: 'left',
    label: 'Fecha'
  },
  {
    name: 'lugarActividad',
    sortable: true,
    align: 'left',
    label: 'Lugar y Actividad realizada'
  },
  {
    name: 'horario',
    sortable: true,
    align: 'left',
    label: 'Horario'
  },
  {
    name: 'hrs',
    sortable: true,
    align: 'left',
    label: 'Hrs'
  }
]
export default {
  columns: columns.map(obj => ({...obj, field: obj.name})),
  props: {
    horas: {
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
