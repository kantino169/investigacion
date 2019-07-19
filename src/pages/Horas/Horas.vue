<template>
  <q-page padding>
    <q-btn
      class="q-md"
      color="primary"
      label="Agregar Item"
      @click="agregar(1)" />
    <q-btn color="" :disabled="!selected1" flat round icon="edit" @click="editar(selected1)" />
    <q-btn color="negative" :disabled="!selected1" flat round delete icon="delete" @click="borrar(selected1)" />
    <tabla-horas :horas="horasBecarios1" :selected.sync="selected1"/>
    <br>
    <q-btn
      class="q-md"
      color="primary"
      label="Agregar Item"
      @click="agregar(2)" />
    <q-btn color="" :disabled="!selected2" flat round icon="edit" @click="editar(selected2)" />
    <q-btn color="negative" :disabled="!selected2" flat round delete icon="delete" @click="borrar(selected2)" />
    <tabla-horas :horas="horasBecarios2" :selected.sync="selected2"/>
    <br>
    <q-btn
      class="q-md"
      color="primary"
      label="Agregar Item"
      @click="agregar(3)" />
    <q-btn color="" :disabled="!selected3" flat round icon="edit" @click="editar(selected3)" />
    <q-btn color="negative" :disabled="!selected3" flat round delete icon="delete" @click="borrar(selected3)" />
    <tabla-horas :horas="horasBecarios3" :selected.sync="selected3"/>
    <br>
    <q-btn
      class="q-md"
      color="primary"
      label="Agregar Item"
      @click="agregar(4)" />
    <q-btn color="" :disabled="!selected4" flat round icon="edit" @click="editar(selected4)" />
    <q-btn color="negative" :disabled="!selected4" flat round delete icon="delete" @click="borrar(selected4)" />
    <tabla-horas :horas="horasBecarios4" :selected.sync="selected4"/>
    <div class="q-mt-lg" align="center">
      <q-checkbox class="q-mx-sm" label="Becario" v-model="datos.firmaBecario"/>
      <q-checkbox class="q-mx-sm" label="Director Proyecto" v-model="datos.firmaResponsable"/>
      <q-checkbox class="q-mx-sm" label="SecYT" v-model="datos.firma"/>
    </div>
    <div align="center">
      <q-btn class="q-mt-lg" icon="keyboard_backspace" label="ATRAS" @click="$router.push({name: 'Planillas', params: {idProyecto: proyecto.id}})"></q-btn>
      <q-btn class="q-mt-lg q-ml-md" label="Enviar"/>
      <q-collapsible icon="help_outline" label="Información" style="max-width: 350px">
        <div>
          Para enviar la planilla se deben completar el total de horas y marcar la firma.
        </div>
      </q-collapsible>
    </div>
    <form-dialog ref="form" />
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TablaHoras from 'components/Horas/TablaHoras'
import FormDialog from 'components/FormDialog'

export default {
  name: 'Horas',
  components: { TablaHoras, FormDialog },
  data () {
    return {
      selected1: undefined,
      selected2: undefined,
      selected3: undefined,
      selected4: undefined,
      datos: {
        firmaBecario: false,
        firmaResponsable: false,
        firma: false
      }
    }
  },
  async mounted () {
    await this.$store.dispatch('proyecto/cargarTodos')
    await this.$store.dispatch('planillas/cargarTodas', this.proyecto.id)
    this.cargarTodas(this.planilla.id)
  },
  computed: {
    ...mapGetters('horas', ['horasBecarios']),
    planillas () {
      return this.$store.getters['planillas/planillas']
    },
    planilla () {
      return this.planillas.find(planilla => planilla.id === this.$route.params.idPlanilla)
    },
    proyectos () {
      return this.$store.getters['proyecto/proyectos']
    },
    proyecto () {
      return this.proyectos.find(proyecto => proyecto.id === this.$route.params.idProyecto)
    },
    horasBecarios1 () {
      return this.horasBecarios.filter(hora => hora.semana === 1)
    },
    horasBecarios2 () {
      return this.horasBecarios.filter(hora => hora.semana === 2)
    },
    horasBecarios3 () {
      return this.horasBecarios.filter(hora => hora.semana === 3)
    },
    horasBecarios4 () {
      return this.horasBecarios.filter(hora => hora.semana === 4)
    }
  },
  methods: {
    ...mapActions('horas', ['cargarTodas', 'crear', 'modificar', 'eliminar']),

    async agregar (semana) {
      try {
        const datos = await this.$refs.form.getData({
          title: 'Nuevo',
          form: {
            fecha: {label: 'Fecha'},
            // Ver como hacer el select, la idea es que se clickee como vi en el ejemplo de la tabla
            lugarActividad: {label: 'Lugar y Actividad realizada'},
            horario: {label: 'Horario'},
            hrs: {label: 'Horas'}
          }
        })
        await this.crear({...datos, semana, idPlanilla: this.planilla.id})
      } catch (error) {
      }
    } /* ,
    async editar (act) {
      try {
        const id = act.id
        const {actividad, primers, segundos} = await this.$refs.form.getData({
          title: 'Modificar actividad',
          form: {
            actividad: {label: 'Actividad'},
            primers: {label: 'Primer Semestre', type: 'check', model: true},
            segundos: {label: 'Segundo Semestre', type: 'check', model: true}
          }
        })
        await this.modificar({id, actividad, primers, segundos})
      } catch (error) {
      }
    },
    async borrar (disciplina) {
      try {
        await this.$q.dialog({
          title: 'Eliminar disciplina',
          message: `Desea eliminar la disciplina ${disciplina.nombre}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        await this.eliminar(disciplina)
      } catch (error) {
      }
    } */
  }
}
</script>

<style>
</style>
