<template>
  <div class="row justify-center">
    <q-stepper ref="formulario" color="secondary" v-model="step2" vertical>
        <q-step default name="campaign" title="I. IDENTIFICACION DEL PROYECTO">
          <p>1. Modalidad del proyecto</p>
          <q-field
            label="Modalidad -SELECT"
            helper="Ingrese aqui la modalidad"
            :error="mailHasError"
            error-label="Error" >
            <q-input v-model="modalidad" />
          </q-field>
          <p>2. Miembros del equipo de investigacion</p>
          <q-select
            v-model="select"
            :options="[
              {
                label: 'Claudio Bracalenti',
                value: '1'
              },
              {
                label: 'Facebook',
                description: 'Juan Manuel Bournissen',
                value: '2'
              },
            ]"
          />
          <q-field
            label="Co-director/es"
            helper="(en caso de proyecto TESIS, agregar nombre del director o consejero de la TESIS"
            :error="mailHasError"
            error-label="Error" >
            <q-input v-model="codirector" />
          </q-field>
          <q-field
            label="Otros miembros del equipo de investigación de la UAP"
            helper=""
            :error="mailHasError"
            error-label="Error" >
            <q-input v-model="otros_miembros" />
          </q-field>
          <q-field
            label="Asistentes de Investigación"
            helper=""
            :error="mailHasError"
            error-label="Error" >
            <q-input v-model="becarios" />
          </q-field>
        </q-step>
      </q-stepper>
  </div>
</template>
