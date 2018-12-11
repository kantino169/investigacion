<template>
  <div class="row-full-width">
    <q-btn class="q-ma-sm" label="Agregar" icon="create" @click="agregar"></q-btn>
    <q-list v-if="isAdmin">
      <q-list-header>Usuarios</q-list-header>
      <q-item highlight v-for="usuario in usuarios" :key="usuario.id" class="row">
        <q-item-main class="row">
          <div class="col-3">
            {{usuario.nombre}}
          </div>
          <div class="col-3">
            {{usuario.email}}
          </div>
          <div class="col-3">
            {{usuario.tipoUsuario | tipoDeUsuario}}
          </div>
          <div class="col-3">
            <q-btn-group class="q-ml-md">
              <q-btn v-if="isAdmin" color="orange" title="Editar" icon="edit" @click="editar(usuario)"/>
              <q-btn v-if="isAdmin" color="red" title="Eliminar" icon="delete" @click="borrar(usuario)"/>
            </q-btn-group>
          </div>
        </q-item-main>
      </q-item>
    </q-list>
    <form-dialog ref="form"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FormDialog from '../../components/FormDialog'
import { Notify } from 'quasar'

export default {
  components: {FormDialog},
  mounted () {
    this.cargarTodos()
  },
  computed: {
    usuarios () {
      return this.$store.getters['listaUsuario/usuarios']
    },
    ...mapGetters('usuario', ['isAdmin'])
  },
  methods: {
    ...mapActions('listaUsuario', ['cargarTodos', 'crear', 'modificar', 'eliminar']),
    async agregar () {
      try {
        const datos = await this.$refs.form.getData({
          title: 'Nuevo Usuario',
          form: {
            name: {label: 'Nombre'},
            password: {label: 'Contraseña', type: 'password'},
            email: {label: 'Email'}
          }
        })
        await this.crear(datos).then(() => {
          Notify.create({
            type: 'positive',
            message: 'Usuario creado con exito'
          })
        })
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Error al crear un usuario'
        })
      }
    },
    async editar (usuario) {
      try {
        const id = usuario.id
        const datos = await this.$refs.form.getData({
          title: 'Modificar usuario',
          form: {
            name: {label: 'Nombre', model: usuario.nombre},
            email: {label: 'Email', model: usuario.email}
            // password: {label: 'Lugar de Trabajo', model: evaluador.lugarTrabajo}
          }
        })
        await this.modificar({id, ...datos}).then(() => {
          Notify.create({
            type: 'positive',
            message: 'Usuario modificado con exito'
          })
        })
      } catch (error) {
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
  },
  filters: {
    tipoDeUsuario (tipoUsuario) {
      switch (tipoUsuario) {
        case 0: return 'Alumno'
        case 1: return 'Profesor'
        case 2: return 'Administrador'
      }
    }
  }
}
</script>
