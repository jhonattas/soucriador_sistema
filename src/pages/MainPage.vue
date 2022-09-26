<template>
  <div class="MainPage">
    <main-navigation-top></main-navigation-top>

    <!-- Page Content -->
    <div class="container">

      <div class="row">
        <main-navigation-left></main-navigation-left>

        <div class="col-lg-9">

          <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
              <div class="carousel-item active">
                <img class="d-block img-fluid" src="../assets/slider/01.jpg" alt="First slide">
              </div>
              <div class="carousel-item">
                <img class="d-block img-fluid" src="../assets/slider/02.jpg" alt="First slide">
              </div>
              <div class="carousel-item">
                <img class="d-block img-fluid" src="../assets/slider/03.jpg" alt="First slide">
              </div>
              <div class="carousel-item">
                <img class="d-block img-fluid" src="../assets/slider/04.jpg" alt="First slide">
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Anterior</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Próximo</span>
            </a>
          </div>

          <div class="row">
            <equipment-card
              :equipment="equipment"
              v-for="equipment in equipments"
              v-bind:key="equipment.id"></equipment-card>
          </div>
          <!-- /.row -->

        </div>
        <!-- /.col-lg-9 -->

      </div>
      <!-- /.row -->

    </div>
    <!-- /.container -->

    <!-- Footer -->
    <main-footer></main-footer>
  </div>
</template>

<style>
body {
  padding-top: 54px;
}

@media (min-width: 992px) {
  body {
    padding-top: 56px;
  }
}

.navbar-logo {
  max-width: 40px;
  margin: 0 0.3rem;
}

.anuncie {
  margin: 1.5rem auto 1rem;
}
</style>

<script>
import EquipmentCard from '@/components/EquipmentCard'

var equipments = null

export default {
  data: () => {
    return {
      equipments
    }
  },
  components: {
    EquipmentCard
  },
  methods: {
    fetchProductsData: function () {
      var url = process.env.API_URL + 'products'
      this.$http.get(url).then(response => {
        var productsJson = JSON.parse(JSON.stringify(response.body))
        this.equipments = productsJson['products']
      })
    }
  },
  created: function () {
    try {
      var title = 'UniversalEquipamento.com.br'
      document.title = title
    } catch (error) {
      console.log('nao foi possivel alterar titulo')
    }
    this.fetchProductsData()
  }
}
</script>
