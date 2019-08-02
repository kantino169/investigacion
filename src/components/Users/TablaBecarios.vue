<template>
  <div>
    <q-search v-model="filter"/>
      <q-table
        title="Becarios"
        :data="rows"
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
    name: 'usuario',
    sortable: true,
    align: 'left',
    label: 'Becario',
    format: (usuario = {}) => usuario.nombre
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
  },
  {
    name: 'aprobacionBecario',
    sortable: true,
    align: 'left',
    label: 'Aprobado por SECyT',
    format: row => {
      switch (row) {
        case 1: return 'Aprobado'
        case 0: return 'No Aprobado'
      }
    }
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
    },
    usuarios: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    selectedInput: {
      get () { return this.selected ? [this.selected] : [] },
      set (val) {
        this.$emit('update:selected', val.length ? val[0] : undefined)
      }
    },
    rows () {
      return this.becarios.map(becario => ({
        ...becario,
        usuario: this.usuarios.find(u => u.id === String(becario.idUsuario))
      }))
    }
  }
}

</script>
