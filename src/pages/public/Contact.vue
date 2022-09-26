<template>
  <div class="contactPage">
    <main-navigation-top></main-navigation-top>
    <section class="hero is-primary is-bold is-fullheight welcome">
      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="row">
            <div class="columns">
              <div class="column is-half is-offset-one-quarter logo_crane">
                <h1>Universal Equipamento</h1>
                <div class="card">
                  <div class="card-body">
                    <div class="content">
                      <b>Carlos Morais</b><br/>
                      <i class="fa fa-envelope" aria-hidden="true"></i><a class="email" href="mailto:carlosmorais@universalequipamento.com.br"> carlosmorais@universalequipamento.com.br</a><br/>
                      <!-- <i class="fa fa-phone" aria-hidden="true"></i><a> 55 (11) 3304-4515</a><br/> -->
                      <i class="fa fa-phone" aria-hidden="true"></i><a> 55 (11) 99000-6328</a><br/>
                      <i class="fa fa-phone" aria-hidden="true"></i><a> 55 (11) 99818-4657</a> <i class="fa fa-whatsapp" aria-hidden="true"></i><br/>
                      <span class="location"><i>São Paulo / SP</i></span>
                    </div>
                  </div>
                </div>

                <div class="card">
                  <div class="card-body">
                    <div class="content">
                      <b>Ricardo Faria</b><br/>
                      <i class="fa fa-envelope" aria-hidden="true"></i><a class="email" href="mailto:ricardofaria@universalequipamento.com.br"> ricardofaria@universalequipamento.com.br</a><br/>
                      <i class="fa fa-phone" aria-hidden="true"></i><a> 55 (19) 3304-4515</a><br/>
                      <i class="fa fa-mobile-phone" aria-hidden="true"></i><a> 55 (19) 99244-4695</a> <i class="fa fa-whatsapp" aria-hidden="true"></i><br/>
                      <i class="fa fa-mobile-phone" aria-hidden="true"></i><a> 55 (19) 98971-8171</a><br/>
                      <span class="location"><i>Campinas / SP</i></span>
                    </div>
                  </div>
                </div>

                <router-link
                  :to="{ name: 'index' }"
                  class="btn btn-primary">
                  voltar
                </router-link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <main-footer></main-footer>
  </div>
</template>

<script>

export default {
  name: 'Contact',
  data () {
    return {
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hero {
  max-width: 420px;
  margin: 0 auto;
}

section.welcome {
  margin-top: 2rem;
  padding: 1rem 0;
}

.logo_crane {
  color: #37474f;
}

.logo_crane img {
  margin: 0 auto;
  max-width: 170px;
}

.logo_crane h1{
  font-size: 2em;
  text-transform: uppercase;
  margin-bottom: 30px;
}

.card {
  margin: 0 auto 16px;
}

.card-content {
  text-align: left;
}

.email:hover{
  color: #336699 !important;
}

.location {
  color: #999999;
}

.fa-whatsapp {
  color: #003300;
}
</style>
