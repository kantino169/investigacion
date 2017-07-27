export default {
  mounted () {
    if (!this.$store.state.user) {
      this.$router.replace('/')
    }
  }
}
