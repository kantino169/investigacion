<template>
  <q-page class="q-px-lg column">
    <q-stepper :value="step" alternative-labels @step="onStep">
      <q-step default name="facultad" title="Facultad" :subtitle="labels.facultad">
        <facultades-step :value="selected.facultad" @set="selected.facultad = $event"/>
      </q-step>

      <q-step name="carrera" title="Carrera" :subtitle="labels.carrera">
        <carreras-step
          :facultad="selected.facultad"
          @set="selected.carrera = $event"/>
      </q-step>
      <q-step name="grupo" title="Grupo" :subtitle="labels.grupo">
        <grupos-step
          :carrera="selected.carrera"
          @set="selected.grupo = $event" />
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import FacultadesStep from 'components/LineasInvestigacion/Facultades'
import CarrerasStep from 'components/LineasInvestigacion/Carreras'
import GruposStep from 'components/LineasInvestigacion/Grupos'

const selectedModel = () => ({
  facultad: undefined,
  carrera: undefined,
  grupo: undefined,
  subgrupo: undefined
})

const order = ['facultad', 'carrera', 'grupo', 'subgrupo', 'linea']

export default {
  components: {FacultadesStep, CarrerasStep, GruposStep},
  mounted () {
    this.cargarTodas()
  },
  data: () => ({
    selected: selectedModel()
  }),
  computed: {
    step () {
      for (const key of order) {
        if (this.selected[key] === undefined) return key
      }
    },
    labels () {
      return Object.keys(this.selected).reduce((obj, k) => {
        obj[k] = this.selected[k] ? this.selected[k].nombre : undefined
        return obj
      }, {})
    }
  },
  methods: {
    ...mapActions('facultad', ['cargarTodas']),
    onStep (step) {
      order.slice(order.indexOf(step)).forEach(k => { this.selected[k] = undefined })
    }
  }
}
</script>
