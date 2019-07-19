<template>
  <div>
     <h5>IV. METODOS</h5>
    <p class="caption">1. Metodologia (conforme el tipo de investigacion)</p>
    <full-editor v-model="datos.metodologia"/>
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
   <p class="caption">2. Anexos (conforme el tipo de investigacion)</p>
    <p>Los anexos se deben cargar dentro del respectivo proyecto en el menu del proyecto. Guardar el protocolo para poder acceder</p>
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

  </div>
</template>
<script>
import FullEditor from 'components/FullEditor'

export default {
  name: 'metodos-proyecto',
  components: { FullEditor },
  data () {
    return {
      datos: {
        metodologia: undefined
      }
    }
  }
}
</script>
