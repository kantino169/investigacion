<template>
  <div>
    <div class="list">
      <div class="item item-link"
        v-for="proyecto in proyectos"
        :key="proyecto.id"
        v-link="proyecto.link">
        <div class="item-content">{{proyecto.link}}</div>
      </div>
    </div>
  </div>
</template>

<script>
const proyectos = [
  {id: '1', link: '/proyectos/informacionProyecto'}
]

export default {
  data: () => ({proyectos})
}
</script>
