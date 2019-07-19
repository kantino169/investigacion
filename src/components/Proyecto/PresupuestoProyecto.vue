<template>
  <div>
    <h5>VI. PRESUPUESTO</h5>
    <q-input v-model="datos.duracion" type="number" float-label="1. Estimacion de la duracion del proyecto (expresado en cantidad de años)"></q-input>
    <q-input v-model="datos.tiempoSemanal" type="number" float-label="2. Estimacion del tiempo semanal necesario para realizar la investigacion (expresado en cantidad de horas reloj semanal por miembro de equipo)"></q-input>
    <br>
    <q-btn
      class="q-md"
      color="primary"
      label="Agregar Item"
      @click="agregarPresupuesto" />
    <q-btn color="" :disabled="!selected" flat round icon="edit" @click="modificarPresupuesto(selected)" />
    <q-btn color="negative" :disabled="!selected" flat round delete icon="delete" @click="borrar(selected)" />
    <tabla-presupuesto :presupuestos="presupuestos" :selected.sync="selected" />
    <form-dialog ref="formPresupuesto" />
  </div>
</template>
<script>
import FormDialog from 'components/FormDialog'
import TablaPresupuesto from 'components/Presupuesto/tablaPresupuesto'
import { uid } from 'quasar'
// import { mapGetters } from 'vuex' --- creo que no hace falta

export default {
  name: 'presupuesto-proyecto',
  components: { FormDialog, TablaPresupuesto },
  data () {
    return {
      datos: {
        duracion: undefined,
        tiempoSemanal: undefined
      },
      presupuestos: [],
      selected: undefined
    }
  },
  /* computed: {
    ...mapGetters('presupuesto', ['presupuestos'])
  }, */
  methods: {
    async agregarPresupuesto () {
      try {
        const datosPresupuesto = await this.$refs.formPresupuesto.getData({
          title: 'Nuevo Item',
          form: {
            rubro: {label: 'Rubro'},
            monto: {label: 'Monto', type: 'number'}
          }
        })
        this.presupuestos.push({...datosPresupuesto, id: uid()})
      } catch (error) {
      }
    },
    async modificarPresupuesto (presupuesto) {
      try {
        const {rubro, monto} = await this.$refs.formPresupuesto.getData({
          title: 'Modificar Item',
          form: {
            rubro: {label: 'Rubro', model: presupuesto.rubro},
            monto: {label: 'Monto', model: presupuesto.monto, type: 'number'}
          }
        })
        presupuesto.rubro = rubro
        presupuesto.monto = monto
      } catch (error) {
        console.log(error)
      }
    },
    async borrar (presupuesto) {
      try {
        await this.$q.dialog({
          title: 'Eliminar item',
          message: `Desea eliminar el Item ${presupuesto.rubro}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        this.presupuestos.splice(this.presupuestos.indexOf(presupuesto.id), 1)
        this.selected = undefined
      } catch (error) {
      }
    }
  }
}
</script>
