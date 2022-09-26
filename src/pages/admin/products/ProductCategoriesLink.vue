<template>
  <div class="productEditPage">
    <main-navigation-top></main-navigation-top>
    <div class="insertForm form-group">
      <span class="title">Adicionar Categoria a Equipamento</span><br/><br/>
      <div class="field">
        <label class="label">Categoria Principal</label>
        <div class="select">
          <select
            id="selectedCategory"
            v-model="categoryName"
            v-on:change="onChange"
            class="form-control">
            <option
            v-for="category in categories" v-bind:key="category.id"
            :value="category.id">{{ category.title}}</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label class="label">Subcategoria</label>
        <div class="select">
          <select
            id="selectedSubCategory"
            class="form-control"
            v-model="subcategoryName">
            <option
            v-for="subcategory in subcategories" v-bind:key="subcategory.id"
            :value="subcategory.id">{{ subcategory.title}}</option>
          </select>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button
            class="btn btn-primary"
            v-on:click="enviaDados"
            >Adicionar</button>
        </div>

        <div class="control">
          <router-link
            class="btn btn-light"
            :to="{ name: 'admin_product_categories', params: { id: productId }}"
            >
            cancelar
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .productEditPage {
    margin: 50px auto;
    padding: 1em;
    border-radius: 15px;
    min-height: 400px;
    max-width: 900px;
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

var categories = []
var subcategories = []
var productId = 0

export default {
  data () {
    return {
      categories,
      subcategories,
      categoryName: 'Escolha uma categoria',
      subcategoryName: 'Escolha uma subcategoria',
      productId
    }
  },
  beforeCreate: function () {
    if (!this.$store.state.isLogged) {
      this.$router.push({name: 'login'})
    }
  },
  methods: {
    fetchCategoriesData: function () {
      this.$http.get(process.env.API_URL + 'categories/',
        {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        }, localStorage.getItem('token')).then(response => {
          var categoriesJson = JSON.parse(JSON.stringify(response.body))
          this.categories = categoriesJson['categories']
        })
    },
    fetchSubcategoriesData: function (id) {
      this.$http.get(process.env.API_URL + 'subcategories/' + id,
        {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        }, localStorage.getItem('token')).then(response => {
          var subcategoriesJson = JSON.parse(JSON.stringify(response.body))
          this.subcategories = subcategoriesJson['subcategories']
        })
    },
    onChange: function () {
      console.log('mudou o metodo' + this.categoryName)
      this.fetchSubcategoriesData(this.categoryName)
    },
    async enviaDados () {
      try {
        const response = await ApiSoucriadorService.createProductSubcategory(
          this.productId,
          {
            subcategoryId: this.subcategoryName
          },
          localStorage.getItem('token')
        )
        if (response.status === 200) {
          this.$router.push({ name: 'admin_product_details', params: { id: this.$route.params.id } })
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
    this.productId = this.$route.params.id
    this.fetchCategoriesData()
  }
}
</script>
