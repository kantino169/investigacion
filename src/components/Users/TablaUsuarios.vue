<template>
  <div>
    <q-search v-model="filter"/>
      <q-table
        title="Usuarios"
        :data="filterUsers"
        :columns="$options.columns"
        row-key="id"
        :filter="filter"
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
    name: 'username',
    sortable: true,
    align: 'left',
    label: 'Nombre de usuario'
  },
  {
    name: 'tipoUsuario',
    sortable: true,
    align: 'left',
    label: 'Tipo de Usuario',
    format: row => {
      switch (row) {
        case 0: return 'Alumno'
        case 1: return 'Profesor'
        case 2: return 'Decano / Secretario Academico'
        case 3: return 'Administrador'
      }
    }
  },
  {
    name: 'idFacultad',
    sortable: true,
    align: 'left',
    label: 'Facultad',
    format: row => {
      switch (row) {
        case 1: return 'FCS'
        case 2: return 'FHECIS'
        case 3: return 'FACEA'
        case 4: return 'TEOLOGIA'
      }
    }
  }
]

export default {
  name: 'tabla-usuarios',
  columns: columns.map(obj => ({...obj, field: obj.name})),
  data: () => ({
    filter: ''
  }),
  props: {
    filterSelect: {
      type: Number
    },
    usuarios: {
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
    },
    filterUsers () {
      if (this.filterSelect === 1) {
        return this.usuarios
      } else {
        return this.usuarios.filter(usuario => usuario.tipoUsuario === this.filterSelect - 2)
      }
    }
  }
}

</script>
