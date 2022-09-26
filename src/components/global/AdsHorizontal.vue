<template>
  <div class="columns AdsHorizontal">
    <div class="column has-text-centered">
      <p class="title">Caminhões</p>
    </div>

    <div class="column has-text-centered">
      <p class="title">Guindastes</p>
    </div>

    <div class="column has-text-centered">
      <p class="title">Empilhadeiras</p>
    </div>

    <div class="column has-text-centered">
      <p class="title">Containers</p>
    </div>

    <div class="column has-text-centered">
      <p class="title">Terraplanagem</p>
    </div>
</div>
</template>

<style scoped>

  .columns {
    margin: 0 auto;
  }

  .column {
    text-align: center;
    background: #ebeaea;
    margin: 1em 0.5em;
    border-radius: 5px;
    height: 60px;
  }

  .title {
    font-size: 1.5em;
  }

</style>

<script>
export default {
  name: 'AdsHorizontal',
  data: () => {
    return {
    }
  }
}
</script>
