<template>
  <q-page padding>
    <div class="row-full-width">
      <div class="row">
        <div class="col-8">
          <q-btn align="right" class="q-ma-sm" label="Sincronizar AD" icon="cached" @click="agregar"></q-btn>
          <q-btn class="q-ma-sm" label="Cambiar Tipo de Usuario" icon="group_add" @click="modificarPrivilegio(selected.id)"></q-btn>
          <q-btn class="q-ma-sm" label="Asignar Facultad" @click="asignarFacultad(selected)"></q-btn>
        </div>
        <div class="col-4">
          <q-select
          class="q-ma-sm"
            v-model="filterSelect"
            :options="selectOptions"
          />
        </div>
      </div>
      <tabla-usuarios :usuarios="usuarios" :selected.sync="selected" :filterSelect="filterSelect"/>
      <form-dialog ref="form"/>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FormDialog from '../../components/FormDialog'
import { Notify } from 'quasar'
import TablaUsuarios from 'components/Users/TablaUsuarios'

export default {
  components: {FormDialog, TablaUsuarios},
  mounted () {
    this.cargarTodos()
  },
  data () {
    return {
      selected: undefined,
      filterSelect: 1,
      selectOptions: [
        { label: 'Todos', value: 1 },
        { label: 'Alumnos', value: 2 },
        { label: 'Profesores', value: 3 },
        { label: 'Decanos/Secretarios', value: 4 },
        { label: 'Administradores', value: 5 }
      ]
    }
  },
  computed: {
    usuarios () {
      return this.$store.getters['listaUsuario/usuarios']
    },
    ...mapGetters('usuario', ['isAdmin'])
  },
  methods: {
    ...mapActions('listaUsuario', ['cargarTodos', 'crear', 'modificar', 'eliminar', 'insertarUsuarios', 'darPrivilegios', 'darFacultad']),
    async asignarFacultad ({id}) {
      try {
        this.$q.dialog({
          title: 'Facultad',
          message: 'Seleccione la facultad',
          options: {
            type: 'radio',
            model: 1,
            items: [
              { label: 'FCS', value: 1 },
              { label: 'FHECIS', value: 2 },
              { label: 'FACEA', value: 3 },
              { label: 'TEOLOGIA', value: 4 }
            ]
          },
          cancel: 'Cancelar',
          ok: 'Aceptar'
        }).then(data => {
          this.darFacultad({id, idFacultad: data}).then(() => {
            Notify.create({
              type: 'positive',
              message: 'Usuario actualizado'
            })
          })
        }).catch(() => {
          Notify.create({
            type: 'negative',
            message: 'Se canceló la operación'
          })
        })
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'No se pudo realizar el cambio'
        })
      }
    },
    async modificarPrivilegio (id) {
      try {
        this.$q.dialog({
          title: 'Tipo de Usuario',
          message: 'Seleccione el tipo de usuario que desea asignar',
          options: {
            type: 'radio',
            model: 0,
            items: [
              { label: 'Alumno', value: 0 },
              { label: 'Profesor', value: 1 },
              { label: 'Decano, Secretario Investigación', value: 2 },
              { label: 'Administrador del Sistema', value: 3 }
            ]
          },
          cancel: 'Cancelar',
          ok: 'Aceptar'
        }).then(data => {
          this.darPrivilegios({id, tipoUsuario: data}).then(() => {
            Notify.create({
              type: 'positive',
              message: 'Usuario actualizado'
            })
          })
        }).catch(() => {
          Notify.create({
            type: 'negative',
            message: 'Se canceló la operación'
          })
        })
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'No se pudo realizar el cambio'
        })
      }
    },
    async agregar () {
      try {
        await this.insertarUsuarios().then(() => {
          Notify.create({
            type: 'positive',
            message: 'Usuarios agregados con exito'
          })
        })
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Error al agregar usuarios'
        })
      }
    },
    async borrar ({id, nombre}) {
      try {
        await this.$q.dialog({
          message: `¿Desea eliminar el usuario ${nombre}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        await this.eliminar({id}).then(() => {
          Notify.create({
            type: 'positive',
            message: 'Usuario eliminado con exito'
          })
        })
      } catch (error) {
      }
    }
  }
}
</script>
