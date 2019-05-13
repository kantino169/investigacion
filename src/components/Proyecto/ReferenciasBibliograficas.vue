<template>
  <div>
    <h5>VII. REFERENCIAS BIBLIOGRAFICAS</h5>
    <p class="caption">1.Listado de referencias bibliograficas (citados en el proyecto)</p>
    <full-editor v-model="datos.referencias"/>
  </div>
</template>
<script>
import FullEditor from 'components/FullEditor'

export default {
  name: 'referencias-bibliograficas',
  components: { FullEditor },
  data () {
    return {
      datos: {
        referencias: undefined
      }
    }
  }
}
</script>
