<template>

  <div class="col">
    <div class="card h-100">
      <img :src="movieImgURL" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title"><b>{{ movie.title }}</b></h5>
        <p class="card-text">{{ movie.overview }}</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: Object
  },
  computed: {
    movieImgURL() {
      return `https://image.tmdb.org/t/p/w600_and_h900_bestv2${this.movie.poster_path}`
    }
  }
  
}
</script>

<style>

</style>