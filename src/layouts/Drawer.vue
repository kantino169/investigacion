<template>
  <q-layout-drawer
    v-model="open"
    content-class="bg-grey-2">
    <drawer-links @login="login" @logout="cerrarSesion" />
    <login-dialog ref="login"/>
  </q-layout-drawer>
</template>

<script>
import { mapActions } from 'vuex'
import DrawerLinks from 'components/DrawerLinks'
import LoginDialog from 'components/Login/LoginDialog'

export default {
  components: {DrawerLinks, LoginDialog},
  props: {
    value: Boolean
  },
  computed: {
    open: {
      get () { return this.value },
      set (val) { this.$emit('input', val) }
    }
  },
  methods: {
    ...mapActions('usuario', ['iniciarSesion', 'cerrarSesion']),
    async login () {
      try {
        const {email, password} = await this.$refs.login.getLoginData()
        await this.iniciarSesion({email, password})
      } catch (error) {}
    }
  }
}
</script>
