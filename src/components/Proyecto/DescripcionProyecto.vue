<template>
  <div>
    <h5>II. DESCRIPCION DEL PROYECTO</h5>
    <seleccionador-lineas v-model="datos.lineaInvestigacion" />
    <!-- <div class="row items-end">
      <q-chips-input class="col-10" disabled float-label="Disciplinas de Estudio" v-model="datos.disciplinasEstudio" />
      <div class="col-2">
        <q-btn class="full-width" color="primary" @click="seleccionar">Agregar</q-btn>
      </div>
    </div> -->
    <q-input v-model="datos.titulo" float-label="Titulo del proyecto"></q-input>
    <br>
    <p class="caption">Resumen tecnico - (entre 150-250 palabras)</p>
    <full-editor v-model="datos.resumen"/>
    <q-input v-model="datos.palabrasClave" type="textarea" float-label="Palabras clave - (entre 4 y 6 descriptores tematicos relevantes)"></q-input>
  </div>
</template>

<script>
import SeleccionadorLineas from 'components/Proyecto/SeleccionadorLineas/SeleccionadorLineas.vue'
import FullEditor from 'components/FullEditor'
import { mapActions } from 'vuex'

export default {
  name: 'descripcion-proyecto',
  components: { SeleccionadorLineas, FullEditor },
  mounted () {
    this.cargarTodas()
  },
  computed: {
    disciplinas () {
      return this.$store.getters['disciplina/disciplinas'].map(({id, nombre}) => ({label: nombre, value: id}))
    }
  },
  data () {
    return {
      datos: {
        lineaInvestigacion: undefined,
        titulo: undefined,
        resumen: undefined,
        palabrasClave: undefined,
        disciplinasEstudio: undefined
      }
    }
  },
  methods: {
    ...mapActions('disciplina', ['cargarTodas', 'crear', 'modificar', 'eliminar'])
  }
}
</script>
