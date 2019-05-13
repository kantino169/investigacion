<template>
  <div>
    <h5>V. PUBLICACION CIENTIFICA</h5>
    <p class="caption">1. Presentar un plan viable de publicación de la investigación (Especificar si se pretende publicar los resultados de la investigación en forma de un artículo científico o un libro).</p>
    <full-editor v-model="datos.publicacion"/>
  </div>
</template>
<script>
import FullEditor from 'components/FullEditor'

export default {
  name: 'publicacion-cientifica',
  components: { FullEditor },
  data () {
    return {
      datos: {
        publicacion: undefined
      }
    }
  }
}
</script>
