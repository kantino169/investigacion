<template>
  <div class="row-full-width">
    <q-btn class="q-ma-sm" label="Agregar" icon="create" @click="agregar"></q-btn>
    <q-list>
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
              <q-btn color="orange" title="Editar" icon="edit" @click="editar(usuario)"/>
              <q-btn color="red" title="Eliminar" icon="delete" @click="borrar(usuario)"/>
            </q-btn-group>
          </div>
        </q-item-main>
      </q-item>
    </q-list>
    <nuevo-usuario ref="form"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FormDialog from '../../components/FormDialog'

export default {
  components: {FormDialog},
  mounted () {
    this.cargarTodos()
  },
  computed: {
    usuarios () {
      return this.$store.getters['listaUsuario/usuarios']
    }
  },
  methods: {
    ...mapActions('listaUsuario', ['cargarTodos']),
    async agregar () {
      try {
        const datos = await this.$refs.form.getData({
          title: 'Nuevo Usuario',
          form: {
            name: {label: 'Nombre'},
            password: {label: 'Password', type: 'password'},
            email: {label: 'Email'}
          }
        })
        console.log(datos)
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
