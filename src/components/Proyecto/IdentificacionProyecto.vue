<template>
  <div>
    <h5>I. IDENTIFICACION DEL PROYECTO</h5>
    <q-select
      v-model="datos.idModalidad"
      placeholder="1. Modalidad:"
      :options="modalidades"
    />
    <q-input v-model="datos.director_id" float-label="Director"></q-input>
    <q-input v-model="datos.codirector_id" float-label="Co-director/es"></q-input>
    <q-collapsible icon="help_outline" label="Mas informacion">
      <div>
        En caso de proyecto TESIS, agregar nombre  del director o consejero de la TESIS
      </div>
    </q-collapsible>
    <q-input v-model="datos.otros_miembros_uap" type="textarea" float-label="Otros miembros del equipo de investigacion de la UAP"></q-input>
    <q-input v-model="datos.otros_miembros" type="textarea" float-label="Otros miembros del equipo de investigación externos a la Institución"></q-input>
    <q-input v-model="datos.asistentes" type="textarea" float-label="Asistentes de investigacion"></q-input>
    <q-input v-model="datos.becarios" type="textarea" float-label="Becarios de investigacion"></q-input>
    <q-select
      v-model="datos.unidadAcademica"
      placeholder="Unidad academica patrocinante:"
      :options="unidadesAcademicas"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'identificacion-proyecto',
  mounted () {
    this.cargarTodas()
  },
  data () {
    return {
      unidadesAcademicas: [
        {
          id: '1',
          nombre: 'FACEA',
          value: '1',
          label: 'FACEA'
        },
        {
          id: '2',
          nombre: 'FHECIS',
          value: '2',
          label: 'FHECIS'
        },
        {
          id: '3',
          nombre: 'FCS',
          value: '3',
          label: 'FCS'
        },
        {
          id: '4',
          nombre: 'Teologia',
          value: '4',
          label: 'Teologia'
        }
      ],
      datos: {
        idModalidad: undefined,
        director_id: undefined,
        codirector_id: undefined,
        otros_miembros_uap: undefined,
        otros_miembros: undefined,
        asistentes: undefined,
        becarios: undefined,
        unidadAcademica: undefined
      }
    }
  },
  computed: {
    modalidades () {
      return this.$store.getters['modalidades/modalidades'].map(({id, nombre}) => ({label: nombre, value: id}))
    }
  },
  methods: {
    ...mapActions('modalidades', ['cargarTodas'])
  }
}
</script>
