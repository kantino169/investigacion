<template>
  <q-page padding>
    <div class="row">
      <div class="col-8">
        <q-btn class="q-ma-sm" label="Agregar" to="/proyectos" icon="create" @click="$emit('add')"></q-btn>
        <q-btn class="q-ma-sm" :disabled="!selected" color="orange" label="Editar" icon="edit" @click="$emit('edit', element)"/>
        <q-btn class="q-ma-sm" :disabled="!selected" v-if="isAdmin" color="red" label="Eliminar" icon="delete" @click="borrar(proyecto)"/>
      </div>
      <div class="col" align="right">
        <q-btn class="q-ma-sm" :disabled="!selected" label="Ver" @click="details(selected.id)" icon="visibility"></q-btn>
      </div>
    </div>

      <!-- <q-list>
        <q-list-header>Proyectos</q-list-header>
        <q-item separator highlight v-for="proyecto in proyectos" :key="proyecto.id" class="row">
          <q-item-main class="row">
            <div class="col-4">
              {{proyecto.titulo}}
            </div>
            <div class="col-3">
              {{proyecto.director_id}}
            </div>
            <div class="col-4">
              {{proyecto.idModalidad | modalidad}}
            </div>
            <div class="col-4">
              <q-btn-group class="q-ml-md">
              </q-btn-group>
            </div>
          </q-item-main>
        </q-item>
      </q-list> -->
    <tabla-proyectos :proyectos="proyectos" :selected.sync="selected"/>
    <form-dialog ref="form"/>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FormDialog from '../../components/FormDialog'
import { Notify } from 'quasar'
import TablaProyectos from 'components/Proyecto/TablaProyectos'

export default {
  components: {FormDialog, TablaProyectos},
  data: () => ({selected: undefined}),
  mounted () {
    this.cargarTodos()
  },
  computed: {
    proyectos () {
      return this.$store.getters['proyecto/proyectos']
    },
    ...mapGetters('usuario', ['isAdmin'])
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
  methods: {
    ...mapActions('proyecto', ['cargarTodos', 'eliminar']),

    async details (idProyecto) {
      this.$router.push({name: 'MenuProyecto', params: {idProyecto}})
    },

    async borrar ({id, titulo}) {
      try {
        await this.$q.dialog({
          message: `¿Desea eliminar el proyecto ${titulo}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        await this.eliminar({id}).then(() => {
          Notify.create({
            type: 'positive',
            message: 'Proyecto eliminado con exito'
          })
        })
      } catch (error) {
      }
    }
  }
}
</script>
