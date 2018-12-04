<template>
  <div>
    <q-page padding class="q-mx-md column">
      <div>
        <q-btn
        class="q-md"
        color="primary"
        label="Agregar disciplina"
        @click="agregar"
        />
      </div>
      <div>
        <q-list hightlight separator>
          <q-list-header>Disciplinas de estudio</q-list-header>
          <q-item v-for="disciplina in disciplinas" :key="disciplina.id">
            <q-item-side>{{disciplina.id}}</q-item-side>
            <q-item-main
              :label="disciplina.nombre"/>
            <q-item-side>
              <div>
                <q-btn-group>
                  <q-btn class="q-md" color="orange" @click="editar(disciplina)" label="Editar" title="Editar" icon="edit" />
                  <q-btn class="q-md" color="red" @click="borrar(disciplina)" label="Eliminar" title="Eliminar" icon="delete"/>
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
import { mapActions } from 'vuex'

export default {
  mounted () {
    this.cargarTodas()
  },
  computed: {
    disciplinas () {
      return this.$store.getters['disciplina/disciplinas']
    }
  },
  methods: {
    ...mapActions('disciplina', ['cargarTodas', 'crear', 'modificar', 'eliminar']),
    async agregar () {
      try {
        const nombre = await this.$q.dialog({
          title: 'Agregar nueva disciplina',
          message: 'Nombre:',
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
          title: 'Modificar disciplina',
          message: 'Nombre:',
          prompt: {
            model: nombreAnterior,
            type: 'text'
          }
        })
        await this.modificar({id, nombre})
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
    }
  }
}

</script>
