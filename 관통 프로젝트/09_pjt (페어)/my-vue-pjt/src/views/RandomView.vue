<template>
  <div class="random">
    <nav >
      <div id="randomNav">
        <router-link :to="{name: 'random'}">Just</router-link> | 
        <router-link :to="{name: 'weather'}">Weather</router-link>
      </div>
    </nav>
    <div class="d-grid gap-2 d-flex justify-content-center" @click="randomMoviePick">
      <button class="btn btn-primary" style="width: 400px;" type="button">PICK</button>
    </div>
    <hr>
    <div class="d-flex justify-content-center">
      <div class="card h-100" style="width: 400px;" v-if="movie">
        <img :src="randomImgURL" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"><b>{{ movie.title }}</b></h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RandomView',
  computed: {
    movie() {
      return this.$store.state.randomMovie
    },
    randomImgURL() {
      return `https://image.tmdb.org/t/p/w600_and_h900_bestv2${this.movie.poster_path}`
    },
  },
  methods: {
    getMovieList() {
      this.$store.dispatch('getTopRatedMovie')
    },
    randomMoviePick() {
      this.$store.commit('MOVIE_RANDOM_PICK')
    },
  },
  created() {
    this.getMovieList()
  },
}
</script>

<style>
  #randomNav {
    justify-content: center;

  }
</style>