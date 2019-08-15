<template>
  <div>
    <q-search v-model="filter"/>
      <q-table
        title="Comunicaciones"
        :data="comunicaciones"
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
    name: 'autores',
    sortable: true,
    align: 'left',
    label: 'Autores'
  },
  {
    name: 'titulo',
    sortable: true,
    align: 'left',
    label: 'Título del trabajo presentado'
  },
  {
    name: 'evento',
    sortable: true,
    align: 'left',
    label: 'Nombre del evento'
  },
  {
    name: 'lugar',
    sortable: true,
    align: 'left',
    label: 'Lugar'
  },
  {
    name: 'fecha',
    sortable: true,
    align: 'left',
    label: 'Fecha'
  }
]

export default {
  columns: columns.map(obj => ({...obj, field: obj.name})),
  data: () => ({
    filter: ''
  }),
  props: {
    comunicaciones: {
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
