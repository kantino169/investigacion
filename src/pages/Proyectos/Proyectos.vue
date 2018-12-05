<template>
  <div class="row justify-center">
    <q-stepper ref="stepper" color="primary" v-model="step" :alternative-labels="alt" vertical>
      <q-step default name="parte1" title="I. IDENTIFICACION DEL PROYECTO">
        <q-select
          v-model="datos.modalidad"
          placeholder="1. Modalidad:"
          :options="modalidades"
        />
        <seleccionador-lineas v-model="datos.lineaInvestigacion" />
        <q-input v-model="datos.director" float-label="Director"></q-input>
        <q-input v-model="datos.codirector" float-label="Co-director/es"></q-input>
        <q-collapsible icon="help_outline" label="Mas informacion">
          <div>
            En caso de proyecto TESIS, agregar nombre  del director o consejero de la TESIS
          </div>
        </q-collapsible>
        <q-input v-model="datos.otrosMiembrosUap" type="textarea" float-label="Otros miembros del equipo de investigacion de la UAP"></q-input>
        <q-input v-model="datos.otrosMiembros" type="textarea" float-label="Otros miembros del equipo de investigación externos a la Institución"></q-input>
        <q-input v-model="datos.asistentes" type="textarea" float-label="Asistentes de investigacion"></q-input>
        <q-input v-model="datos.becarios" type="textarea" float-label="Becarios de investigacion"></q-input>
        <q-select
          v-model="datos.unidadesAcademicas"
          placeholder="Unidad academica patrocinante:"
          :options="unidadesAcademicas"
        />
        <q-stepper-navigation v-if="!globalNavigation">
          <q-btn class="q-ml-sm" color="primary" @click="$refs.stepper.next()">Continue</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="parte2" title="II. DESCRIPCION DEL PROYECTO">
        <q-input v-model="datos.titulo" float-label="Titulo del proyecto"></q-input>
        <q-input v-model="datos.resumen" type="textarea" float-label="4. Resumen tecnico - (entre 150-250 palabras)"></q-input>
        <q-input v-model="datos.palabarasClave" type="textarea" float-label="5. Palabras clave - (entre 4 y 6 descriptores tematicos relevantes)"></q-input>
        <q-stepper-navigation v-if="!globalNavigation">
          <q-btn color="primary" @click="$refs.stepper.next()">Continue</q-btn>
          <q-btn class="q-ml-sm" color="secundary" flat @click="$refs.stepper.previous()">Atras</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="parte3" title="III. INTRODUCCION DEL PROYECTO">
        <q-input v-model="datos.estadoActual" type="textarea" float-label="1. Estado actual del conocimiento sobre el tema (Marco teorico que incluya la descripcion de los principales datos de la literatura)"></q-input>
        <q-input v-model="datos.definicionProblema" type="textarea" float-label="2. Definicion del problema e hipotesis (dependiendo del tipo de estudio)"></q-input>
        <q-input v-model="datos.justificacion" type="textarea" float-label="3. Justificacion cientifica, academica-institucional y social"></q-input>
        <q-input v-model="datos.objetivos" type="textarea" float-label="4. Objetivos"></q-input>
        <q-stepper-navigation v-if="!globalNavigation">
          <q-btn color="primary" @click="$refs.stepper.next()">Continue</q-btn>
          <q-btn class="q-ml-sm" color="secundary" flat @click="$refs.stepper.previous()">Atras</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="parte4" title="IV. METODOS">
        <q-input v-model="datos.metodologia" type="textarea" float-label="1. Metodologia (conforme el tipo de investigacion)"></q-input>
        <q-collapsible icon="help_outline" label="Mas informacion">
          <div>
            a. Para investigaciones empíricas cuantitativas, cualitativas, cuali-cuantitativas, o experimentales se necesita especificar, como mínimo, los siguientes aspectos con detalles: <br>
            - Diseño o tipo de investigación<br>
            - Participantes (muestra y tipo de muestreo)<br>
            - Instrumentos de Recolección de Datos<br>
            - Variables <br>
            - Procedimientos para Recolección de Datos<br>
            - Consideraciones Éticas del Estudio<br>
            - Procesamiento y Análisis de datos<br>
            <br>
            b. Para investigaciones de tipo teóricas: detallar la metodología que se utilizará.
          </div>
        </q-collapsible>
        <q-input v-model="datos.anexos" type="textarea" float-label="2. Anexos (conforme el tipo de investigacion)"></q-input>
        <q-collapsible icon="help_outline" label="Mas informacion">
          <div>
            - Solicitud de autorización de la Institución donde se pretende realizar el estudio <br>
            - Invitación a la participación del estudio y Consentimiento Informado<br>
            - Especificaciones de Técnicas y Métodos de Estudio<br>
            - Descripción de tests, maniobras o procedimientos <br>
            - Protocolos de Experimentación <br>
            - Fórmulas, Reactivos, etc. <br>
            - Constancia de aprobación del Comité de Ética de la UAP, en caso de trabajar con personas o animales (adjuntar la misma si ya fue presentado al Comité).
          </div>
        </q-collapsible>
        <q-stepper-navigation v-if="!globalNavigation">
          <q-btn color="primary" @click="$refs.stepper.next()">Continue</q-btn>
          <q-btn class="q-ml-sm" color="secundary" flat @click="$refs.stepper.previous()">Atras</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="parte5" title="V. PUBLICACION CIENTIFICA">
        <q-input v-model="datos.publicacion" type="textarea" float-label="1. Presentar un plan viable de publicación de la investigación (Especificar si se pretende publicar los resultados de la investigación en forma de un artículo científico o un libro)."></q-input>
        <q-stepper-navigation v-if="!globalNavigation">
          <q-btn color="primary" @click="$refs.stepper.next()">Continue</q-btn>
          <q-btn class="q-ml-sm" color="secundary" flat @click="$refs.stepper.previous()">Atras</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="parte6" title="VI. PRESUPUESTO">
        <q-input v-model="datos.estimacionDuracionProyecto" type="number" float-label="1. Estimacion de la duracion del proyecto (expresado en cantidad de años)"></q-input>
        <q-input v-model="datos.estimacionTiempoSemanal" type="number" float-label="2. Estimacion del tiempo semanal necesario para realizar la investigacion (expresado en cantidad de horas reloj semanal por miembro de equipo)"></q-input>
        <q-stepper-navigation v-if="!globalNavigation">
          <q-btn color="primary" @click="$refs.stepper.next()">Continue</q-btn>
          <q-btn class="q-ml-sm" color="secundary" flat @click="$refs.stepper.previous()">Atras</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="parte7" title="VII. REFERENCIAS BIBLIOGRAFICAS">
        <q-input v-model="datos.bibliografia" type="textarea" float-label="1.Listado de referencias bibliograficas (citados en el proyecto)" />
        <q-stepper-navigation v-if="!globalNavigation">
          <q-btn class="q-ml-sm" @click="crear()" color="primary">Finalizar</q-btn>
          <q-btn color="red" class="q-ml-sm" @click="$refs.stepper.goToStep('parte1')">Reiniciar</q-btn>
          <q-btn class="q-ml-sm" color="secundary" flat @click="$refs.stepper.previous()">Atras</q-btn>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<style scoped>
  .q-stepper {
  width: 90%;
  margin: 10px;
}
</style>

<script>
import { mapActions } from 'vuex'
import SeleccionadorLineas from 'components/Proyecto/SeleccionadorLineas/SeleccionadorLineas.vue'

export default {
  components: {SeleccionadorLineas},
  data () {
    return {
      step: 'first',
      datos: {
        modalidad: undefined,
        lineaInvestigacion: undefined,
        director: undefined,
        codirector: undefined,
        otrosMiembrosUap: undefined,
        otrosMiembros: undefined,
        asistentes: undefined,
        becarios: undefined,
        unidadesAcademicas: undefined,
        titulo: undefined,
        resumen: undefined,
        palabrasClave: undefined,
        estadoActual: undefined,
        definicionProblema: undefined,
        justificacion: undefined,
        objetivos: undefined,
        metodologia: undefined,
        anexos: undefined,
        publicacion: undefined,
        estimacionDuracionProyecto: undefined,
        estimacionTiempoSemanal: undefined,
        bibliografia: undefined
      },
      options: ['contractable', 'step_error']
    }
  },
  mounted () {
    this.cargarModalidades()
    this.cargarUnidadesAcademicas()
  },
  computed: {
    modalidades () {
      return this.$store.getters['proyecto/modalidades'].map(({id, nombre}) => ({label: nombre, value: id}))
    },
    unidadesAcademicas () {
      return this.$store.getters['proyecto/unidadesAcademicas'].map(({id, nombre}) => ({label: nombre, value: id}))
    },
    alt () {
      return this.options.includes('alt')
    },
    // contractable () {
    //   return this.options.includes('contractable')
    // },
    globalNavigation () {
      return this.options.includes('global_navigation')
    },
    progress () {
      return this.options.includes('progress')
    }
  },
  methods: {
    ...mapActions('proyecto', ['cargarModalidades', 'cargarUnidadesAcademicas', 'agregar']),
    async crear () {
      await this.agregar(this.datos)
    }
  }
}
</script>
