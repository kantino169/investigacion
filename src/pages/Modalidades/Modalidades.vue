<template>
  <div>
    <q-page padding class="q-mx-md column">
      <div>
        <q-btn
        class="q-md"
        color="primary"
        label="Agregar modalidad"
        @click="agregar"
        v-if="isAdmin"
        />
      </div>
      <div>
        <q-list hightlight separator>
          <q-list-header>Modalidades de Investigación</q-list-header>
          <q-item v-for="modalidad in modalidades" :key="modalidad.id">
            <q-item-side>{{modalidad.id}}</q-item-side>
            <q-item-main
              :label="modalidad.nombre"/>
            <q-item-side>
              <div>
                <q-btn-group v-if="isAdmin">
                  <q-btn class="q-md" color="orange" @click="editar(modalidad)" label="Editar" title="Editar" icon="edit" />
                  <q-btn class="q-md" color="red" @click="borrar(modalidad)" label="Eliminar" title="Eliminar" icon="delete"/>
                </q-btn-group>
              </div>
            </q-item-side>
          </q-item>
        </q-list>
      </div>
    </q-page>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  mounted () {
    this.cargarTodas()
  },
  computed: {
    modalidades () {
      return this.$store.getters['modalidades/modalidades']
    },
    ...mapGetters('usuario', ['isAdmin'])
  },
  methods: {
    ...mapActions('modalidades', ['cargarTodas', 'crear', 'modificar', 'eliminar']),
    async agregar () {
      try {
        const nombre = await this.$q.dialog({
          title: 'Agregar modalidad',
          message: 'Modalidad:',
          prompt: {
            model: '',
            type: 'text'
          }
        })
        await this.crear({nombre})
      } catch (error) {
      }
    },
    async editar ({id, nombre: nombreAnterior}) {
      try {
        const nombre = await this.$q.dialog({
          title: 'Modificar modalidad',
          message: 'Modalidad:',
          prompt: {
            model: nombreAnterior,
            type: 'text'
          }
        })
        await this.modificar({id, nombre})
      } catch (error) {
      }
    },
    async borrar (modalidad) {
      try {
        await this.$q.dialog({
          title: 'Eliminar modalidad',
          message: `Desea eliminar la modalidad ${modalidad.nombre}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        await this.eliminar(modalidad)
      } catch (error) {
      }
    }
  }
}

</script>
