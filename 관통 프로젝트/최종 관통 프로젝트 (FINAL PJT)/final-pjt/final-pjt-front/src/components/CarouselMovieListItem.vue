<template>
  <div class="box">
    <router-link
      :to="{ 
        name: 'DetailView',
        params: { id: movie.id }
      }"  
    >
      <img id="movie_card" :src="movieImgURL" alt="movie_img" class="d-block w-100" style="border-radius: 10px;">
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CarouselMovieListItem',
  props: {
    movie: Object,
  },
  computed: {
    movieImgURL() {
      return `https://image.tmdb.org/t/p/original${this.movie.backdrop_path}`
    }
  }

}
</script>

<style scoped>
#movie_card:hover {
  transform: scale(1.15, 1.15);
  /* width: 110%; */
}
.box {
  margin: 15px;
}
</style>