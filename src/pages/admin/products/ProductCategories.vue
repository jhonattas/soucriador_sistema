<template>
  <div class="productCategoriesPage">
    <main-navigation-top></main-navigation-top>
    <div class="itensBox">
      <router-link
        :to="{ name: 'admin_product_categories_link'}"
        class="btn btn-primary">
        Adicionar Categoria
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
        <th>NOME</th>
        <th></th>
      </tr>
      <tr v-for="subcategory in subcategories" v-bind:key="subcategory.id">
        <td>{{subcategory.subcategoryId}}</td>
        <td>{{subcategory.title}}</td>
        <td><a @click="removeProductSubcategory(subcategory.id)">remover</a></td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
  .productCategoriesPage {
    margin: 50px auto;
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

var productId = 0
var subcategories = []

export default {
  data () {
    return {
      productId,
      subcategories
    }
  },
  methods: {
    fetchSubcategoriesData: function () {
      this.$http.get(process.env.API_URL + 'product_categories/' + this.$route.params.id).then(response => {
        var subcategoriesJson = JSON.parse(JSON.stringify(response.body))
        this.subcategories = subcategoriesJson['subcategories']
      })
    },
    async removeProductSubcategory (id) {
      try {
        const response = await ApiSoucriadorService.deleteProductSubcategory(
          localStorage.getItem('token'),
          id)
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
        this.fetchSubcategoriesData()
      }
    },
    logout: function () {
      this.$session.destroy()
      this.$store.commit('LOGOUT_USER')
      this.$router.push({name: 'login'})
    }
  },
  created: function () {
    this.fetchSubcategoriesData()
    this.productId = this.$route.params.id
  },
  beforeCreate: function () {
    if (!this.$store.state.isLogged) {
      this.$router.push({name: 'login'})
    }
    this.productId = this.$route.params.id
  },
  mounted: function () {
    if (process.env.NODE_ENV === 'development') {
      console.log('logged? ' + this.$store.state.isLogged)
    }
    this.productId = this.$route.params.id
  }
}
</script>

