<template>
  <q-page padding>
    <div>
      <div align="left">
        <h6 class="q-ma-none">Universidad Adventista del Plata</h6>
        <p class="q-ma-none">Secretaría de Ciencia y Técnica</p>
      </div>
      <h5 align="center" class="bold">1° Informe de Avance</h5>
      <div align="left">
        <p>Fecha: {{ Date.now }}</p>
        <p>Responsable/s: {{proyecto.idDirector}} - {{proyecto.idCodirector}}</p>
        <p>Becarios o Asistentes de Investigación (si existen):</p>
        <p>Denominación del Proyecto: {{proyecto.nroProyecto}}</p>
      </div>
      <div>
        <h5 class="bold">ETAPA (según cronograma)</h5>
        <textarea v-model="datos.etapa" class="full-width"></textarea>
      </div>
      <div>
        <h5 class="bold">ESTADO ACTUAL DE LA INVESTIGACIÓN</h5>
        <p class="caption">Especifique (a) el grado de alcance de los objetivos, (b) los resultados obtenidos hasta la fecha y (c) cualquier situación que merezca ser presentada acerca del avance del proyecto.</p>
        <full-editor v-model="datos.estado"/>
      </div>
      <q-btn class="q-mt-lg" icon="keyboard_backspace" label="ATRAS" @click="$router.push({name: 'MenuProyecto', params: {idProyecto: proyecto.id}})"></q-btn>
      <q-btn class="q-mt-lg q-ml-lg" icon="save" label="Guardar" @click="agregar(proyecto.id)"></q-btn>
    </div>
  </q-page>
</template>

<script>
import FullEditor from 'components/FullEditor'
import { mapActions } from 'vuex'

export default {
  name: 'primer-informe',
  components: {FullEditor},
  async mounted () {
    await this.$store.dispatch('proyecto/cargarTodos')
    this.cargarPrimerInforme(this.proyecto.id)
  },
  data () {
    return {
      datos: {
        etapa: undefined,
        estado: undefined
      }
    }
  },
  computed: {
    proyectos () {
      return this.$store.getters['proyecto/proyectos']
    },
    proyecto () {
      return this.proyectos.find(proyecto => proyecto.id === this.$route.params.idProyecto)
    },
    informes () {
      return this.$store.getters['informes/informes']
    },
    informe () {
      return this.informes[0]
    }
  },
  watch: {
    informe: {
      handler (informe) {
        if (!informe) return
        this.datos = {
          etapa: informe.etapa,
          estado: informe.estado
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('informes', ['cargarPrimerInforme', 'crear', 'modificar', 'eliminar']),

    async agregar (idProyecto) {
      try {
        await this.crear({...this.datos, idProyecto, nroInforme: 1})
        this.$router.push({name: 'MenuProyecto', params: {idProyecto: this.proyecto.id}})
      } catch (error) {
      }
    }
  }
}

</script>

<style>
</style>
