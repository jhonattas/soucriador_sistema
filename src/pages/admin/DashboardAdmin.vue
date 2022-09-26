<template>
  <div class="dashboardAdminPage">
    <main-navigation-top></main-navigation-top>
    <div class="itensBox">
      <div class="itensBox">

        <router-link
          class="btn btn-sq-lg btn-dark main-btn"
          :to="{ name: 'admin_partners' }">
          <i class="fa fa-users fa-2x"></i><br/>
          Conveniados
        </router-link>

        <router-link
          class="btn btn-sq-lg btn-dark main-btn"
          :to="{ name: 'admin_companies' }">
          <i class="fa fa-truck fa-2x"></i><br/>
          Equipamentos
        </router-link>

        <router-link
          class="btn btn-sq-lg btn-dark main-btn"
          :to="{ name: 'admin_categories' }">
          <i class="fa fa-tags fa-2x"></i><br/>
          Categorias
        </router-link>

        <router-link
          class="btn btn-sq-lg btn-dark main-btn"
          :to="{ name: 'admin_featured_images' }">
          <i class="fa fa-star fa-2x"></i><br/>
          Destaques
        </router-link>



        <router-link
          class="btn btn-sq-lg btn-dark main-btn"
          :to="{ name: 'admin_contacts' }">
          <i class="fa fa-phone fa-2x"></i><br/>
          Telefones
        </router-link>

        <hr/>
        <span class="title">Externo</span><br/><br/>
        <a
          class="btn btn-warning main-btn"
          target="_new"
          href="https://analytics.google.com/analytics/web">
          <i class="fa fa-line-chart fa-2x"></i><br/>
          Analytics</a>
        <a
          class="btn btn-warning main-btn"
          target="_new"
          href="https://www.google.com/webmasters/tools/home?hl=pt-BR">
          <i class="fa fa-search fa-2x"></i><br/>
          SearchConsole</a>
        <a
          class="btn btn-warning main-btn"
          target="_new"
          href="https://email.universalequipamento.com.br">
          <i class="fa fa-envelope fa-2x"></i><br/>
          Email</a>
        <hr/>

      </div>
    </div>
  </div>
</template>

<style scoped>
  .dashboardAdminPage {
    margin: 50px auto;
    padding: 1em;
    border-radius: 15px;
    min-height: 400px;
    background: #ffffff;
  }

  .itensBox {
  }

  .itensBox .button {
    margin: 0.2em;
    min-width: 130px !important;
    text-transform: uppercase;
  }

  .btn-danger {
    color: white !important;
  }

  .main-btn {
    min-width: 150px;
    margin-bottom: 5px;
  }
</style>

<script>
export default {
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
