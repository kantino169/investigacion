<template>
  <div class="row">
    <q-btn
    size="lg"
    color="primary"
    v-for="button in buttons"
    :key="button.id"
    :to="button.link"
    :label="button.title"
    />
  </div>
</template>

<script>
const buttons = [
  {id: '1', title: 'Proyectos', link: '/proyectos'}, {id: '2', title: 'Usuarios', link: '/usuarios'}
]

export default {
  data: () => ({ buttons })
}
</script>
