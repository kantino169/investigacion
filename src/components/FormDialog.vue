<template>
  <q-dialog v-model="open">
    <span slot="title">{{title}}</span>

    <div slot="body" v-if="form">
      <div v-for="(field, key) in form" :key="key">
        <q-datetime v-if="field.type == 'date'" v-model="datos[key]" type="date" :first-day-of-week=0 :float-label="field.label" />
        <q-checkbox v-else-if="field.type == 'check'" v-model="datos[key]" :label="field.label" />
        <q-input v-else
          :float-label="field.label"
          v-model="datos[key]"
          :type="field.type || 'text'"
          @keyup.enter="enviar()"/>
      </div>
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
