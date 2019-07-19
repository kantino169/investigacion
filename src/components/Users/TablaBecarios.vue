<template>
  <div>
    <q-search v-model="filter"/>
      <q-table
        title="Becarios"
        :data="becarios"
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
    name: 'idUsuario',
    sortable: true,
    align: 'left',
    label: 'Becario'
  },
  {
    name: 'idCategoria',
    sortable: true,
    align: 'left',
    label: 'Categoria del becario'
  },
  {
    name: 'horasSemanales',
    sortable: true,
    align: 'left',
    label: 'Cantidad de horas asignadas'
  },
  {
    name: 'cantidadMeses',
    sortable: true,
    align: 'left',
    label: 'Cantidad de meses asignados'
  }
]

export default {
  columns: columns.map(obj => ({...obj, field: obj.name})),
  data: () => ({
    filter: ''
  }),
  props: {
    becarios: {
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
