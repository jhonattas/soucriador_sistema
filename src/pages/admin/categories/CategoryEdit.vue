<template>
  <div class="categoryEditPage" v-if="category">
    <main-navigation-top></main-navigation-top>
    <div class="form-group insertForm">
      <span class="title">Edição de Categoria</span><br/><br/>
      <div class="field">
        <label class="label">Título</label>
        <div class="control">
          <input
            v-model="title"
            class="form-control input"
            type="text"
            placeholder="Titulo da categoria">
        </div>
      </div>

      <div class="field">
        <label class="label">Descrição</label>
        <div class="control">
          <input
            v-model="description"
            class="form-control input"
            type="text"
            placeholder="Descrição curta da categoria"
          >
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button
            v-on:click="enviaDados"
            class="btn btn-primary">salvar</button>

          <router-link
            :to="{ name: 'admin_categories' }"
            class="btn btn-light">
            cancelar
          </router-link>
        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<style scoped>

  .categoryEditPage {
    margin: 0 auto;
    min-height: 400px;
    background: #ffffff;
  }

  .insertForm {
    padding: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }
</style>

<script>
import ApiSoucriadorService from '@/services/ApiSoucriadorService'

var category = null

export default {
  data () {
    return {
      title: null,
      description: null,
      category
    }
  },
  components: {
  },
  methods: {
    fetchCategoryData: function () {
      this.$http.get(process.env.API_URL + 'category/' + this.$route.params.id,
        {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        }, localStorage.getItem('token')).then(response => {
          var categoryJson = JSON.parse(JSON.stringify(response.body))
          this.category = categoryJson['category']
          this.populateData()
        })
    },
    async enviaDados () {
      try {
        const response = await ApiSoucriadorService.updateCategory({
          title: this.title,
          description: this.description
        },
        localStorage.getItem('token'),
        this.$route.params.id)
        if (response.status === 200) {
          this.$router.push({ name: 'admin_categories' })
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
      this.title = this.category.title
      this.description = this.category.description
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
  beforeCreate: function () {
    if (!this.$store.state.isLogged) {
      this.$router.push({name: 'login'})
    }
  },
  mounted: function () {
    if (process.env.NODE_ENV === 'development') {
      console.log('logged? ' + this.$store.state.isLogged)
    }
    this.fetchCategoryData()
  }
}
</script>
