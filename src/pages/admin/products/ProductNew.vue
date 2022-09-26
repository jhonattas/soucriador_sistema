<template>
  <div class="productNewPage">
    <main-navigation-top></main-navigation-top>
    <div class="form-group insertForm">
      <span class="title">Novo Conveniado</span><br/><br/>
      <div class="field">
        <label class="label">Nome Completo</label>
        <div class="control">
          <input
            class="form-control input" type="text" placeholder="Nome Completo"
            v-model="fullname">
        </div>
      </div>

      <div class="field">
        <label class="label">CPF</label>
        <div class="control">
          <input
            class="form-control input" type="text" placeholder="CPF"
            v-model="cpf">
        </div>
      </div>

      <div class="field">
        <label class="label">Empresa</label>
        <div class="control">
          <input
            class="form-control input" type="text" placeholder="Empresa"
            v-model="company">
        </div>
      </div>
      <br/>

      <div class="field is-grouped">
        <div class="control">
          <button
            class="btn btn-primary"
            @click="saveProduct"
            >Salvar</button>

          <router-link
            class="btn btn-light"
            :to="{ name: 'admin_products'}"
            >
            cancelar
          </router-link>
        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<style scoped>
  .productNewPage {
    margin: 0 auto;
    min-height: 400px;
    background: #ffffff;
  }

  .insertForm{
    background:#fff;
    padding: 2em 0;
    max-width: 600px;
    margin: 0 auto;
  }
</style>

<script>
import ApiSoucriadorService from '@/services/ApiSoucriadorService'

export default {
  data () {
    return {
      model: null,
      brand: null,
      amount: null,
      location: null,
      manufacturing: null,
      featured: null,
      product_category: null,
      obs: null,
      status: null,
      active: null
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
    async saveProduct () {
      try {
        const response = await ApiSoucriadorService.createProduct({
          model: this.model,
          brand: this.brand,
          amount: this.amount,
          location: this.location,
          manufacturing: this.manufacturing,
          featured: this.featured,
          obs: this.obs,
          status: 1,
          active: 1
        }, localStorage.getItem('token'))
        if (response.status === 200) {
          this.$router.push({ name: 'admin_products' })
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
