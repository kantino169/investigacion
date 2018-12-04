<template>
  <q-dialog v-model="dialogNuevo">
    <span slot="title">Agregar evaluador</span>
    <div slot="body">
      <q-input float-label="Nombre" v-model="datos.nombre" />
      <q-input float-label="Apellido" v-model="datos.apellido"/>
      <q-input float-label="Email" type="email" v-model="datos.email" />
      <q-input float-label="Telefono" type="tel" v-model="datos.telefono" />
      <q-input float-label="Profesion" v-model="datos.profesion" />
      <q-input float-label="Especialidad" v-model="datos.especialidad" />
      <q-input float-label="DNI" type="number" v-model="datos.dni" />
      <q-input float-label="Lugar de Trabajo" v-model="datos.lugarTrabajo" />
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
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    profesion: '',
    especialidad: '',
    dni: '',
    lugarTrabajo: '',
  }),
  dialogNuevo: false
}
</script>

