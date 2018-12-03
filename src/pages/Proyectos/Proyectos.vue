<template>
  <div class="row justify-center">
    <q-stepper ref="formulario" color="secondary" v-model="step2" vertical>
        <q-step default name="campaign" title="I. IDENTIFICACION DEL PROYECTO">
          <q-input float-label="1. Modalidad del proyecto"/>
        </q-step>
      </q-stepper>
  </div>
</template>
