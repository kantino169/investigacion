<template>
  <div>
    <q-btn color="primary" @click="$emit('add')">Agregar</q-btn>

    <q-list hightlight separator>
      <q-item v-if="!elements.length">
        <slot />
      </q-item>
      <q-item v-for="element in elements" :key="element.id">
        <q-item-main
          :label="element.nombre"/>
        <q-item-side>
          <q-btn-group>
            <q-btn color="green" title="Seleccionar" icon="check_circle" @click="$emit('set', element)"/>
            <q-btn color="orange" title="Editar" icon="edit" @click="$emit('edit', element)"/>
            <q-btn color="red" title="Eliminar" icon="delete" @click="$emit('remove', element)"/>
          </q-btn-group>
        </q-item-side>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  props: {
    elements: Array
  }
}
</script>
