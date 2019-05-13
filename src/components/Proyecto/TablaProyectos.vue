<template>
  <div>
    <q-search v-model="filter"/>
      <q-table
        title="Proyectos"
        :data="proyectos"
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
    name: 'titulo',
    sortable: true,
    align: 'left',
    label: 'Título de la Investigación'
  },
  {
    name: 'idModalidad',
    sortable: true,
    align: 'left',
    label: 'Modalidad'
  },
  {
    name: 'idDirector',
    sortable: true,
    align: 'left',
    label: 'Director del Proyecto'
  }
]

export default {
  name: 'tabla-proyectos',
  columns: columns.map(obj => ({...obj, field: obj.name})),
  data: () => ({
    filter: ''
  }),
  props: {
    proyectos: {
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
