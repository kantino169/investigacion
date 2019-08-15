<template>
  <div>
    <q-search v-model="filter"/>
      <q-table
        title="Libros"
        :data="libros"
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
    name: 'año',
    sortable: true,
    align: 'left',
    label: 'Año'
  },
  {
    name: 'titulo',
    sortable: true,
    align: 'left',
    label: 'Título del libro'
  },
  {
    name: 'editorial',
    sortable: true,
    align: 'left',
    label: 'Nombre de la editorial'
  },
  {
    name: 'lugar',
    sortable: true,
    align: 'left',
    label: 'Lugar'
  },
  {
    name: 'link',
    sortable: true,
    align: 'left',
    label: 'Link'
  }
]

export default {
  columns: columns.map(obj => ({...obj, field: obj.name})),
  data: () => ({
    filter: ''
  }),
  props: {
    libros: {
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
