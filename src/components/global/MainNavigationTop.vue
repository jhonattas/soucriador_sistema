<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container">
      <router-link :to="{ name: 'index' }" class="navbar-brand">
        <img
          src="../../assets/logo.png"
          width="30" height="30"
          class="d-inline-block align-top" alt=""
        /> Sou Criador
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <!-- <li
            v-if="(logged)"
            class="nav-item">
            <router-link
              :to="{ name: 'admin_dashboard'}"
              class="nav-link">
              Admin
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'product_list' }"
              class="nav-link">
              Catalogo
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'advertise_here' }"
              class="nav-link">
              Anuncie
            </router-link>
          </li>
          -->
          <li class="nav-item" v-if="logged">
            <a
            class="nav-link"
            @click="logout">Sair</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
var logged = false

export default {
  data: () => {
    return {
      logged
    }
  },
  methods: {
    logout: function () {
      this.$store.commit('LOGOUT_USER')
      this.$router.push({name: 'login'})
    }
  },
  mounted: function () {
    this.logged = this.$store.state.isLogged
  }
}
</script>

<style scoped>
</style>
