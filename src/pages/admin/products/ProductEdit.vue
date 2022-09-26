<template>
  <div class="productEditPage">
    <main-navigation></main-navigation>
    <div class="insertForm form-group">
      <span class="title">Edição de Equipamento</span><br/><br/>
      <div class="field">
        <label class="label">Marca</label>
        <div class="control">
          <input
            class="form-control input" type="text" placeholder="Fabricante do equipamento"
            v-model="brand">
        </div>
      </div>

      <div class="field">
        <label class="label">Modelo</label>
        <div class="control">
          <input
            class="form-control input" type="text" placeholder="Modelo do equipamento"
            v-model="model">
        </div>
      </div>

      <div class="field">
        <label class="label">Valor</label>
        <div class="control">
          <input
            class="form-control input" type="text" placeholder="Valor de venda final"
            v-model="amount">
        </div>
      </div>

      <div class="field">
        <label class="label">Localização</label>
        <div class="control">
          <input
            class="form-control input" type="text" placeholder="Localização do equipamento"
            v-model="location">
        </div>
      </div>

      <div class="field">
        <label class="label">Ano</label>
        <div class="control">
          <input
            class="form-control input" type="text" placeholder="Ano de fabricação (Exemplo: 2012 / 2012)"
            v-model="manufacturing">
        </div>
      </div>

      <div class="field">
        <label class="label">Observações</label>
        <div class="control">
          <textarea
            class="form-control textarea" type="text" placeholder="Detalhes do produto"
            v-model="obs"></textarea>
        </div>
      </div>

      <div class="field">
        <label class="label">Destacar</label>
        <div class="control">
          <label class="radio">
            <input type="radio" name="featured">
            Sim
          </label>
          <label class="radio">
            <input type="radio" name="featured">
            Não
          </label>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button
            class="btn btn-primary"
            v-on:click="enviaDados"
            >Salvar</button>

          <router-link
            class="btn btn-light"
            :to="{ name: 'admin_product_details', params: { id: product.id }}"
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
  .productEditPage {
    margin: 0 auto;
    border-radius: 15px;
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

var product = null

export default {
  data () {
    return {
      product,
      brand: null,
      model: null,
      amount: null,
      location: null,
      manufacturing: null,
      obs: null
    }
  },
  components: {
  },
  beforeCreate: function () {
    if (!this.$store.state.isLogged) {
      this.$router.push({name: 'login'})
    }
    this.productId = this.$route.params.id
  },
  methods: {
    fetchProductData: function () {
      this.$http.get(process.env.API_URL + 'product/' + this.productId,
        {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        }, localStorage.getItem('token')).then(response => {
          var productJson = JSON.parse(JSON.stringify(response.body))
          this.product = productJson['product']
          this.populateData()
        })
    },
    async enviaDados () {
      try {
        const response = await ApiSoucriadorService.updateProduct({
          brand: this.brand,
          model: this.model,
          amount: this.amount,
          location: this.location,
          manufacturing: this.manufacturing,
          obs: this.obs
        },
        localStorage.getItem('token'),
        this.$route.params.id)
        if (response.status === 200) {
          this.$router.push({ name: 'admin_product_details', params: { id: this.productId } })
        }
      } catch (error) {
        if (error.response) {
          if (process.env.NODE_ENV === 'development') {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          }
        } else if (error.request) {
          if (process.env.NODE_ENV === 'development') {
            console.log(error.request)
          }
        } else {
          if (process.env.NODE_ENV === 'development') {
            console.log('Error', error.message)
          }
        }
      }
    },
    populateData: function () {
      this.brand = this.product.brand
      this.model = this.product.model
      this.amount = this.product.amount
      this.location = this.product.location
      this.manufacturing = this.product.manufacturing
      this.obs = this.product.obs
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
    this.fetchProductData()
  }
}
</script>
