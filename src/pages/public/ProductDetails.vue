<template>
  <div class="productDetailsPage">
    <main-navigation-top></main-navigation-top>

    <!-- Page Content -->
    <div class="container">

      <div class="row">
        <main-navigation-left></main-navigation-left>
        <!-- /.col-lg-3 -->

        <div class="col-lg-9">

          <div class="card mt-4">
            <div class="card-body">
              <h3 class="card-title">{{ product.brand }} {{ product.model }}</h3>
              <table class="table is-striped is-fullwidth">
                <tbody>
                  <tr>
                    <th scope="row">FABRICANTE</th>
                    <td>{{ product.brand }}</td>
                  </tr>
                  <tr>
                    <th scope="row">MODELO</th>
                    <td>{{ product.model }}</td>
                  </tr>
                  <tr>
                    <th scope="row">ANO</th>
                    <td>{{ product.manufacturing }}</td>
                  </tr>
                  <tr>
                    <th scope="row">LOCALIZAÇÃO</th>
                    <td>{{ product.location }}</td>
                  </tr>
                  <tr>
                    <th scope="row">VALOR</th>
                    <td>{{ product.amount }}</td>
                  </tr>
                  <tr>
                    <th scope="row">DETALHES</th>
                    <td v-html="product.obs">{{ product.obs }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- /.card -->

          <div class="container imageBoxes">
            <div class="row">
              <div
                class="card col"
                v-for="productImage in product.product_images"
                :key="productImage.id">
                <a
                  target="_new"
                  :href="IMAGE_PATH + productImage.url">
                  <img class="card-img-top" :src="IMAGE_PATH + productImage.url" alt="Card image cap">
                </a>
              </div>
            </div>
          </div>

          <div class="card card-outline-secondary my-4">
            <div class="card-header">
              Compartilhar
            </div>
            <div class="card-body">
              <a
              :href="facebookUrl"
              class="btn btn-primary" target="facebook">
              facebook</a>

              <a href="#" class="btn btn-success">whatsapp</a>
              <a href="#" class="btn btn-dark">imprimir</a>
              <router-link
                v-if="(logged)"
                :to="{ name: 'admin_product_edit', params: { id: product.id}}"
                class="btn btn-warning">
              editar
            </router-link>
            <router-link
              class="btn btn-light"
              :to="{ name: 'index' }">
              voltar
            </router-link>
            </div>
          </div>
          <!-- /.card -->

        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainHero from '@/components/global/MainHero'
import AdsHorizontal from '@/components/global/AdsHorizontal'

var product = null
var IMAGE_PATH
var logged = false
var facebookUrl

export default {
  name: 'productDetails',
  data () {
    return {
      IMAGE_PATH,
      product,
      logged,
      facebookUrl
    }
  },
  components: {
    AdsHorizontal,
    MainHero
  },
  methods: {
    fetchData: function () {
      var url = process.env.API_URL + 'product/' + this.$route.params.id
      this.$http.get(url).then(response => {
        var productJson = JSON.parse(JSON.stringify(response.body))
        this.product = productJson['product']
        try {
          var title = this.product.brand + ' ' + this.product.model + ' | UniversalEquipamento.com.br'
          document.title = title
        } catch (error) {
          console.log('nao foi possivel alterar titulo')
        }
      })
    }
  },
  mounted: function () {
    this.logged = this.$store.state.isLogged
    this.fetchData()
    if (process.env.NODE_ENV === 'development') {
      this.IMAGE_PATH = 'https://api.universalequipamento.com.br/' + 'static/images/'
    } else {
      this.IMAGE_PATH = process.env.API_URL + 'static/images/'
    }
    this.facebookUrl = 'https://facebook.com/sharer/sharer.php?u=https://universalequipamento.com.br/catalogo/' + this.$route.params.id
  }
}
</script>

<style scoped>
  .imageBoxes {
    margin: 2rem auto;
  }
</style>
