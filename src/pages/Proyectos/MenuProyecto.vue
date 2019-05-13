<template>
  <q-page padding>
    <div align="center">
      <h5>Proyecto: {{proyecto.titulo}}</h5>
    </div>
    <div class="row">
      <div class="col">
        <p>Director del proyecto: {{proyecto.idDirector}}</p>
        <p>Modalidad del Proyecto: {{proyecto.idModalidad||modalidad}}</p>
      </div>
    </div>
    <p>Resumen:</p>
    <q-editor
      readonly
      v-model="proyecto.resumen"
      :toolbar="[]"
    ></q-editor>

    <div align="center" class="q-mt-lg">
      <q-btn-group class="row">
        <q-btn label="Anexos" icon="folder" @click="$router.push({name: 'Anexos', params: {idProyecto: proyecto.id}})"></q-btn>
        <q-btn label="Presupuesto" icon="monetization_on" @click="$router.push({name: 'Presupuesto', params: {idProyecto: proyecto.id}})"></q-btn>
        <q-btn label="Actividades" icon="event_note" @click="$router.push({name: 'Actividades', params: {idProyecto: proyecto.id}})"></q-btn>
        <q-btn label="Becarios" icon="person"></q-btn>
        <q-btn label="Informes" icon="note"></q-btn>
        <q-btn label="Protocolo" icon="assignment"></q-btn>
      </q-btn-group>
    </div>
  </q-page>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'MenuProyecto',
  computed: {
    proyectos () {
      return this.$store.getters['proyecto/proyectos']
    },
    proyecto () {
      return this.proyectos.find(proyecto => proyecto.id === this.$route.params.idProyecto)
    }
  },
  filters: {
    modalidad (idModalidad) {
      switch (idModalidad) {
        case 1: return 'PRI'
        case 2: return 'PIB'
        case 3: return 'PIC'
        case 4: return 'Tesis'
        case 5: return 'Proyecto'
        case 6: return 'Interfacultad'
      }
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    this.cargarTodos()
  },
  methods: {
    ...mapActions('proyecto', ['cargarTodos'])
  }
}
</script>

<style>
</style>
