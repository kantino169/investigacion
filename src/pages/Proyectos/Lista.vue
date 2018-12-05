<template>
  <div class="row-full-width">
    <q-btn class="q-ma-sm" label="Agregar" icon="create" @click="$emit('add')">Agregar</q-btn>
    <q-list>
      <q-list-header>Proyectos</q-list-header>
      <q-item highlight v-for="proyecto in proyectos" :key="proyecto.id" class="row">
        <q-item-main class="row">
          <div class="col-3">
            {{proyecto.titulo}}
          </div>
          <div class="col-3">
            {{proyecto.director}}
          </div>
          <div class="col-3">
            {{proyecto.modalidad}}
          </div>
          <div class="col-3">
            <q-btn-group class="q-ml-md">
              <q-btn color="orange" title="Editar" icon="edit" @click="$emit('edit', element)"/>
              <q-btn color="red" title="Eliminar" icon="delete" @click="$emit('remove', element)"/>
            </q-btn-group>
          </div>
        </q-item-main>
      </q-item>
    </q-list>
    <form-dialog ref="form"/>
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
    proyectos () {
      return this.$store.getters['listaUsuario/usuarios']
    }
  },
  methods: {
    ...mapActions('proyecto', ['cargarTodos', 'crear', 'modificar', 'eliminar']),
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
        await this.crear(datos)
      } catch (error) {
      }
    },
    async editar (proyecto) {
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
        await this.modificar({id, ...datos})
      } catch (error) {
      }
    },
    async borrar ({id, titulo}) {
      try {
        await this.$q.dialog({
          message: `¿Desea eliminar el proyecto ${titulo}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        this.eliminar({id})
      } catch (error) {
      }
    }
  },
}
</script>
