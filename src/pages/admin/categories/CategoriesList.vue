<template>
  <div class="categoriesListPage">
    <main-navigation-top></main-navigation-top>
    <span class="title">Categorias Cadastradas</span><br/>
    <div class="itensBox">
      <router-link
        :to="{ name: 'admin_category_new'}"
        class="btn btn-primary">
        Nova categoria
      </router-link>
      <router-link
        :to="{ name: 'admin_dashboard'}"
        class="btn btn-secondary">
        Voltar
      </router-link>
    </div>
    <table class="table">
      <thead class="bg-light">
        <tr>
          <th>TITULO</th>
          <th>DESCRICAO</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tr v-for="category in categories" v-bind:key="category.id">
        <td>{{category.title}}</td>
        <td>{{category.description}}</td>
        <td>
          <router-link
            :to="{ name: 'admin_subcategories', params: { id: category.id } }"
            class="btn btn-info btn-sm"
            >subcategorias</router-link></td>
        <td>
          <router-link
            :to="{ name: 'admin_category_edit', params: { id: category.id} }"
            class="btn btn-warning btn-sm"
            >editar</router-link></td>
        <td>
          <a
            @click="removeCategory(category.id)"
            class="btn btn-danger btn-sm"
            style="color: #ffffff;">excluir</a></td>
      </tr>
    </table>
    <main-footer></main-footer>
  </div>
</template>

<style scoped>

  .categoriesListPage {
    margin: 0 auto;
    border-radius: 15px;
    min-height: 400px;
    background: #ffffff;
  }

  .title {
    font-size: 1.5rem;
    margin: 1rem;
  }

  .itensBox{
    margin: 30px 1em 1em;
  }

  table {
    margin: 1rem auto 2rem;
    width: 98%;
    border: solid 1px #cccccc;
  }

  td {
    text-transform: uppercase;
  }
</style>

<script>
import ApiSoucriadorService from '@/services/ApiSoucriadorService'

var categories = []

export default {
  data () {
    return {
      categories
    }
  },
  components: {
  },
  methods: {
    fetchCategoriesData: function () {
      this.$http.get(process.env.API_URL + 'categories').then(response => {
        var categoriesJson = JSON.parse(JSON.stringify(response.body))
        this.categories = categoriesJson['categories']
      })
    },
    async removeCategory (id) {
      try {
        const response = await ApiSoucriadorService.deleteCategory(
          localStorage.getItem('token'),
          id)
        if (response.status === 200) {
          this.fetchCategoriesData()
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
        this.fetchCategoriesData()
      }
    },
    logout: function () {
      this.$session.destroy()
      this.$store.commit('LOGOUT_USER')
      this.$router.push({name: 'login'})
    }
  },
  created: function () {
    this.fetchCategoriesData()
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
  }
}
</script>
