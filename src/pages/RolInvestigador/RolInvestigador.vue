<template>
  <div>
    <q-page padding class="q-mx-md column">
      <div>
        <q-btn
        class="q-md"
        color="primary"
        label="Agregar rol"
        @click="agregar"
        v-if="isAdmin"
        />
      </div>
      <div>
        <q-list hightlight separator>
          <q-list-header>Roles de los investigadores</q-list-header>
          <q-item v-for="rol in roles" :key="rol.id">
            <q-item-side>{{rol.id}}</q-item-side>
            <q-item-main
              :label="rol.rol"/>
            <q-item-side>
              <div>
                <q-btn-group v-if="isAdmin">
                  <q-btn class="q-md" color="orange" @click="editar(rol)" label="Editar" title="Editar" icon="edit" />
                  <q-btn class="q-md" color="red" @click="borrar(rol)" label="Eliminar" title="Eliminar" icon="delete"/>
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
    roles () {
      return this.$store.getters['roles/roles']
    },
    ...mapGetters('usuario', ['isAdmin'])
  },
  methods: {
    ...mapActions('roles', ['cargarTodas', 'crear', 'modificar', 'eliminar']),
    async agregar () {
      try {
        const rol = await this.$q.dialog({
          title: 'Agregar nuevo rol',
          message: 'Rol:',
          prompt: {
            model: '',
            type: 'text'
          }
        })
        await this.crear({rol})
      } catch (error) {
      }
    },
    async editar ({id, rol: rolAnterior}) {
      try {
        const rol = await this.$q.dialog({
          title: 'Modificar rol',
          message: 'Rol:',
          prompt: {
            model: rolAnterior,
            type: 'text'
          }
        })
        await this.modificar({id, rol})
      } catch (error) {
      }
    },
    async borrar (rol) {
      try {
        await this.$q.dialog({
          title: 'Eliminar rol',
          message: `Desea eliminar el rol ${rol.rol}?`,
          ok: 'Aceptar',
          cancel: 'Cancelar'
        })
        await this.eliminar(rol)
      } catch (error) {
      }
    }
  }
}

</script>
