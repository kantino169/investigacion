<template>
  <q-dialog v-model="dialogNuevo">
    <span slot="title">Agregar evaluador</span>
    <div slot="body">
      <q-input float-label="Nombre" v-model="datos.name" />
      <q-input float-label="Password" v-model="datos.password" type="password" />
      <q-input float-label="Email" type="email" v-model="datos.email" />
    </div>
    <template slot="buttons" slot-scope="props">
      <q-btn color="primary" @click="enviar(props.ok)">Entrar</q-btn>
      <q-btn color="secondary" @click="cancelar(props.cancel)">Entrar</q-btn>
    </template>
  </q-dialog>
</template>

<script>
export default {
  data: () => ({
    datos: {
      name: '',
      password: '',
      email: '',
    },
    open: false,
    resolve: undefined,
    reject: undefined
  }),
  watch: {
    open (value) {
      if (!value && typeof this.reject === 'function') this.reject()
    }
  },
  methods: {
    enviar (ok) {
      if (typeof this.resolve === 'function') this.resolve(this.datos)
      if (typeof ok === 'function') ok()
    }
  },
  dialogNuevo: false
  
}
</script>

