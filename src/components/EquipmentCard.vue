<template>
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
      <router-link
          :to="{ name: 'product_details', params: { id: equipment.id }}">
        <div
          class="card-img-top"
          v-bind:style="{ 'background-image': 'url(' + IMAGE + ')' }">

        </div>
      </router-link>
      <div class="card-body">
        <span class="card-title">
          <b>{{ equipment.brand }} {{ equipment.model }}</b>
        </span><br/>
        Ano: {{ equipment.manufacturing }}
      </div>
      <div class="card-footer text-muted">
        <router-link
          :to="{ name: 'product_details', params: { id: equipment.id }}"
          class="btn btn-primary details"
          style="width: 100%;">
            detalhes
          </router-link>
      </div>
    </div>
  </div>
</template>

<script>
var IMAGE
var apiURL
export default {
  props: ['equipment'],
  data: function () {
    return {
      IMAGE,
      apiURL
    }
  },
  mounted: function () {
    if (this.equipment.product_images.length > 0) {
      console.log('imagem existe')
      if (process.env.NODE_ENV === 'development') {
        this.apiUrl = 'https://api.universalequipamento.com.br/' + 'static/images/'
      } else {
        this.apiUrl = process.env.API_URL + 'static/images/'
      }
      this.IMAGE = this.apiUrl + this.equipment.product_images[0].url
    } else {
      this.IMAGE = require('@/assets/preview_notavailable.png')
    }
  }
}
</script>

<style scoped>
  .card {
    border-top: 4px solid #1c5d93;
  }
  .card-title a {
    color: #333333;
    font-weight: 600;
    font-size: 1.2rem;
  }

  .card-footer {
    border-top: none !important;
    background: #FFFFFF;
  }

  .card-img-top {
    min-height: 250px;
    background-position: center center;
    background-size: cover;
  }

  .details {
    background-color: #1b5e93 !important;
    border: none;
  }

  .details:hover {
    background-color: #276ea1 !important;
  }
</style>
