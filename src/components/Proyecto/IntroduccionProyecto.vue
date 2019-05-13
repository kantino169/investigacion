<template>
  <div>
    <h5>III. INTRODUCCION DEL PROYECTO</h5>
    <p class="caption">1. Estado actual del conocimiento sobre el tema (Marco teorico que incluya la descripcion de los principales datos de la literatura)</p>
    <full-editor v-model="datos.estadoActual"/> <br>
    <p class="caption">2. Definicion del problema e hipotesis (dependiendo del tipo de estudio)</p>
    <full-editor v-model="datos.problemaHipotesis"/> <br>
    <p class="caption">3. Justificacion cientifica, academica-institucional y social</p>
    <full-editor v-model="datos.justificacion"/> <br>
    <p class="caption">4. Objetivos</p>
    <full-editor v-model="datos.objetivos"/>
  </div>
</template>
<script>
import FullEditor from 'components/FullEditor'

export default {
  name: 'introduccion-proyecto',
  components: { FullEditor },
  data () {
    return {
      datos: {
        estadoActual: undefined,
        problemaHipotesis: undefined,
        justificacion: undefined,
        objetivos: undefined
      }
    }
  }
}
</script>
