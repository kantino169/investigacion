<template>
  <q-dialog v-model="open">
    <span slot="title">Iniciar sesión</span>

    <div slot="body">
      <q-input float-label="Username" v-model="datos.username" />
      <q-input float-label="Contraseña" v-model="datos.password" type="password" />
    </div>

    <template slot="buttons" slot-scope="{ok}">
      <q-btn color="primary" @click="enviar(ok)">Entrar</q-btn>
    </template>
  </q-dialog>
</template>

<script>
export default {
  data: () => ({
    datos: {
      username: '',
      password: ''
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
    getLoginData () {
      this.open = true
      this.datos = {
        username: '',
        password: ''
      }
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    enviar (ok) {
      if (typeof this.resolve === 'function') this.resolve(this.datos)
      if (typeof ok === 'function') ok()
    }
  }
}
</script>
