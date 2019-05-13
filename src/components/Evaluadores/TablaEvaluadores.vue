<template>
  <div>
    <q-search v-model="filter"/>
      <q-table
        title="Evaluadores"
        :data="evaluadores"
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
    name: 'nombre',
    sortable: true,
    align: 'left',
    label: 'Nombre'
  },
  {
    name: 'apellido',
    sortable: true,
    align: 'left',
    label: 'Apellido'
  },
  {
    name: 'email',
    sortable: true,
    align: 'left',
    label: 'Email'
  },
  {
    name: 'telefono',
    sortable: true,
    align: 'left',
    label: 'Telefono'
  },
  {
    name: 'profesion',
    sortable: true,
    align: 'left',
    label: 'Profesion'
  },
  {
    name: 'especialidad',
    sortable: true,
    align: 'left',
    label: 'Especialidad'
  },
  {
    name: 'lugarTrabajo',
    sortable: true,
    align: 'left',
    label: 'Lugar de Trabajo'
  },
  {
    name: 'dni',
    sortable: true,
    align: 'left',
    label: 'DNI'
  }
]
export default {
  columns: columns.map(obj => ({...obj, field: obj.name})),
  data: () => ({
    filter: ''
  }),
  props: {
    evaluadores: {
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
