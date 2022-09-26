<template>
  <div class="productImageNewPage">
    <main-navigation-top></main-navigation-top>
    <div class="insertForm form-group">
      <span class="title">Nova Imagem Por Referencia</span><br/><br/>
      <div class="field">
        <label class="label">URL</label>
        <div class="control">
          <input
            v-model="url"
            class="form-control input"
            type="text"
            placeholder="URL da imagem">
        </div>
      </div>

      <div class="field">
        <label class="label">Descrição</label>
        <div class="control">
          <input
            v-model="description"
            class="form-control input"
            type="text"
            placeholder="Descricao curta da imagem"
          >
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button
            @click="saveProductImage"
            class="btn btn-primary">salvar</button>

          <router-link
            :to="{ name: 'admin_product_images', params: { id: productId} }"
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
  .productImageNewPage {
    margin: 0 auto;
    min-height: 400px;
  }

  .insertForm{
    background:#fff;
    padding: 2em 0;
    max-width: 400px;
    margin: 0 auto;
  }
</style>

<script>
import ApiSoucriadorService from '@/services/ApiSoucriadorService'

var productId

export default {
  data () {
    return {
      productId,
      url: null,
      description: null
    }
  },
  components: {
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
  },
  methods: {
    logout: function () {
      this.$session.destroy()
      this.$store.commit('LOGOUT_USER')
      this.$router.push({name: 'login'})
    },
    async saveProductImage () {
      try {
        const response = await ApiSoucriadorService.createProductImage(
          this.productId,
          {
            url: this.url,
            description: this.description
          },
          localStorage.getItem('token'))
        if (response.status === 200) {
          this.$router.push({ name: 'admin_product_images', params: {id: this.productId} })
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
  }
}
</script>
