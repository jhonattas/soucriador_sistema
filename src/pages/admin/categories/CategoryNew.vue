<template>
  <div class="categoryNewPage">
    <main-navigation-top></main-navigation-top>
    <div class="form-group insertForm">
      <span class="title">Nova Categoria</span><br/><br/>
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
            @click="saveCategory"
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
  .categoryNewPage {
    margin: 0 auto;
    min-height: 400px;
  }

  .insertForm {
    padding: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }
</style>

<script>
import ApiSoucriadorService from '@/services/ApiSoucriadorService'

export default {
  data () {
    return {
      title: null,
      description: null
    }
  },
  components: {
  },
  methods: {
    async saveCategory () {
      try {
        const response = await ApiSoucriadorService.createCategory({
          title: this.title,
          description: this.description
        }, localStorage.getItem('token'))
        if (response.status === 200) {
          this.$router.push({ name: 'admin_categories' })
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('Error', error.message)
        }
      }
    },
    logout: function () {
      this.$session.destroy()
      this.$store.commit('LOGOUT_USER')
      this.$router.push({name: 'login'})
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
  }
}
</script>
