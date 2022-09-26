<template>
  <div class="partnersListPage">
    <main-navigation-top></main-navigation-top>
    <span class="title">Parceiros / Convênios</span><br/>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Pesquisar Por Código</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" v-model="codeSearch">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            <button type="button" class="btn btn-success" @click="fetchPartnersByCode" data-dismiss="modal">Pesquisar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="itensBox">
      <router-link
        :to="{ name: 'admin_partner_new'}"
        class="btn btn-primary">
        Cadastrar Parceiro
      </router-link>
      <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal" @click="clearCodeSearch">
        Pesquisar Código
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
          <th>NOME CONTATO</th>
          <th>CPF</th>
          <th></th>
        </tr>
      </thead>
      <tr v-for="partner in partners" v-bind:key="partner.id">
        <td>
          <router-link :to="{ name: 'admin_partner_details', params: { id: partner.id} }">
            {{ partner.id }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'admin_partner_details', params: { id: partner.id} }">
            {{ partner.full_name }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'admin_partner_details', params: { id: partner.id} }">
            {{ partner.cpf }}
          </router-link>
        </td>

        <td>
          <router-link
            class="btn btn-primary btn-sm"
            style="color: #ffffff !important;"
            :to="{ name: 'admin_partner_dependant_link', params: { id: partner.id} }">
            Adicionar Detalhes
          </router-link>
          <router-link
            :to="{ name: 'admin_partner_edit', params: { id: partner.id} }"
            class="btn btn-warning btn-sm"
            >editar</router-link>

          <a
            @click="removePartner(partner.id)"
            class="btn btn-danger btn-sm">excluir</a></td>
      </tr>
    </table>
    <main-footer></main-footer>
  </div>
</template>

<style scoped>
  .partnersListPage {
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

const partners = []

export default {
  data () {
    return {
      partners,
      codeSearch: null
    }
  },
  components: {
  },
  methods: {
    clearCodeSearch: function () {
      this.codeSearch = ''
    },
    fetchPartnersData: function () {
      this.$http.get(process.env.API_URL + 'partners',
        {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        }
      ).then(response => {
        var partnersJson = JSON.parse(JSON.stringify(response.body))
        this.partners = partnersJson['partners']
      })
    },
    fetchPartnersByCode () {
      var url = process.env.API_URL + 'partnersCode/' + this.codeSearch
      this.$http.get(url, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      }).then(response => {
        var partnersJson = JSON.parse(JSON.stringify(response.body))
        this.partners = partnersJson['partners']
      })
    },
    async removePartner (id) {
      try {
        const response = await ApiSoucriadorService.deletePartners(
          localStorage.getItem('token'),
          id)
        if (response.status === 200) {
          this.fetchPartnersData()
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
        this.fetchPartnersData()
      }
    },
    logout: function () {
      try {
        this.$session.destroy()
        this.$store.commit('LOGOUT_USER')
      } finally {
        this.$router.push({name: 'login'})
      }
    }
  },
  mounted: function () {
    this.fetchPartnersData()
  },
  created: function () {
    this.fetchPartnersData()
  }
}
</script>
