<template>
  <div class="accountDetailsPage">
    <navigation-top></navigation-top>
    <div class="container-fluid">
      <div class="row">
        <main class="col-sm-12 ml-sm-auto col-md-12 pt-3" role="main">
          <h1>{{ client.razao_cliente }}</h1>
          <h2>listando clientes do sistema</h2>
          <div class="table-responsive">
            <p>Código: {{ client.id_cliente }}</p>
            <p>Documento: {{ client.cnpj_cliente }}</p>
            <hr/>
            <p>
              Contato<br/>
              {{ client.fone_cliente }}</p>
            <hr/>
            <p>Criado em {{ client.data_cad_cliente }}, modificado em {{ client.data_mod_vendedor}}</p>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import navigationTop from '@/components/global/NavigationTop'
import footerMain from '@/components/global/Footer'

var client = null

export default {
  name: 'clientDetails',
  data () {
    return {
      client
    }
  },
  components: {
    navigationTop,
    footerMain
  },
  methods: {
    fetchData: function () {
      var url = process.env.API_URL + 'vhsys/cliente/' + this.$route.params.id
      this.$http.get(url).then(response => {
        var clientJson = JSON.parse(JSON.stringify(response.body))
        this.client = clientJson['data']
      })
    },
    imprime: function (client) {
      // window.console.log('produto: ' + pedido.nome_cliente)
    }
  },
  mounted: function () {
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.accountDetailsPage {
    padding-top: 54px;
}

.product_preview {
  border-radius: 125px;
  width: 125px;
  height: 125px;
}

.price {
  min-width: 100px;
}

a.btn {
  margin: 5px auto;
  min-width: 100px;
}

@media (min-width: 992px) {
    .hello {
        padding-top: 56px;
    }
}

header.masthead {
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    -o-background-size: cover;
}

header.masthead > .overlay {
    padding: 5rem 0;
    text-align: center;
    background: rgba(0, 0, 0, 0.45);
}

.navegacao_topo, footer {
  background-color: #990000 !important;
}

@media (min-width: 992px) {
    header.masthead > .overlay {
        padding: 10rem 0;
    }
}
</style>
