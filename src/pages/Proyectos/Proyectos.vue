<template>
  <div class="row justify-center">
    <q-stepper ref="stepper" color="primary" v-model="step" :alternative-labels="alt" vertical>
      <q-step default name="parte1" title="I. IDENTIFICACION DEL PROYECTO">
        <q-input float-label="Modalidad"></q-input>
        <q-stepper-navigation v-if="!globalNavigation">
          <q-btn class="q-ml-sm" color="primary" @click="$refs.stepper.next()">Continue</q-btn>
          <q-btn class="q-ml-sm" color="green" @click="$refs.stepper.goToStep('parte7')">Finish</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="parte2" title="II. DESCRIPCION DEL PROYECTO">
        <q-input float-label="parte2"></q-input>
        <q-stepper-navigation v-if="!globalNavigation">
          <q-btn color="primary" @click="$refs.stepper.next()">Continue</q-btn>
          <q-btn class="q-ml-sm" color="secundary" flat @click="$refs.stepper.previous()">Atras</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="parte3" title="III. INTRODUCCION DEL PROYECTO">
        <q-input float-label="parte3"></q-input>
        <q-stepper-navigation v-if="!globalNavigation">
          <q-btn color="primary" @click="$refs.stepper.next()">Continue</q-btn>
          <q-btn class="q-ml-sm" color="secundary" flat @click="$refs.stepper.previous()">Atras</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="parte4" title="IV. METODOS">
        <q-input float-label="parte4"></q-input>
        <q-stepper-navigation v-if="!globalNavigation">
          <q-btn color="primary" @click="$refs.stepper.next()">Continue</q-btn>
          <q-btn class="q-ml-sm" color="secundary" flat @click="$refs.stepper.previous()">Atras</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="parte5" title="V. PUBLICACION CIENTIFICA">
        <q-input float-label="parte5"></q-input>
        <q-stepper-navigation v-if="!globalNavigation">
          <q-btn color="primary" @click="$refs.stepper.next()">Continue</q-btn>
          <q-btn class="q-ml-sm" color="secundary" flat @click="$refs.stepper.previous()">Atras</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="parte6" title="VI. PRESUPUESTO">
        <q-input type="number" float-label="1. Estimacion de la duracion del proyecto (expresado en cantidad de años)"></q-input>
        <q-input type="number" float-label="Estimacion del tiempo semanal necesario para realizar la investigacion (expresado en cantidad de horas reloj semanal por miembro de equipo)"></q-input>
        <q-stepper-navigation v-if="!globalNavigation">
          <q-btn color="primary" @click="$refs.stepper.next()">Continue</q-btn>
          <q-btn class="q-ml-sm" color="secundary" flat @click="$refs.stepper.previous()">Atras</q-btn>
        </q-stepper-navigation>
      </q-step>
      <q-step name="parte7" title="VII. REFERENCIAS BIBLIOGRAFICAS">
        <q-input
          type="textarea"
          float-label="1.Listado de referencias bibliograficas (citados en el proyecto)" />
        <q-stepper-navigation v-if="!globalNavigation">
          <q-btn class="q-ml-sm" color="primary">Finalizar</q-btn>
          <q-btn color="red" class="q-ml-sm" @click="$refs.stepper.goToStep('parte1')">Reiniciar</q-btn>
          <q-btn class="q-ml-sm" color="secundary" flat @click="$refs.stepper.previous()">Atras</q-btn>
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      step: 'first',
      options: ['contractable', 'step_error']
    }
  },
  computed: {
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
  }
}
</script>
