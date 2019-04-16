<template>
  <div>
    <q-table
      title="Presupuesto"
      :data="presupuestos"
      :columns="$options.columns"
      row-key="id"
      :pagination="{rowsPerPage: Number.MAX_SAFE_INTEGER}"
      :rows-per-page-options="[]"
      selection="single"
      :selected.sync="selectedInput"
    >

    <!-- <template slot="top-selection">
      <div class="col" />
      <q-btn color="negative" flat round delete icon="delete" @click="$emit('borrar(selected)')" />
    </template> -->
    </q-table>
    <q-list highlight separator>
      <q-item>
        <q-item-side>TOTAL</q-item-side>
        <q-item-main>$ {{suma}}</q-item-main>
      </q-item>
    </q-list>
  </div>
</template>

<script>

const columns = [
  {
    name: 'rubro',
    sortable: true,
    align: 'left',
    label: 'Rubro'
  },
  {
    name: 'monto',
    sortable: true,
    align: 'left',
    label: 'Monto'
  }
]

export default {
  columns: columns.map(obj => ({...obj, field: obj.name})),
  props: {
    presupuestos: {
      type: Array,
      default: () => []
    },
    selected: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    suma () {
      return this.presupuestos.reduce((suma, {monto}) => suma + monto, 0)
    },
    selectedInput: {
      get () { return this.selected ? [this.selected] : [] },
      set (val) {
        this.$emit('update:selected', val.length ? val[0] : undefined)
      }
    }
  }
}

</script>
