<template>
  <div>
    <q-table
      title="Presupuesto"
      :data="presupuestos"
      :columns="$options.columns"
      row-key="name"
      :pagination="{rowsPerPage: Number.MAX_SAFE_INTEGER}"
      :rows-per-page-options="[]" />

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
    }
  },
  computed: {
    suma () {
      // let total = 0
      // const presupuestos = this.presupuestos
      // console.log(presupuestos)
      // for (const presupuesto of presupuestos) {
      //   console.log(presupuesto.monto)
      //   total += presupuesto.monto
      //   console.log(total)
      // }
      // console.log(total)
      // return total
      return this.presupuestos.reduce((suma, {monto}) => suma + monto, 0)
    }
  }
}

</script>
