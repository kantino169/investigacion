export default {
  data: () => ({
    isOpen: false,
    resolve: undefined,
    reject: undefined
  }),
  watch: {
    isOpen (value) {
      if (!value && typeof this.reject === 'function') this.reject()
    }
  },
  methods: {
    open () {
      this.isOpen = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    close () {
      this.isOpen = false
    }
  }
}
