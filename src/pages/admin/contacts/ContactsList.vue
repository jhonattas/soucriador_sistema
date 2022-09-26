<template>
  <div class="contactsListPage">
    <main-navigation-top></main-navigation-top>
    <span class="title">Contatos Cadastrados</span><br/>
    <div class="itensBox">
      <router-link
        :to="{ name: 'admin_contact_new'}"
        class="btn btn-primary">
        Cadastrar Contato
      </router-link>
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
          <th>TELEFONE PRINCIPAL</th>
          <th></th>
        </tr>
      </thead>
      <tr v-for="contact in contacts" v-bind:key="contact.id">
        <td>
          <router-link :to="{ name: 'admin_contact_details', params: { id: contact.id} }">
            SEL-{{ contact.id }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'admin_contact_details', params: { id: contact.id} }">
            {{ contact.name }}
          </router-link>
        </td>
        <td>
          <router-link :to="{ name: 'admin_contact_details', params: { id: contact.id} }">
            {{ contact.phoneName }}
          </router-link>
        </td>

        <td>
          <a
            @click="removeContact(contact.id)"
            class="btn btn-danger btn-sm">excluir</a></td>
      </tr>
    </table>
    <main-footer></main-footer>
  </div>
</template>

<style scoped>
  .contactsListPage {
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

const contacts = []

export default {
  data () {
    return {
      contacts
    }
  },
  components: {
  },
  methods: {
    fetchContactsData: function () {
      this.$http.get(process.env.API_URL + 'contacts').then(response => {
        var contactsJson = JSON.parse(JSON.stringify(response.body))
        this.contacts = contactsJson['contacts']
      })
    },
    async removeContact (id) {
      try {
        const response = await ApiSoucriadorService.deleteContact(
          localStorage.getItem('token'),
          id)
        if (response.status === 200) {
          this.fetchContactsData()
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
        this.fetchContactsData()
      }
    }
  },
  mounted: function () {
    this.fetchContactsData()
  },
  created: function () {
    this.fetchContactsData()
  }
}
</script>
