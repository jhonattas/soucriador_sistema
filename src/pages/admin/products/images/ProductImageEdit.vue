<template>
  <div class="productImageEditPage" v-if="productImage">
    <main-navigation-top></main-navigation-top>
    <span class="title">Edição de Imagem</span><br/><br/>
    <div class="insertForm form-group">
      <div class="field">
        <label class="label">URL</label>
        <div class="control">
          <input
            v-model="url"
            class="form-control input"
            type="text"
            placeholder="Endereço da imagem">
        </div>
      </div>

      <div class="field">
        <label class="label">Descrição</label>
        <div class="control">
          <input
            v-model="description"
            class="form-control input"
            type="text"
            placeholder="Descrição curta de imagem"
          >
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button
            v-on:click="enviaDados"
            class="btn btn-primary">salvar</button>

          <router-link
            :to="{ name: 'admin_product_images', params: { id: productImage.productId} }"
            class="btn btn-light">
            cancelar
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.productImageEditPage {
    margin: 50px auto;
    padding: 1em;
    border-radius: 15px;
    min-height: 400px;
    max-width: 900px;
    background: #ffffff;
  }
</style>

<script>
import ApiSoucriadorService from '@/services/ApiSoucriadorService'
var productImage = null

export default {
  data () {
    return {
      url: null,
      description: null,
      productImage
    }
  },
  beforeCreate: function () {
    if (!this.$store.state.isLogged) {
      this.$router.push({name: 'login'})
    }
    this.productImageId = this.$route.params.id
  },
  methods: {
    fetchProductImageData: function () {
      this.$http.get(process.env.API_URL + 'product_image/' + this.productImageId,
        {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        }).then(response => {
          var productImageJson = JSON.parse(JSON.stringify(response.body))
          this.productImage = productImageJson['product_image']
          this.populateData()
        })
    },
    async enviaDados () {
      try {
        const response = await ApiSoucriadorService.updateProductImage({
          id: this.productImageId,
          url: this.url,
          description: this.description
        }, localStorage.getItem('token'),
        this.$route.params.id)
        if (response.status === 200) {
          this.$router.push({ name: 'admin_product_images', params: { id: this.productImage.productId } })
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
      this.url = this.productImage.url
      this.description = this.productImage.description
    },
    logout: function () {
      this.$session.destroy()
      this.$store.commit('LOGOUT_USER')
      this.$router.push({name: 'login'})
    }
  },
  created: function () {
    this.populateData()
  },
  mounted: function () {
    if (process.env.NODE_ENV === 'development') {
      console.log('logged? ' + this.$store.state.isLogged)
    }
    this.fetchProductImageData()
  }
}
</script>
