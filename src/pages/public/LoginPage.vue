<template>
  <div class="adminLoginPage">
    <div class="container">
      <form class="form-group form-signin">
        <div class="brand_login">
          <img src="../../assets/logo.png"/>
        </div>
        <label for="inputEmail" class="sr-only">Endereço de email</label>
        <input
          type="email"
          id="inputEmail"
          v-model="email"
          class="form-control input"
          placeholder="email@email.com"
          v-on:keyup.enter="login"
          required autofocus>
        <label for="inputPassword" class="sr-only">Senha</label>
        <input
          type="password"
          id="inputPassword"
          v-model="password"
          class="form-control input"
          placeholder="senha"
          v-on:keyup.enter="login"
          required>
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> Lembrar-me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" v-on:click="login" style="float: right">Entrar</button>
        <div class="notification is-danger is-centered" v-show="loginError">
          Combinação de email e senha não localizada.<br/>
          Por favor tente novamente.
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import AuthenticationService from '@/services/AuthenticationService'
var loginError = false

export default {
  name: 'loginPage',
  data () {
    return {
      email: null,
      password: null,
      errors: [],
      loginError
    }
  },
  mounted: function () {
    window.console.log(localStorage.getItem('token'))
    console.log('esta logado ' + this.$store.state.isLogged)
    if (this.$store.state.isLogged) {
      this.$router.push({name: 'admin_dashboard'})
    }
  },
  methods: {
    async login (e) {
      var response = null
      e.preventDefault()
      try {
        response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
      } catch (error) {
        this.loginError = true
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
          // TODO
        }
      }

      if (response.status === 200 && response.data.token) {
        const token = response.data.token
        localStorage.setItem('token', token)
        const userData = jwtDecode(token)

        localStorage.setItem('userId', userData['id'])
        localStorage.setItem('userEmail', userData['email'])
        localStorage.setItem('userLocal', userData['local_id'])
        localStorage.setItem('userRole', userData['role_id'])
        if (process.env.NODE_ENV === 'development') {
          console.log('local', localStorage.getItem('userLocal'))
        }
        this.$store.commit('LOGIN_USER')
        // this.$session.set('jwt', token)
        this.$router.push({name: 'admin_dashboard'})
      }
      if (response.status === 403) {
        this.loginError = true
      }
    },
    checkForm: function () {
      if (this.email === undefined || this.password === undefined) {
        return false
      } return true
    }
  }
}
</script>


<style scoped>
body {
  padding: 0;
  background-color: #eee;
}

.brand_login {
  margin: 0 auto;
  text-align: center;
}

.brand_login img{
  max-width: 160px;
  max-height: 160px;
  margin: 20px;
}

.adminLoginPage {
  margin-top: 0px;
  margin-bottom: 100px;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}

.form-signin h2{
  margin: 0 auto;
  text-align: center;
}

.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.loginSubmit {
  background-color: #f58634;
  border-color: #ef822f;
}

.loginSubmit:hover{
  background: #cc6600;
}

.notification {
  margin-top: 1.5em;
  text-align: center;
}

</style>
