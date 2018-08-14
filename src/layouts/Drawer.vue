<template>
  <q-layout-drawer
    v-model="leftDrawerOpen"
    content-class="bg-grey-2">
    <drawer-links />
  </q-layout-drawer>
</template>

<script>
import DrawerLinks from 'components/DrawerLinks'
export default {
  components: {DrawerLinks},
  props: {
    leftDrawerOpen: Boolean
  },
  methods: {
    openURL (url) {
      console.log(url)
    }
  }
}
</script>
