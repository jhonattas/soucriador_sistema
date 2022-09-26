<template>
  <div class="subcategoryListPage">
    <main-navigation-top></main-navigation-top>
    <span class="title">Subcategorias</span>
    <div class="itensBox">
      <router-link
        :to="{ name: 'admin_subcategory_new', params: { id: this.$route.params.id }}"
        class="btn btn-primary">
        Nova Subcategoria
      </router-link>
      <router-link
        :to="{ name: 'admin_categories'}"
        class="btn btn-light">
        Voltar
      </router-link>
    </div>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th>ID</th>
          <th>TITULO</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tr v-for="subcategory in subcategories" v-bind:key="subcategory.id">
        <td>{{subcategory.id}}</td>
        <td>{{subcategory.title}}</td>
        <td>
          <router-link
            :to="{ name: 'admin_subcategory_edit', params: { id: subcategory.id} }"
            class="btn btn-warning btn-sm"
            >editar</router-link>
        </td>
        <td>
          <a
            @click="removeSubcategory(subcategory.id)"
            class="btn btn-danger btn-sm"
            style="color: #ffffff;">
            excluir</a>
        </td>
      </tr>
    </table>
    <main-footer></main-footer>
  </div>
</template>

<style scoped>
  .subcategoryListPage {
    margin: 0 auto;
    border-radius: 15px;
    background: #ffffff;
  }

  .title {
    font-size: 2rem;
    margin:  1rem;
  }

  .itensBox{
    margin: 30px 1em 1em;
  }

  .table {
    width: 98%;
    margin: 1rem auto 2rem;
    border: 1px solid #cccccc;
  }
</style>

<script>
import ApiSoucriadorService from '@/services/ApiSoucriadorService'

var subcategories = []

export default {
  data () {
    return {
      subcategories
    }
  },
  components: {
  },
  methods: {
    fetchSubCategoriesData: function () {
      const url = process.env.API_URL + 'subcategories/' + this.$route.params.id
      this.$http.get(url, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      }).then(response => {
        var subcategoriesJson = JSON.parse(JSON.stringify(response.body))
        this.subcategories = subcategoriesJson['subcategories']
      })
    },
    async removeSubcategory (id) {
      try {
        const response = await ApiSoucriadorService.deleteSubCategory(
          localStorage.getItem('token'),
          id)
        if (response.status === 200) {
          this.fetchSubCategoriesData()
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
        this.fetchSubCategoriesData()
      }
    },
    logout: function () {
      this.$session.destroy()
      this.$store.commit('LOGOUT_USER')
      this.$router.push({name: 'login'})
    }
  },
  created: function () {
    this.fetchSubCategoriesData()
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
