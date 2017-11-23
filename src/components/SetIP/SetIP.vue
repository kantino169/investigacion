<template>
  <input type="text" v-model="url" @keyup.enter="send">
</template>

<script>
import {setInstance} from '../../api'

export default {
  data: () => ({
    url: ''
  }),
  methods: {
    send () {
      setInstance(this.url)
      this.$router.replace('/index')
    }
  }
}
</script>
