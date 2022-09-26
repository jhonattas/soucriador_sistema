<template>
  <div class="categoryDetailsPage">
    <main-navigation-top></main-navigation-top>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  name: 'categoryDetailsPage',
  data () {
    return {
    }
  },
  components: {
  },
  beforeCreate: function () {
    if (!this.$store.state.isLogged) {
      this.$router.push({name: 'login'})
    }
  },
  methods: {
    logout: function () {
      this.$session.destroy()
      this.$store.commit('LOGOUT_USER')
      this.$router.push({name: 'login'})
    }
  },
  mounted: function () {
    if (process.env.NODE_ENV === 'development') {
      console.log('logged? ' + this.$store.state.isLogged)
    }
  }
}
</script>
