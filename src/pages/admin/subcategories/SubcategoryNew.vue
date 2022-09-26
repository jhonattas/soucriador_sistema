<template>
  <div class="subcategoryNewPage">
    <main-navigation-top></main-navigation-top>
    <div class="insertForm">
      <span class="title">Nova Subcategoria</span><br/><br/>
      <div class="field">
        <label class="label">Título</label>
        <div class="control">
          <input
            v-model="title"
            class="input"
            type="text"
            placeholder="Titulo da categoria">
        </div>
      </div>

      <div class="field">
        <label class="label">Descrição</label>
        <div class="control">
          <input
            v-model="description"
            class="input"
            type="text"
            placeholder="Descrição curta da categoria"
          >
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button
            @click="saveSubCategory"
            class="btn btn-primary">salvar</button>
        </div>
        <div class="control">
          <router-link
            :to="{ name: 'admin_categories' }"
            class="btn btn-light">
            cancelar
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .subcategoryNewPage {
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

export default {
  data () {
    return {
      title: null,
      description: null,
      category_id: null
    }
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
  },
  methods: {
    logout: function () {
      this.$session.destroy()
      this.$store.commit('LOGOUT_USER')
      this.$router.push({name: 'login'})
    },
    async saveSubCategory () {
      try {
        const response = await ApiSoucriadorService.createSubCategory(
          this.$route.params.id,
          {
            title: this.title,
            description: this.description
          },
          localStorage.getItem('token'))
        if (response.status === 200) {
          this.$router.push({ name: 'admin_subcategories', params: {id: this.$route.params.id} })
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
    }
  },
  created: function () {
    this.category_id = this.$route.params.id
    console.log(this.category_id)
  }
}
</script>
