<template>
  <div class="productEditPage">
    <main-navigation></main-navigation>
    <div class="insertForm form-group">
      <span class="title">Edição de Imagem Destaque</span><br/><br/>
      <div class="field">
        <label class="label">Link do Produto</label>
        <div class="control">
          <input
            class="form-control input" type="text" placeholder="Fabricante do equipamento"
            v-model="product_url">
        </div>
      </div>

      <div class="field">
        <label class="label">Descricao</label>
        <div class="control">
          <input
            class="form-control input" type="text" placeholder="Modelo do equipamento"
            v-model="description">
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
            :to="{ name: 'admin_featured_images' }"
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
      product_url: null,
      description: null
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
      this.$http.get(process.env.API_URL + 'featured_image/' + this.productId,
        {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        }, localStorage.getItem('token'))
        .then(response => {
          var productJson = JSON.parse(JSON.stringify(response.body))
          this.product = productJson['featured_image']
          this.populateData()
        })
        .catch(error => {
          console.log(error)
        })
    },
    async enviaDados () {
      try {
        const response = await ApiSoucriadorService.updateFeaturedImage({
          product_url: this.product_url,
          description: this.description
        },
        localStorage.getItem('token'),
        this.$route.params.id)
        if (response.status === 200) {
          this.$router.push({ name: 'admin_featured_images' })
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
      this.product_id = this.product.product_id
      this.description = this.product.description
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
