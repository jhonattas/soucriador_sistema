<template>
  <div class="accountsList">
    <navigation-top></navigation-top>
    <div class="container-fluid">
      <div class="row">
        <main class="col-sm-12 ml-sm-auto col-md-12 pt-3" role="main">
          <h1>Contas</h1>
          <h2>listando contas do sistema</h2>
          <hr/>
          <router-link :to="{ name: 'admin_account_new' }" class="btn btn-success btn-sm">Novo</router-link>  <router-link :to="{ name: 'admin_dashboard' }" class="btn btn-info btn-sm">Buscar Por Código</router-link>
          <br/><br/>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>id</th>
                  <th>email</th>
                  <th>escopo</th>
                  <th>contexto</th>
                  <th>atualizado</th>
                </tr>
              </thead>

              <tbody v-for="account in accounts" class="col-lg-3 col-md-4 col-xs-6" :key="account.id">
                <tr>
                  <router-link :to="{ name: 'admin_account_edit', params: { id: account.id} }" class="btn btn-link">{{ account.id }}</router-link>
                  <td>{{ account.email }}</td>
                  <td>{{ account.local_id }}</td>
                  <td>{{ account.role_id }}</td>
                  <td v-if="account.updated_at !== null">{{ moment(account.updated_at).format("DD/MM/YY") }}</td>
                  <td v-else>desconhecida</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import navigationTop from '@/components/global/NavigationTop'
import footerMain from '@/components/global/Footer'
var moment = require('moment')

var url = process.env.API_URL + 'users'
var accounts = null

export default {
  name: 'accountList',
  data () {
    return {
      accounts,
      moment
    }
  },
  components: {
    navigationTop,
    footerMain
  },
  methods: {
    fetchData: function () {
      this.$http.get(url, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      }).then(response => {
        var accountsJson = JSON.parse(JSON.stringify(response.body))
        this.accounts = accountsJson['users']
      })
    },
    imprime: function (pedido) {
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
.accountsList {
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
