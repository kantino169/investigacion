<template>
  <q-page padding>
    <q-modal maximized v-model="opened">
      <div class="layout-padding">
        <q-search v-model="datos.bec" placeholder="Seleccione Becario">
          <q-autocomplete :static-data="{field: 'username', label: 'username', list: alumnos}" @selected="selection"/>
        </q-search>
        <q-input v-model="datos.horasSemanales" type="number" float-label="Cantidad de horas semanales"/>
        <q-input v-model="datos.cantidadMeses" type="number" float-label="Cantidad de meses" />
        <q-select
          v-model="categoria"
          :options="selectOptions"
          float-label="Categoria"
        />
        <q-btn-group class="q-mt-xl">
          <q-btn
            color="red"
            @click="opened = false"
            label="Cancelar"
          />
          <q-btn
            color="secondary"
            @click="agregar(proyecto.id)"
            label="Agregar"
          />
        </q-btn-group>
      </div>
    </q-modal>
    <q-btn
      class="q-md"
      color="primary"
      label="Agregar Becario"
      @click="opened = true"
      :disabled="!(isAdmin || isDirector)" />
    <q-btn color="" :disabled="!selected" flat round icon="edit" @click="editar(selected)" />
    <q-btn color="negative" :disabled="!selected" flat round delete icon="delete" @click="borrar(selected)" />
    <q-btn color="primary" class="q-ml-xl" :disable="!(isAdmin && selected)" label="Aprobar" icon="" @click="aprobar(selected)" />
    <tabla-becarios :usuarios="usuarios" :becarios="becarios" :selected.sync="selected" />
    <q-btn class="q-mt-lg" icon="keyboard_backspace" label="ATRAS" @click="$router.push({name: 'MenuProyecto', params: {idProyecto: proyecto.id}})"></q-btn>
    <form-dialog ref="form" />
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TablaBecarios from 'components/Users/TablaBecarios'
import FormDialog from 'components/FormDialog'
import { Notify } from 'quasar'
// import { filter } from 'quasar'

export default {
  name: 'Becarios',
  components: { TablaBecarios, FormDialog },
  async mounted () {
    await this.$store.dispatch('proyecto/cargarTodos')
    await this.$store.dispatch('listaUsuario/cargarTodos')
    this.cargarTodos(this.proyecto.id)
  },
  data () {
    return {
      datos: {
        bec: undefined,
        cantidadMeses: undefined,
        horasSemanales: undefined
      },
      selected: undefined,
      opened: false,
      categoria: undefined,
      selectOptions: [
        {
          label: 'Categoria 1',
          value: 1
        },
        {
          label: 'Categoria 2',
          value: 2
        }
      ]
    }
  },
  computed: {
    ...mapGetters('usuario', ['isAdmin', 'isDirector']),
    ...mapGetters('becario', ['becarios']),
    usuarios () {
      return this.$store.getters['listaUsuario/usuarios']
    },
    alumnos () {
      return this.usuarios.filter(usuario => usuario.tipoUsuario === 0)
    },
    proyectos () {
      return this.$store.getters['proyecto/proyectos']
    },
    proyecto () {
      return this.proyectos.find(proyecto => proyecto.id === this.$route.params.idProyecto)
    }
  },
  methods: {
    ...mapActions('becario', ['cargarTodos', 'crear', 'modificar', 'eliminar', 'aprobacion']),

    /* search (becario, done) {
      setTimeout(() => {
        done(filter(becario, {field: 'username', list: this.alumnos}))
      }, 1000)
    }, */
    selection (item) {
      this.$q.notify(`Seleccionado "${item.username}"`)
    },
    async agregar (idProyecto) {
      try {
        await this.crear({idProyecto, ...this.datos, idCategoria: this.categoria, idRolInvestigador: 5})
        Notify.create({
          type: 'positive',
          message: 'Becario agregado'
        })
        this.opened = false
      } catch (error) {
      }
    },
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
    async aprobar (becario) {
      try {
        await this.$q.dialog({
          title: 'Aprobar Becario',
          message: `Confirmar la aprobacion del becario`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        await this.aprobacion(becario)
      } catch (error) {
      }
    },
    async borrar (act) {
      try {
        await this.$q.dialog({
          title: 'Eliminar becario',
          message: `Desea eliminar el becario?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        await this.eliminar(act)
        this.selected = undefined
      } catch (error) {
      }
    }
  }
}
</script>

<style>
</style>
