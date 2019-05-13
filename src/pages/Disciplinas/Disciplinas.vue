<template>
  <div>
    <q-page padding class="q-mx-md column">
      <q-btn-group v-if="isAdmin">
        <q-btn
        class="q-ma-sm"
        color="primary"
        label="Agregar disciplina"
        @click="agregar"
        v-if="isAdmin"
        />
        <q-btn class="q-ma-sm" color="orange" :disabled="!selected" @click="editar(selected)" label="Editar" title="Editar" icon="edit" />
        <q-btn class="q-ma-sm" color="red" :disabled="!selected" @click="borrar(selected)" label="Eliminar" title="Eliminar" icon="delete"/>
      </q-btn-group>
      <div>
        <tabla-disciplinas :disciplinas="disciplinas" :selected.sync="selected"/>
      </div>
    </q-page>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TablaDisciplinas from 'components/Disciplinas/TablaDisciplinas'

export default {
  components: { TablaDisciplinas },
  data: () => ({selected: undefined}),
  mounted () {
    this.cargarTodas()
  },
  computed: {
    disciplinas () {
      return this.$store.getters['disciplina/disciplinas']
    },
    ...mapGetters('usuario', ['isAdmin'])
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
        this.selected = undefined // sirve para volver a definir el selected y que se apliquen los disable de los botones
      } catch (error) {
      }
    }
  }
}

</script>
