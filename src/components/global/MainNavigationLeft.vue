<template>
  <div class="col-lg-3">
    <div class="card anuncie">
      <router-link
        :to="{ name: 'advertise_here' }">
        <img class="card-img-top" src="../../assets/anuncie_aqui.png" alt="Anuncie conosco">
      </router-link>
    </div>

    <div id="accordion" class="list-group">
      <div
        class="categoryBox"
        v-for="category in categories"
        :key="category.id">

        <a
          href="#"
          class="list-group-item categoryName"
          data-toggle="collapse" :data-target="'#' + category.id"
          aria-expanded="false"
          aria-controls="collapseOne">
          {{ category.title }}
        </a>

        <div
          :id="category.id"
          class="collapse"
          aria-labelledby="headingOne" data-parent="#accordion">
          <router-link
            v-for="subcategory in category.subcategories"
            :key="subcategory.id"
            :to="{ name: 'products_by_category', params: {id: subcategory.id } }"
            class="list-group-item subcategory"> {{ subcategory.title }} </router-link>
        </div>
      </div>

      <div class="card anuncie">
        <a
          href="https://fb.com/www.universalequipamento.com.br/"
          target="_facebook">
          <img class="card-img-top" src="../../assets/facebook.png" alt="Anuncie conosco">
        </a>
      </div>


    </div>
  </div>
  <!-- /.col-lg-3 -->
</template>

<style scoped>
  .categoryName {
    background: #14669d;
    color: #FFFFFF;
    text-transform: uppercase;
  }
</style>


<script>
var categories = {}

export default {
  name: 'NavigationLeft',
  components: {
  },
  data: () => {
    return {
      categories
    }
  },
  methods: {
    fetchCategoriesData: function () {
      var url = process.env.API_URL + 'categories'
      this.$http.get(url).then(response => {
        var categoriesJson = JSON.parse(JSON.stringify(response.body))
        this.categories = categoriesJson['categories']
      })
    }
  },
  mounted: function () {
    this.fetchCategoriesData()
  }
}
</script>
