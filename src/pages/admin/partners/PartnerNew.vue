<template>
  <div class="sellerNewPage">
    <main-navigation-top></main-navigation-top>
    <div class="form-group insertForm">
      <span class="title">Cadastramento de novo conveniado</span><br/><br/>

      <div class="field">
        <label class="label">Nome Completo</label>
        <div class="control">
          <input
            class="form-control input" type="text" placeholder="nome completo do conveniado"
            v-model="fullName">
        </div>
      </div>

      <div class="field">
        <label class="label">CPF</label>
        <div class="control">
          <input
            class="form-control input" type="text" placeholder="documento de identificacao"
            v-model="cpf">
        </div>
      </div>

      <div class="field">
        <label class="label">email</label>
        <div class="control">
          <input
            class="form-control input" type="email"
            v-model="email">
        </div>
      </div>

      <div class="field">
        <label class="label">Telefone</label>
        <div class="control">
          <input
            class="form-control input" type="text"
            v-model="phone">
        </div>
      </div>

      <div class="field">
        <label class="label">Empresa Vinculo</label>
        <div class="control">
          <input
            class="form-control input" type="number"
            v-model="enterpriseID">
        </div>
      </div>

      <hr/>

      <div class="field is-grouped bottomButtons">
        <div class="control">
          <button
            class="btn btn-primary"
            @click="savePartner"
            >Salvar</button>

          <router-link
            class="btn btn-light"
            :to="{ name: 'admin_partners'}"
            >
            voltar
          </router-link>
        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<style scoped>
  .sellerNewPage {
    margin: 0 auto;
    min-height: 400px;
    background: #ffffff;
  }

  .insertForm{
    background:#fff;
    padding: 2em 0;
    max-width: 600px;
    margin: 40px auto 0;
  }

  .title {
    font-size: 2rem;
  }

  .bottomButtons {
    margin-top: 30px !important;
    margin-bottom: 30px !important;
  }
</style>

<script>
import ApiSoucriadorService from '@/services/ApiSoucriadorService'

export default {
  data () {
    return {
      enterpriseID: null,
      fullName: null,
      cpf: null,
      enterpriseID: null,
      email: null,
      phone: null,
      website: null
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
    async savePartner () {
      try {
        const response = await ApiSoucriadorService.createPartner({
          fullName: this.fullName,
          cpf: this.cpf,
          enterpriseID: this.enterpriseID,
          profilePicture: this.profilePicture,
          email: this.email,
          phone: this.phone
        }, localStorage.getItem('token'))
        if (response.status === 200) {
          this.$router.push({ name: 'admin_partners' })
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('Error', error.message)
        }
      }
    },
    logout: function () {
      try {
        this.$session.destroy()
        this.$store.commit('LOGOUT_USER')
      } finally {
        this.$router.push({name: 'login'})
      }
    }
  },
  mounted: function () {
    if (process.env.NODE_ENV === 'development') {
      console.log('logged? ' + this.$store.state.isLogged)
    }
  }
}
</script>
