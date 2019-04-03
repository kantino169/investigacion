<template>
  <div>
    <q-page padding class="q-mx-md column">
      <div>
        <q-btn
        class="q-md"
        color="primary"
        label="Agregar Item"
        @click="agregar"
        />
      </div>
      <div>
        <q-table
          title="Presupuesto"
          :data="presupuestos"
          :columns="$options.columns"
          row-key="name"
          :rows-per-page-options="[0]"
        />

      </div>
      <!-- <div>
        <q-list hightlight separator>
          <q-list-header>Presupuesto</q-list-header>
          <q-item v-for="presupuesto in presupuestos" :key="presupuesto.id">
            <q-item-side>{{presupuesto.rubro}}</q-item-side>
            <q-item-main
              :label="presupuesto.monto"/>
            <q-item-side>
              <div>
                <q-btn-group >
                  <q-btn class="q-md" color="orange" @click="editar(presupuesto)" label="Editar" title="Editar" icon="edit" />
                  <q-btn class="q-md" color="red" @click="borrar(presupuesto)" label="Eliminar" title="Eliminar" icon="delete"/>
                </q-btn-group>
              </div>
            </q-item-side>
          </q-item>
        </q-list>
      </div> -->

      <q-list highlight separator>
        <q-item>
          <q-item-side>TOTAL</q-item-side>
          <q-item-main>$ {{suma}}</q-item-main>
        </q-item>
      </q-list>
    </q-page>
    <form-dialog-pres ref="form" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FormDialogPres from '../../components/Presupuesto/FormDialogPres'

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
  components: {FormDialogPres},
  mounted () {
    this.cargarTodas()
  },
  computed: {
    presupuestos () {
      return this.$store.getters['presupuesto/presupuestos']
    },
    suma () {
      let total = 0
      const presupuestos = this.presupuestos
      for (const presupuesto in presupuestos) {
        total = total + presupuesto.monto
        console.log(total)
      }
      console.log(total)
      return this.total
    },
    ...mapGetters('usuario', ['isAdmin'])
  },
  methods: {
    ...mapActions('presupuesto', ['cargarTodas', 'crear', 'modificar', 'eliminar']),
    async agregar () {
      try {
        const datos = await this.$refs.form.getData({
          title: 'Nuevo Item',
          form: {
            rubro: {label: 'Rubro'},
            monto: {label: 'Monto'}
          }
        })
        await this.crear(datos)
      } catch (error) {
      }
    },
    async editar ({id, nombre: nombreAnterior}) {
      try {
        const nombre = await this.$q.dialog({
          title: 'Modificar disciplina',
          message: 'Nombre:',
          prompt: {
            model: nombreAnterior,
            type: 'text'
          }
        })
        await this.modificar({id, nombre})
      } catch (error) {
      }
    },
    async borrar (disciplina) {
      try {
        await this.$q.dialog({
          title: 'Eliminar disciplina',
          message: `Desea eliminar la disciplina ${disciplina.nombre}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        await this.eliminar(disciplina)
      } catch (error) {
      }
    }
  }
}

</script>
