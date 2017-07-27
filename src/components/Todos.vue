<template>
  <div>
    <form @submit.prevent>
      <input v-model="input" class="full-width" @keyup.enter="agregar">
    </form>
    <ul>
      <li v-for="(todo, index) in ajustada" :key="todo.text">
        {{todo.text}}
        <i @click="cambiar(index)">{{todo.icon}}</i>
        <i @click="eliminar(index)">delete</i>
      </li>
    </ul>
    <button class="primary" @click="eliminarCompletos">Eliminar completos</button>
    <button class="red" @click="completar">Completar incompletos</button>
  </div>
</template>

<style scoped>
  i {
    cursor: pointer;
  }

  i:hover {
    color: #888;
  }
</style>

<script>
export default {
  data: () => ({
    input: '',
    lista: [{
      text: 'Kevin se la come',
      done: true
    }, {
      text: 'Adrian manco',
      done: false
    }]
  }),

  computed: {
    ajustada () {
      return this.lista.map(({text, done}) => ({text, done, icon: done ? 'check_box' : 'crop_square'}))
    }
  },

  methods: {
    agregar (e) {
      this.lista.push({text: this.input, done: false})
      this.input = ''
    },
    eliminar (index) {
      if (index > -1) {
        this.lista.splice(index, 1)
      }
    },
    cambiar (index) {
      this.lista[index].done = !this.lista[index].done
    },
    eliminarCompletos (index) {
      this.lista = this.lista.filter(({done}) => !done)
    },
    completar () {
      const todosCompletos = this.lista.every(todo => todo.done)
      for (let todo of this.lista) {
        todo.done = !todosCompletos
      }
    }
  }
}
</script>
