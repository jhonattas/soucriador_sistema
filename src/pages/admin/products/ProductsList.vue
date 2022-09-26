<template>
  <div class="productsListPage">
    <main-navigation-top></main-navigation-top>
    <span class="title">Equipamentos Cadastrados</span><br/>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Pesquisar</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" v-model="codeSearch">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            <button type="button" class="btn btn-success" @click="fetchProductsByCode" data-dismiss="modal">Pesquisar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="itensBox">
      <router-link
        :to="{ name: 'admin_product_new'}"
        class="btn btn-primary">
        Cadastrar Equipamento
      </router-link>
      <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal" @click="clearCodeSearch">
        Pesquisar
      </button>
      <router-link
        :to="{ name: 'admin_dashboard'}"
        class="btn btn-secondary">
        Voltar
      </router-link>
    </div>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th>CÓDIGO</th>
          <th>FABRICANTE</th>
          <th>MODELO</th>
          <th>ANO</th>
          <th>PRECO</th>
          <th>FOTOS</th>
          <th></th>
        </tr>
      </thead>
      <tr v-for="product in products" v-bind:key="product.id">
        <td>
          <router-link :to="{ name: 'admin_product_details', params: { id: product.id} }">
            UNV-{{ product.id }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'admin_product_details', params: { id: product.id} }">
            {{ product.brand }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'admin_product_details', params: { id: product.id} }">
            {{ product.model }}
          </router-link>
        </td>

        <td>
          <router-link :to="{ name: 'admin_product_details', params: { id: product.id} }">
            {{ product.manufacturing }}
          </router-link>
        </td>

        <td>
          <router-link :to="{ name: 'admin_product_details', params: { id: product.id} }">
            {{ product.amount }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'admin_product_details', params: { id: product.id} }">
            {{ product.product_images_count }}
          </router-link>
        </td>
        <td>
          <a
            @click="removeProduct(product.id)"
            class="btn btn-danger btn-sm">excluir</a></td>
      </tr>
    </table>
    <main-footer></main-footer>
  </div>
</template>

<style scoped>
  .productsListPage {
    margin: 0 auto;
    padding: 0;
    border-radius: 15px;
    min-height: 400px;
    background: #ffffff;
  }

  table {
    width: 98%;
    margin: 1rem auto 2rem;
    border: 1px solid #cccccc;
  }

  table a {
    color: #14669d !important;
  }

  .itensBox{
    margin: 30px 1em 1em;
  }

  .title {
    margin: 1rem;
    font-size: 1.6rem;
    color: #14669d;
  }

  .btn-danger {
    color: #ffffff !important;
  }
</style>

<script>
import ApiSoucriadorService from '@/services/ApiSoucriadorService'

const products = []

export default {
  data () {
    return {
      products,
      codeSearch: null
    }
  },
  components: {
  },
  methods: {
    clearCodeSearch: function () {
      this.codeSearch = ''
    },
    fetchProductsData: function () {
      this.$http.get(process.env.API_URL + 'products_all').then(response => {
        var productsJson = JSON.parse(JSON.stringify(response.body))
        this.products = productsJson['products']
      })
    },
    fetchProductsByCode: function () {
      this.$http.get(process.env.API_URL + 'productParams/' + this.codeSearch).then(response => {
        var productsJson = JSON.parse(JSON.stringify(response.body))
        this.products = productsJson['products']
      })
    },
    async removeProduct (id) {
      try {
        const response = await ApiSoucriadorService.deleteProduct(
          localStorage.getItem('token'),
          id)
        if (response.status === 200) {
          this.fetchProductsData()
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
        this.fetchProductsData()
      }
    }
  },
  mounted: function () {
    this.fetchProductsData()
  },
  created: function () {
    this.fetchProductsData()
  }
}
</script>
