<template>
  <div class="row-full-width">
    <q-btn class="q-ma-sm" label="Agregar" to="/proyectos" icon="create" @click="$emit('add')"></q-btn>
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
      return this.$store.getters['proyecto/proyectos']
    }
  },
  methods: {
    ...mapActions('proyecto', ['cargarTodos', 'eliminar']),

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
  }
}
</script>
