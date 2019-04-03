<template>
  <q-dialog v-model="open">
    <span slot="title">Nuevo Item</span>

    <div slot="body" v-if="form">
      <q-input :key="key"
        :float-label="Rubro"
        v-model="rubro"
        :type="text"
        @keyup.enter="enviar()"/>
        <q-input :key="key"
        :float-label="Monto"
        v-model="monto"
        :type="number"
        @keyup.enter="enviar()"
        />
    </div>

    <template slot="buttons" slot-scope="{ok}">
      <q-btn color="primary" @click="enviar(ok)">{{buttonOk}}</q-btn>
    </template>
  </q-dialog>
</template>

<script>
export default {
  data: () => ({
    datos: undefined,
    title: '',
    buttonOk: 'Ok',
    buttonCancel: 'Cancelar',
    form: undefined,
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
    getData ({title, ok, cancel, form}) {
      this.title = title
      this.buttonOk = ok || 'Ok'
      this.buttonCancel = cancel || 'Cancelar'
      const datos = {}
      for (let key in form) {
        datos[key] = form[key].model || ''
      }
      this.datos = datos
      this.form = form
      this.open = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    enviar (ok) {
      if (typeof this.resolve === 'function') this.resolve(this.datos)
      if (typeof ok === 'function') ok()
      else this.open = false
      this.form = undefined
    }
  }
}
</script>
