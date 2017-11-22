<template>
  <div class="width-1of6">
    <ul id="menuProyecto">
      <li v-for="proyecto in proyectos" :key="proyecto.id">{{proyecto.nombre}}</li>
    </ul>
  </div>
</template>

<script>
const proyectos = [
  {nombre: 'A'}, {nombre: 'B'}
]

export default {
  data: () => ({ proyectos })
}
</script>
