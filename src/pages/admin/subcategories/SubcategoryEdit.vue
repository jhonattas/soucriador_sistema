<template>
  <div class="subCategoryEditPage" v-if="subcategory">
    <main-navigation-top></main-navigation-top>
    <span class="title">Edição de SubCategoria</span><br/><br/>
    <div class="insertForm form-group">
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

      <div
        class="field is-grouped"
        style="margin-top: 1rem;">
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
  .subCategoryEditPage {
    margin: 50px auto;
    border-radius: 15px;
    min-height: 400px;
    background: #ffffff;
  }

  .title {
    margin: 2rem;
  }

  .insertForm {
    margin: 2rem auto;
    width: 70%;
  }

  .title {
    font-size: 2rem;
  }
</style>

<script>
import ApiSoucriadorService from '@/services/ApiSoucriadorService'

var subcategory = null

export default {
  data () {
    return {
      title: null,
      description: null,
      subcategory
    }
  },
  beforeCreate: function () {
    if (!this.$store.state.isLogged) {
      this.$router.push({name: 'login'})
    }
  },
  methods: {
    fetchSubCategoryData: function () {
      this.$http.get(process.env.API_URL + 'subcategory/' + this.$route.params.id,
        {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        }).then(response => {
          var subcategoryJson = JSON.parse(JSON.stringify(response.body))
          this.subcategory = subcategoryJson['subcategory']
          this.populateData()
        })
    },
    async enviaDados () {
      try {
        const response = await ApiSoucriadorService.updateSubCategory({
          id: this.$route.params.id,
          title: this.title,
          description: this.description
        }, localStorage.getItem('token'),
        this.$route.params.id)
        if (response.status === 200) {
          this.$router.push({ name: 'admin_subcategories', params: { id: this.subcategory.category_id } })
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
      this.title = this.subcategory.title
      this.description = this.subcategory.description
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
    this.fetchSubCategoryData()
  }
}
</script>
