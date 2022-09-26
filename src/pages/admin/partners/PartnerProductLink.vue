<template>
  <div class="sellerProductLinkPage">
    <main-navigation-top></main-navigation-top>
    <div class="form-group insertForm">
      <span class="title">Vincular Produto</span><br/><br/>
      <div class="field">
        <label class="label">ID FINAL</label>
        <div class="control">
          <input
            class="form-control input" type="text" placeholder="id do equipamento sem o prefixo"
            v-model="productId">
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button
            class="btn btn-primary"
            @click="saveProduct"
            >Salvar</button>

          <router-link
            class="btn btn-light"
            :to="{ name: 'admin_products'}"
            >
            cancelar
          </router-link>
        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<style scoped>
  .productNewPage {
    margin: 0 auto;
    min-height: 400px;
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
var sellerId

export default {
  data () {
    return {
      productId: null,
      sellerId
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
    async saveProduct () {
      try {
        const response = await ApiSoucriadorService.createSellerProductLink({
          product_id: this.productId,
          seller_id: this.sellerId
        }, localStorage.getItem('token'))
        if (response.status === 200) {
          this.$router.push({ name: 'admin_seller_details' }, {params: { id: this.sellerId }})
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
  mounted: function () {
    if (process.env.NODE_ENV === 'development') {
      console.log('logged? ' + this.$store.state.isLogged)
    }
    this.sellerId = this.$route.params.id
    console.log(this.sellerId)
  }
}
</script>
