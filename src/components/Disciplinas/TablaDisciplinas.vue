<template>
  <div>
    <q-search v-model="filter"/>
    <q-table
      title="Disciplinas"
      :data="disciplinas"
      :columns="$options.columns"
      :filter="filter"
      row-key="id"
      :pagination="{rowsPerPage: Number.MAX_SAFE_INTEGER}"
      :rows-per-page-options="[]"
      selection="single"
      :selected.sync="selectedInput"
    >
    </q-table>
  </div>
</template>

<script>

const columns = [
  {
    name: 'nombre',
    sortable: true,
    align: 'left',
    label: 'Disciplina'
  }
]

export default {
  name: 'tabla-disciplinas',
  columns: columns.map(obj => ({...obj, field: obj.name})),
  data: () => ({
    filter: ''
  }),
  props: {
    disciplinas: {
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
