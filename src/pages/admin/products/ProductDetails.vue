<template>
  <div class="productBOX">
    <main-navigation-top></main-navigation-top>
    <div class="actionButtons is-pulled-right">
      <router-link
        class="btn btn-warning"
        :to="{ name: 'admin_product_edit', params: { id: product.id} }">
        Editar Detalhes
      </router-link>
      <router-link
        class="btn btn-success"
        :to="{ name: 'admin_product_images', params: { id: product.id} }">
        Listar Imagens
      </router-link>
      <a
        class="btn btn-danger"
        @click="removeProduct(product.id)"
        style="color: #ffffff;"
      > Excluir Produto
      </a>
      <router-link
        :to="{ name: 'admin_products' }"
        class="btn btn-light">
        VOLTAR
      </router-link>

    </div>
    <div class="productDetailsPage is-fluid">
      <table class="table is-striped is-fullwidth">
        <tbody>
          <tr>
            <th scope="row">CÓDIGO</th>
            <td>UNV-{{ product.id }}</td>
          </tr>
          <tr v-if="product.seller">
            <th scope="row">VENDEDOR</th>
            <td>
              <router-link :to="{ name: 'admin_seller_details', params: { id: product.seller.id} }">
                {{ product.seller.companyName }}
              </router-link>
            </td>
          </tr>
          <tr>
            <th scope="row">FABRICANTE</th>
            <td>{{ product.brand }}</td>
          </tr>
          <tr>
            <th scope="row">MODELO</th>
            <td>{{ product.model }}</td>
          </tr>
          <tr>
            <th scope="row">ANO</th>
            <td>{{ product.manufacturing }}</td>
          </tr>
          <tr>
            <th scope="row">LOCALIZAÇÃO</th>
            <td>{{ product.location }}</td>
          </tr>
          <tr>
            <th scope="row">VALOR</th>
            <td>{{ product.amount }}</td>
          </tr>
          <tr>
            <th scope="row">DETALHES</th>
            <td v-html="product.obs">{{ product.obs }}</td>
          </tr>
        </tbody>
      </table>

      <hr/>

      <table
        v-if="product.categories.length > 0"
        class="table">
        <thead>
          <tr>
            <th>CATEGORIAS DO PRODUTO</th>
            <th>
              <router-link
                :to="{ name: 'admin_product_categories_link'}"
                class="btn btn-primary btn-sm">
                Adicionar Nova Categoria
              </router-link>
            </th>
          </tr>
        </thead>
        <tr v-for="category in product.categories" v-bind:key="category.id">
          <td>{{category.title}}</td>
          <td>
            <a
              @click="removeProductSubcategory(category.id)"
              class="btn btn-danger btn-sm"
              style="color: #ffffff;">remover</a></td>
        </tr>
      </table>

      <table
        v-else
        class="table">
        <thead>
          <tr>
            <th>CATEGORIAS DO PRODUTO</th>
            <th>
              <router-link
                :to="{ name: 'admin_product_categories_link', params: { id: product.id }}"
                class="btn btn-primary">
                Adicionar Nova Categoria
              </router-link>
            </th>
          </tr>
        </thead>
        <tr>
          <td class="listEmpty">Não existem categorias cadastradas para o produto</td>
        </tr>
      </table>

      <hr/>
      <div class="container imageBoxes">
        <router-link
          :to="{ name: 'admin_product_image_new', params: { id: product.id }}"
          class="btn btn-primary btn-sm">
          Adicionar Imagem
        </router-link>

        <div class="row">
          <div
            class="card col"
            v-for="productImage in product.product_images"
            :key="productImage.id">
            <a
              target="_new"
              :href="IMAGE_PATH + productImage.url">
              <img class="card-img-top" :src="IMAGE_PATH + productImage.url" alt="Card image cap">
            </a>
          </div>
        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<style scoped>
  .productBOX {
    margin: 50px auto 0;
  }

  .actionButtons {
    max-width: 870px;
    margin: 70px auto 0;
    padding: 0.2em;
  }

  .table {
    border: 1px solid #cccccc;
  }

  .productDetailsPage {
    margin: 15px auto;
    padding: 1em;
    border-radius: 15px;
    min-height: 400px;
    max-width: 900px;
    background: #ffffff;
  }

  .imageBoxes {
    background: #FFF;
    min-height: 200px;
  }

  .imagePreviews {
    background-position: center center !important;
    background-size: cover !important;
    margin: 0.2em auto;
    border-radius: 5px;
    min-height: 200px;
  }
</style>

<script>
import ApiSoucriadorService from '@/services/ApiSoucriadorService'

var product = null
var productImages = null
var IMAGE_PATH

export default {
  data () {
    return {
      product,
      productImages,
      IMAGE_PATH
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
    fetchProductData: function () {
      this.$http.get(process.env.API_URL + 'product/' + this.$route.params.id,
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
    fetchProductImagesData: function () {
      this.$http.get(process.env.API_URL + 'product_images/' + this.$route.params.id,
        {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        }, localStorage.getItem('token')).then(response => {
          const producTemp = JSON.parse(JSON.stringify(response.body))
          this.productImages = producTemp['product_images']
        })
    },
    populateData: function () {
      this.brand = this.product.brand
      this.model = this.product.model
      this.amount = this.product.amount
      this.location = this.product.location
      this.manufacturing = this.product.manufacturing
      this.obs = this.product.obs
    },
    async removeProduct (id) {
      try {
        const response = await ApiSoucriadorService.deleteProduct(
          localStorage.getItem('token'),
          id)
        if (response.status === 200) {
          this.fetchProductsData()
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
      } finally {
        this.fetchProductsData()
      }
    },
    async removeProductSubcategory (id) {
      try {
        const response = await ApiSoucriadorService.deleteProductSubcategory(
          localStorage.getItem('token'), id)
        if (response.status === 200) {
          this.fetchSubcategoriesData()
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
      } finally {
        this.fetchProductData()
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

    if (process.env.NODE_ENV === 'development') {
      this.IMAGE_PATH = 'https://api.universalequipamento.com.br/' + 'static/images/'
    } else {
      this.IMAGE_PATH = process.env.API_URL + 'static/images/'
    }
    this.fetchProductData()
    this.fetchProductImagesData()
  }
}
</script>

