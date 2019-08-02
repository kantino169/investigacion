<template>
  <q-page padding>
    <identificacion-proyecto ref="identificacion"/>
    <descripcion-proyecto ref="descripcion"/>
    <introduccion-proyecto ref="introduccion"/>
    <metodos-proyecto ref="metodos"/>
    <publicacion-cientifica ref="publicacion"/>
    <presupuesto-proyecto ref="presupuesto"/>
    <referencias-bibliograficas ref="referencias"/>
    <cronograma-proyecto ref="cronograma"/>

    <br>
    <div align="right">
      <q-btn
        class="q-md"
        color=""
        label="Guardar"
        @click="crear" />
      <q-btn
        class="q-md"
        color="primary"
        label="Enviar a SECyT"
        @click="crear" />
    </div>
  </q-page>
</template>

<style scoped>
  .q-stepper {
  width: 90%;
  margin: 10px;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Notify } from 'quasar'
import FormDialog from 'components/FormDialog'
import FullEditor from 'components/FullEditor'
import IdentificacionProyecto from 'components/Proyecto/IdentificacionProyecto'
import DescripcionProyecto from 'components/Proyecto/DescripcionProyecto'
import IntroduccionProyecto from 'components/Proyecto/IntroduccionProyecto'
import MetodosProyecto from 'components/Proyecto/MetodosProyecto'
import PublicacionCientifica from 'components/Proyecto/PublicacionCientifica'
import PresupuestoProyecto from 'components/Proyecto/PresupuestoProyecto'
import ReferenciasBibliograficas from 'components/Proyecto/ReferenciasBibliograficas'
import CronogramaProyecto from 'components/Proyecto/CronogramaProyecto'

// let actividades = []
export default {
  components: {
    FullEditor,
    ReferenciasBibliograficas,
    CronogramaProyecto,
    PresupuestoProyecto,
    FormDialog,
    IdentificacionProyecto,
    DescripcionProyecto,
    IntroduccionProyecto,
    MetodosProyecto,
    PublicacionCientifica},
  data () {
    return {
      step: 'first',
      datos: {
        idUsuario: this.$store.state.usuario.id,
        disciplinaEstudio: undefined
      }
    }
  },
  mounted () {
    // this.cargarModalidades()
    // this.cargarUnidadesAcademicas()
    // this.cargarPresupuestos()
    // this.cargarActividades()
  },
  computed: {
    ...mapGetters('presupuesto', ['presupuestos']),
    ...mapGetters('actividades', ['actividades']),

    // modalidades () {
    //   return this.$store.getters['proyecto/modalidades'].map(({id, nombre}) => ({label: nombre, value: id}))
    // },
    // unidadesAcademicas () {
    //   return this.$store.getters['proyecto/unidadesAcademicas'].map(({id, nombre}) => ({label: nombre, value: id}))
    // },
    // disciplinas () {
    //   return this.$store.getters['disciplina/disciplinas'].map(({id, nombre}) => ({label: nombre, value: id}))
    // },
    alt () {
      return this.options.includes('alt')
    },
    // contractable () {
    //   return this.options.includes('contractable')
    // },
    globalNavigation () {
      return this.options.includes('global_navigation')
    }
  },
  methods: {
    ...mapActions('proyecto', ['cargarModalidades', 'cargarUnidadesAcademicas', 'agregar']),
    ...mapActions('presupuesto', {
      cargarPresupuestos: 'cargarTodas',
      crearPresupuesto: 'crear',
      modificarPresupuesto: 'modificar',
      eliminarPresupuesto: 'eliminar'
    }),
    ...mapActions('actividades', {
      cargarActividades: 'cargarTodas',
      crearActividad: 'crear',
      modificarActividad: 'modificar',
      eliminarActividad: 'eliminar'
    }),
    async crear () {
      const datos = {
        ...this.$refs.identificacion.datos,
        ...this.$refs.descripcion.datos,
        ...this.$refs.introduccion.datos,
        ...this.$refs.metodos.datos,
        ...this.$refs.publicacion.datos,
        ...this.$refs.presupuesto.datos,
        ...this.$refs.cronograma.datos
      }
      // Validar si es guardar o crear
      await this.agregar(datos).then(() => {
        Notify.create({
          type: 'positive',
          message: 'Proyecto creado con exito'
        })
        this.$router.push('/listaProyectos')
      })
    }
  }
}
</script>
