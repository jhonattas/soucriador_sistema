<template>
  <slick ref="slick" :options="slickOptions" class="red">
    <a href="https://universalequipamento.com.br/catalogo/20">
      <img src="../../assets/slider/01.jpg" alt="">
    </a>
    <a href="https://universalequipamento.com.br/catalogo/13">
      <img src="../../assets/slider/02.jpg" alt="">
    </a>
    <a href="https://universalequipamento.com.br/catalogo/2">
      <img src="../../assets/slider/03.jpg" alt="">
    </a>
    <a href="https://universalequipamento.com.br/catalogo/14">
      <img src="../../assets/slider/04.jpg" alt="">
    </a>
  </slick>
</template>

<style scoped>
.red {
  /* background-color: #336699 !important; */
  width:100%;
  max-height: 315px;
}

</style>

<script>
import Slick from 'vue-slick'

export default {
  name: 'MainHero',
  components: {
    Slick
  },
  data: () => {
    return {
      slickOptions: {
        autoHeight: true,
        autoplay: true,
        autoplaySpeed: 3600,
        slidesToShow: 2,
        arrows: false
      }
    }
  },
  mounted: function () {
  },
  methods: {
    next () {
      this.$refs.slick.next()
    },
    prev () {
      this.$refs.slick.prev()
    },
    reInit () {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
        this.$refs.slick.reSlick()
      })
    }
  }
}
</script>
