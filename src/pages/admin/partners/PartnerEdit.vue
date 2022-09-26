<template>
  <div class="sellerEditPage">
    <main-navigation-top></main-navigation-top>
    <div class="form-group insertForm">
      <span class="title">Editar Fornecedor</span><br/><br/>
      <div class="field">
        <label class="label">Código Interno</label>
        <div class="control">
          <input
            class="form-control input" type="text" placeholder="código interno do fabricante"
            v-model="internalCode">
        </div>
      </div>

      <div class="field">
        <label class="label">Empresa</label>
        <div class="control">
          <input
            class="form-control input" type="text" placeholder="Nome da empresa"
            v-model="companyName">
        </div>
      </div>

      <div class="field">
        <label class="label">Cidade</label>
        <div class="control">
          <input
            class="form-control input" type="text"
            v-model="companyCity">
        </div>
      </div>

      <div class="field">
        <label class="label">Estado</label>
        <div class="control">
          <input
            class="form-control input" type="text"
            v-model="companyUF">
        </div>
      </div>

      <div class="field">
        <label class="label">Site</label>
        <div class="control">
          <input
            class="form-control input" type="text"
            v-model="companyWebsite">
        </div>
      </div>

      <hr/>

      <div class="field">
        <label class="label">Nome do Contato</label>
        <div class="control">
          <input
            class="form-control input" type="text"
            v-model="contactName">
        </div>
      </div>

      <div class="field">
        <label class="label">Telefone do Contato</label>
        <div class="control">
          <input
            class="form-control input" type="text"
            v-model="contactPhone">
        </div>
      </div>

      <div class="field">
        <label class="label">Email do Contato</label>
        <div class="control">
          <input
            class="form-control input" type="text"
            v-model="contactMail">
        </div>
      </div>

      <div class="field is-grouped bottomButtons">
        <div class="control">
          <button
            class="btn btn-primary"
            @click="saveSeller"
            >Salvar</button>

          <router-link
            class="btn btn-light"
            :to="{ name: 'admin_sellers'}"
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
  .sellerNewPage {
    margin: 0 auto;
    min-height: 400px;
    background: #ffffff;
  }

  .insertForm{
    background:#fff;
    padding: 2em 0;
    max-width: 600px;
    margin: 40px auto 0;
  }

  .title {
    font-size: 2rem;
  }

  .bottomButtons {
    margin-top: 30px !important;
    margin-bottom: 30px !important;
  }
</style>

<script>
import ApiSoucriadorService from '@/services/ApiSoucriadorService'
var seller

export default {
  data () {
    return {
      seller,
      internalCode: null,
      companyName: null,
      companyCity: null,
      companyUF: null,
      companyWebsite: null,
      contactName: null,
      contactPhone: null,
      contactMail: null
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
    fetchSellerData: function () {
      var url = process.env.API_URL + 'seller/' + this.$route.params.id
      console.log(url)
      this.$http.get(url,
        {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        }, localStorage.getItem('token')).then(response => {
          this.seller = JSON.parse(JSON.stringify(response.body))
          this.populateData()
        })
    },
    async saveSeller () {
      try {
        const response = await ApiSoucriadorService.createSeller({
          internalCode: this.internalCode,
          companyName: this.companyName,
          companyCity: this.companyCity,
          companyUF: this.companyUF,
          companyWebsite: this.companyWebsite,
          contactName: this.contactName,
          contactPhone: this.contactPhone,
          contactMail: this.contactMail
        }, localStorage.getItem('token'))
        if (response.status === 200) {
          this.$router.push({ name: 'admin_sellers' })
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
    populateData: function () {
      this.internalCode = this.seller.internalCode
      this.companyName = this.seller.companyName
      this.companyCity = this.seller.companyCity
      this.companyUF = this.seller.companyUF
      this.companyWebsite = this.seller.companyWebsite
      this.contactName = this.seller.contactName
      this.contactPhone = this.seller.contactPhone
      this.contactMail = this.seller.contactMail
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
    if (process.env.NODE_ENV === 'development') {
      console.log('logged? ' + this.$store.state.isLogged)
    }
    this.fetchSellerData()
  }
}
</script>
