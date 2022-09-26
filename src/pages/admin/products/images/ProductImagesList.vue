<template>
  <div class="productImagesListPage">
    <main-navigation-top></main-navigation-top>
    <span class="title">Imagens do Produto</span><br/><br/>
    <div class="itensBox">
      <router-link
        :to="{ name: 'admin_product_image_new', params: { id: productId }}"
        class="btn btn-primary">
        Nova Imagem
      </router-link>
      <router-link
        :to="{ name: 'admin_product_details', params: { id: productId}}"
        class="btn btn-light">
        Voltar
      </router-link>
    </div>
    <table class="table">
      <tr>
        <th>ID</th>
        <th>TITULO</th>
        <th></th>
        <th></th>
      </tr>
      <tr v-for="product_image in productImages" v-bind:key="product_image.id">
        <td>{{product_image.id}}</td>
        <td>{{product_image.url}}</td>
        <td><router-link :to="{ name: 'admin_product_image_edit', params: { id: product_image.id} }">editar</router-link></td>
        <td><a @click="removeProductImage(product_image.id)">excluir</a></td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
  .productImagesListPage {
    margin: 0 auto;
    padding: 1em;
    border-radius: 15px;
    min-height: 400px;
    max-width: 900px;
    background: #ffffff;
  }

  .table {
    width: 100%;
  }
</style>

<script>
import ApiSoucriadorService from '@/services/ApiSoucriadorService'

var productImages = []
var productId

export default {
  data () {
    return {
      productImages,
      productId
    }
  },
  components: {
  },
  methods: {
    fetchProductImages: function () {
      const url = process.env.API_URL + 'product_images/' + this.productId
      this.$http.get(url, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      }).then(response => {
        var productImagesJson = JSON.parse(JSON.stringify(response.body))
        this.productImages = productImagesJson['product_images']
      })
    },
    async removeProductImage (id) {
      try {
        const response = await ApiSoucriadorService.deleteProductImage(
          localStorage.getItem('token'),
          id)
        if (response.status === 200) {
          this.fetchProductImages()
        }
      } catch (error) {
        console.log(error)
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
      } finally {
        this.fetchProductImages()
      }
    },
    logout: function () {
      this.$session.destroy()
      this.$store.commit('LOGOUT_USER')
      this.$router.push({name: 'login'})
    }
  },
  created: function () {
    this.productId = this.$route.params.id
    this.fetchProductImages()
  },
  beforeCreate: function () {
    if (!this.$store.state.isLogged) {
      this.$router.push({name: 'login'})
    }
  },
  mounted: function () {
    if (process.env.NODE_ENV === 'development') {
      console.log('logged? ' + this.$store.state.isLogged)
    }
    this.productId = this.$route.params.id
    this.fetchProductImages()
  }
}
</script>
