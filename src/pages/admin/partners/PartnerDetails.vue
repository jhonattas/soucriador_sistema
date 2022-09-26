<template>
  <div class="productBOX" v-if="partner">
    <main-navigation-top></main-navigation-top>
    <div class="actionButtons is-pulled-right">
      <router-link
        :to="{ name: 'admin_partner_avatar_update', params: { id: partner.id } }"
        class="btn btn-primary">
        Atualizar Imagem
      </router-link>

      <router-link
        class="btn btn-warning"
        :to="{ name: 'admin_partner_dependendt_link', params: { id: partner.id} }">
        Adicionar Dependente
      </router-link>

      <router-link
        class="btn btn-warning"
        :to="{ name: 'admin_partner_edit', params: { id: partner.id} }">
        Editar Detalhes
      </router-link>
      <a
        class="btn btn-danger"
        @click="removePartner(partner.id)"
        style="color: #ffffff;"
      > Excluir Conveniado
      </a>
      <router-link
        :to="{ name: 'admin_partners' }"
        class="btn btn-light">
        VOLTAR
      </router-link>

    </div>
    <div class="productDetailsPage is-fluid">

      <table class="table is-striped is-fullwidth">
        <tbody>
          <tr>
            <th scope="row" style="float: right">
              <div
                style="background: #f0eeee; margin: 2em center; border-radius: 150px; max-width: 200px; max-height: 200px;">
                <!-- src="../../../assets/profile-empty.png" -->
                <img
                  :src="partner.profile_picture"
                  width="200" height="200"
                  style="border-radius: 150px;"
                  class="d-inline-block align-top" alt=""
                />
              </div>
            </th>
            <td>
              <qriously :value="partner.cpf" :size="200" />
            </td>
          </tr>

        </tbody>
      </table>

      <table class="table is-striped is-fullwidth">
        <tbody>
          <tr>
            <th scope="row">CÓDIGO DE CADASTRO</th>
            <td>{{ partner.id }}</td>
          </tr>

          <tr>
            <th scope="row">NOME COMPLETO</th>
            <td>{{ partner.full_name }}</td>
          </tr>

          <tr>
            <th scope="row">CPF</th>
            <td>{{ partner.cpf }}</td>
          </tr>

          <tr>
            <th scope="row">EMAIL</th>
            <td>{{ partner.email }}</td>
          </tr>

          <tr>
            <th scope="row">TELEFONE</th>
            <td>{{ partner.phone }}</td>
          </tr>

        </tbody>
      </table>

      <hr/>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<style scoped>
  .productBOX {
    margin: 50px auto 0;
  }

  .actionButtons {
    max-width: 870px;
    margin: 70px auto 0;
    padding: 0.2em;
  }

  .table {
    border: 1px solid #cccccc;
  }

  .productDetailsPage {
    margin: 15px auto;
    padding: 1em;
    border-radius: 15px;
    min-height: 400px;
    max-width: 900px;
    background: #ffffff;
  }

  .imageBoxes {
    background: #FFF;
    min-height: 200px;
  }

  .imagePreviews {
    background-position: center center !important;
    background-size: cover !important;
    margin: 0.2em auto;
    border-radius: 5px;
    min-height: 200px;
  }
</style>

<script>
import ApiSoucriadorService from '@/services/ApiSoucriadorService'

var partner = null

export default {
  data () {
    return {
      partner
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
    fetchPartnerData: function () {
      var url = process.env.API_URL + 'partner/' + this.$route.params.id
      this.$http.get(url,
        {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        }, localStorage.getItem('token')).then(response => {
          this.partner = JSON.parse(JSON.stringify(response.body))
          this.populateData()
        })
    },
    populateData: function () {
      this.id = this.partner.id
      this.full_name = this.partner.full_name
      this.cpf = this.partner.cpf
      this.phone = this.partner.phone
      this.mail = this.partner.mail
    },
    async removePartner (id) {
      try {
        const response = await ApiSoucriadorService.deletePartner(
          localStorage.getItem('token'),
          id)
        if (response.status === 200) {
          this.fetchPartnerData()
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
        this.fetchSellerData()
      }
    },
    async removePartnerDependent (id) {
      try {
        console.log('cliquei')
        const response = await ApiSoucriadorService.deletePartnerDepent(
          localStorage.getItem('token'), id)
        console.log('resposta ', response)
        if (response.status === 200) {
          console.log('sucesso')
          this.fetchPartnerData()
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
        this.fetchData()
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

    if (process.env.NODE_ENV === 'development') {
      this.IMAGE_PATH = 'https://api.socuriador.com.br/' + 'static/images/'
    } else {
      this.IMAGE_PATH = process.env.API_URL + 'static/images/'
    }
    this.fetchPartnerData()
  }
}
</script>

