<template>
  <div class="movie mt-5" >
    <h1><b>Movies</b></h1>
    <hr>
    <div class= "d-flex justify-content-center">
      <div class="row row-cols-1 row-cols-md-3 g-4;" style="width: 1300px;">
        <MovieCard
          class="my-3"
          v-for="movie in topRatedList"
          :key=movie.id
          :movie=movie
        />
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'MovieView',
  components: {
    MovieCard,
  },
  methods: {
    getMovieList() {
      this.$store.dispatch('getTopRatedMovie')
    }
  },
  created() {
    this.getMovieList()
  },
  computed: {
    topRatedList(){
      return this.$store.getters.topRatedList
    }
  },

}
</script>
