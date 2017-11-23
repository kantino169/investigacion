<template>
  <div class="adrian">
      <h6>PROTOCOLO PROYECTO DE INVESTIGACION</h6>
      <q-stepper @finish="finish()" ref="stepper">
        <q-step title="I. IDENTIFICACION DEL PROYECTO">
          <div class="stacked-label">
            <q-dialog-select type="radio" class="full-width"
              :options="modalidadesOptions" v-model="form.modalidad"/>
            <label>1. Modalidad del proyecto</label>
          </div>
          <div class="stacked-label">
            <label>2. Miembros del equipo de investigación</label>
            <input v-model="form.director" class="full-width" placeholder="Director"> 
            <textarea v-model="form.codirector" class="full-width" placeholder="Co-director/es  ----- (En caso de proyecto TESIS, agregar nombre del director o consejero de la TESIS)"></textarea>
            <textarea v-model="form.otros_miembros_uap" class="full-width" placeholder="Otros miembros del equipo de investigación de la UAP"></textarea>
            <textarea v-model="form.otros_miembros" class="full-width" placeholder="Otros miembros del equipo de investigación externos a la Institución"></textarea>
            <textarea v-model="form.asistentes" class="full-width" placeholder="Asistentes de Investigación"></textarea>
            <textarea v-model="form.becarios" class="full-width" placeholder="Becarios de Investigación"></textarea>
          </div>
          <div class="stacked-label">
            <q-dialog-select type="toggle" class="full-width"
              :options="unidadOptions" v-model="form.unidadAcademica"/>
            <label>3. Unidad académica patrocinante</label>
          </div>
        </q-step>

        <!-- Step specifying when user should be able to jump to next step -->

        <q-step title="II. DESCRIPCION DEL PROYECTO" >
          <div class="stacked-label">
            <q-dialog-select type="radio" class="full-width"
              :options="gruposOptions" v-model="form.grupo"/>
            <label>1. Grupo de línea de investigación</label>
          </div>
          <div class="stacked-label" v-if="form.grupo">
            <q-dialog-select type="toggle" class="full-width"
              :options="lineasOptions" v-model="form.lineaInvestigacion"/>
            <label>Línea de investigación</label>
          </div>
          <div class="stacked-label">
            <q-dialog-select type="toggle" class="full-width"
              :options="disciplinasOptions" v-model="form.disciplinaEstudio"/>
            <label>2. Disciplina general y area especifica del conocimiento</label>
          </div>
          <input v-model="form.titulo" class="full-width" placeholder="Título del proyecto">
          <textarea v-model="form.resumen" class="full-width" placeholder="4. Resumen tecnico - (entre 150-250 palabras)"></textarea>
          <textarea v-model="form.palabras_clave" class="full-width" placeholder="5. Palabras clave - (entre 4 y 6 descriptores tematicos relevantes)"></textarea>
        </q-step>

        <q-step title="III. INTRODUCCION DEL PROYECTO">
          <textarea v-model="form.estado_actual" class="full-width" placeholder="1. Estado actual del conocimiento sobre el tema (Marco teorico que incluya la descripcion de los principales datos de la literatura)"></textarea>
          <textarea v-model="form.problema_hipotesis" class="full-width" placeholder="2. Definicion del problema e hipotesis (dependiendo del tipo de estudio)"></textarea>
          <textarea v-model="form.justificacion" class="full-width" placeholder="3. Justificacion cientifica, academica-institucional y social"></textarea>
          <textarea v-model="form.objetivos" class="full-width" placeholder="4. Objetivos"></textarea>
        </q-step>
        <q-step title="IV. METODOS">
          <textarea v-model="form.metodologia" class="full-width" placeholder="1. Metodologia (conforme el tipo de investigacion) "></textarea>
          <q-collapsible icon="help_outline" label="Mas informacion"><div>
            a. Para investigaciones empíricas cuantitativas, cualitativas, cuali-cuantitativas, o experimentales se necesita especificar, como mínimo, los siguientes aspectos con detalles: <br><br>
              - Diseño o tipo de investigación<br>
              - Participantes (muestra y tipo de muestreo)<br> 
              - Instrumentos de Recolección de Datos<br>
              - Variables <br>
              - Procedimientos para Recolección de Datos<br>
              - Consideraciones Éticas del Estudio<br>
              - Procesamiento y Análisis de datos<br>
              <br>
              b. Para investigaciones de tipo teóricas: detallar la metodología que se utilizará.
          </div></q-collapsible>
          <textarea v-model="form.anexos" class="full-width" placeholder="2. Anexos (conforme el tipo de investigacion)"></textarea>
          <q-collapsible icon="help_outline" label="Mas informacion"><div>
              - Solicitud de autorización de la Institución donde se pretende realizar el estudio <br> 
              - Invitación a la participación del estudio y Consentimiento Informado<br>
              - Especificaciones de Técnicas y Métodos de Estudio<br>
              - Descripción de tests, maniobras o procedimientos <br>
              - Protocolos de Experimentación <br>
              - Fórmulas, Reactivos, etc. <br>
              - Constancia de aprobación del Comité de Ética de la UAP, en caso de trabajar con personas o animales (adjuntar la misma si ya fue presentado al Comité). 
          </div></q-collapsible>
        </q-step>

        <q-step title="V. PUBLICACION CIENTIFICA">
          <textarea v-model="form.publicacion" class="full-width" placeholder="1. Presentar un plan viable de publicación de la investigación (Especificar si se pretende publicar los resultados de la investigación en forma de un artículo científico o un libro)."></textarea>
        </q-step>

        <q-step title="VI. PRESUPUESTO">
          <input v-model="form.duracion" type="number" class="full-width" placeholder="Estimacion de la duracion del proyecto (expresado en cantidad de años)">
          <input v-model="form.duracion" type="number" class="full-width" placeholder="Estimacion del tiempo semanal necesario para realizar la investigacion (expresado en cantidad de horas reloj semanal por miembro de equipo)">
        </q-step>
        <q-step title="VII. REFERENCIAS BIBLIOGRAFICAS">
          <textarea v-model="form.publicacion" class="full-width" placeholder="1.Listado de referencias bibliograficas (citados en el proyecto)"></textarea>
        </q-step>
      </q-stepper>
    
  </div>
</template>

<style scoped>
.adrian {
  margin-top: 4%;
  margin-right: 4%;
  margin-left: 4%;
}
label {
  margin-top: 2%;
  font-weight: 700;
}
textarea {
  margin-top: 4%;
}
</style>

<script>
import {getModalidades, getUnidadesAcademicas, getGrupoLineaDeInvestigacion, getLineasDeInvestigacion, getDisciplinasDeEstudio} from '../../api'
export default {
  data: () => ({
    modalidades: [],
    unidadesAcademicas: [],
    lineasInvestigacion: [],
    grupos: [],
    disciplinasEstudio: [],
    form: {
      modalidad: undefined,
      unidadAcademica: [],
      grupo: undefined,
      lineaInvestigacion: [],
      disciplinaEstudio: []
    }
  }),
  computed: {
    modalidadesOptions () {
      return this.modalidades.map(m => ({
        label: m.nombre,
        value: m.id
      }))
    },
    unidadOptions () {
      return this.unidadesAcademicas.map(u => ({
        label: u.nombre,
        value: u.id
      }))
    },
    gruposOptions () {
      return this.grupos.map(g => ({
        label: g.nombre,
        value: g.id
      }))
    },
    lineasOptions () {
      return this.lineasInvestigacion
        .filter(l => l.id_grupo === this.form.grupo)
        .map(l => ({
          label: l.linea,
          value: l.id
        }))
    },
    disciplinasOptions () {
      return this.disciplinasEstudio.map(d => ({
        label: d.nombre,
        value: d.id
      }))
    }
  },
  watch: {
    'form.grupo' () {
      this.form.lineaInvestigacion = []
    }
  },
  async mounted () {
    this.modalidades = await getModalidades()
    this.lineasInvestigacion = await getLineasDeInvestigacion()
    this.grupos = await getGrupoLineaDeInvestigacion()
    this.unidadesAcademicas = await getUnidadesAcademicas()
    this.disciplinasEstudio = await getDisciplinasDeEstudio()
  }
}
</script>
