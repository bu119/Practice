<template>
  <!-- <h1>최신 인기 영화</h1> -->
  <carousel :autoplay="true" :nav="false" :dots="false" class="marginTop50">
    <CarouselMovieListItem
      v-for="movie in movies.presented.slice(0, 10)"
      :key="movie.id"
      :movie="movie"
    />
  </carousel>
</template>

<script>
import carousel from 'vue-owl-carousel'
import CarouselMovieListItem from '@/components/CarouselMovieListItem'

export default {
  name: 'CarouselMovieList',
  components: {
    CarouselMovieListItem,
    carousel
  },
  computed: {
    movies() {
      return this.$store.state.recentpopularmovies
    }
  },
}
</script>

<style scoped>
h1 {
  padding-left: 20px;
  text-align: left;
  font-size: 24px;
  line-height: 36px;
  display: block;
  font-weight: bold;
}
</style>