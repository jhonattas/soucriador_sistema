<template>
<div id="invoiceDetail">
  <navigation-top></navigation-top>

    <div class="container-fluid">
      <div class="row">
        <main class="col-sm-12 ml-sm-auto col-md-12 pt-3" role="main">
          <h1 style="text-align: center">Cadastrar Usuário</h1>
          <div class="enterForm">
            <br/>
            <div class="form-group row">
                <label for="example-text-input" class="col-2 col-form-label">Email</label>
                <div class="col-10">
                    <input
                        v-model="email"
                        class="form-control"
                        type="text">
                </div>
            </div>

            <div class="form-group row">
                <label for="example-text-input" class="col-2 col-form-label">Senha</label>
                <div class="col-10">
                    <input
                        v-model="password"
                        class="form-control"
                        type="password">
                </div>
            </div>

            <div class="form-group row">
                <label for="example-text-input" class="col-2 col-form-label">Local</label>
                <div class="col-10">
                    <input
                        v-model="local_id"
                        class="form-control"
                        type="number">
                </div>
            </div>
            <div class="form-group row">
                <label for="example-text-input" class="col-2 col-form-label">Permissão</label>
                <div class="col-10">
                    <input
                        v-model="role_id"
                        class="form-control"
                        type="number">
                </div>
            </div>
            <div class="submitButtons" style="text-align: right">
                <router-link :to="{ name: 'admin_accounts_list'}" class="btn btn-danger">Cancelar</router-link>
                <button type="button" class="btn btn-success" @click="enviaDados">Cadastrar</button>
            </div>
          </div>
        </main>
      </div>
    </div>
</div>
</template>

<style scoped>
/* Move down content because we have a fixed navbar that is 3.5rem tall */
body {
  padding-top: 3.5rem;
}

main {
  margin-top: 50px !important;
}

h1 {
  margin-bottom: 20px;
  padding-bottom: 9px;
  border-bottom: 1px solid #eee;
}

 /* Placeholders */
.placeholders {
  padding-bottom: 3rem;
}

.placeholder img {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.price {
  min-width: 100px;
}

.preview {
  border-radius: 90px;
  max-width: 90px;
  max-height: 90px;
}

.resume {
    max-width: 400px;
    margin: 2em auto;
    border: 1px solid #333;
}

.enterForm {
    max-width: 600px;
    margin: 2em auto;
}

</style>

<script>
  import GJRService from '@/services/GJRService'
  import navigationTop from '@/components/global/NavigationTop'

  export default {
    name: 'account_new',
    data () {
      return {
        email: null,
        password: null,
        local_id: null,
        role_id: null
      }
    },
    methods: {
      async enviaDados () {
        try {
          const response = await GJRService.createAccount({
            email: this.email,
            password: this.password,
            active: 1,
            user_id_create: localStorage.getItem('userId'),
            role_id: this.role_id,
            local_id: this.local_id
          }, localStorage.getItem('token'))
          if (response.status === 200) {
            this.$router.push({ name: 'admin_accounts_list' })
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
      }
    },
    mounted: function () {
    },
    components: {
      navigationTop
    }
  }
</script>
