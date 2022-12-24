<template>
  <div>
    <div class="mainMovie">
      <CarouselMovieList/>
    </div>
    <div class="mainMovie">
      <InterestedList/>
    </div>
    <div class="mainMovie">
      <RecentMovieList/>
    </div>
    <div class="mainMovie">
      <RecentPopularMovieList/>
    </div>
    <div class="mainMovie">
      <SteadySellerList/>
    </div>
  </div>
</template>

<script>
import CarouselMovieList from '@/components/CarouselMovieList'
import RecentPopularMovieList from '@/components/RecentPopularMovieList'
import InterestedList from '@/components/InterestedList'
import RecentMovieList from '@/components/RecentMovieList'
import SteadySellerList from '@/components/SteadySellerList'

export default {
  name: 'MovieView',
  components: {
    CarouselMovieList,
    RecentPopularMovieList,
    InterestedList,
    RecentMovieList,
    SteadySellerList,
  },
  created() {
    this.getRecentPopularMovies()
    this.getInterestedRecommend()
    this.getRecentMovies()
    this.getSteadySellers()
  },
  methods: {
    getRecentPopularMovies() {
      this.$store.dispatch('getRecentPopularMovies')
    },
    getInterestedRecommend() {
      this.$store.dispatch('getInterestedRecommend')
    },
    getRecentMovies() {
      this.$store.dispatch('getRecentMovies')
    },
    getSteadySellers() {
      this.$store.dispatch('getSteadySellers')
    },
  }
}
</script>

<style>
.mainMovie {
  padding-bottom: 80px;
}
</style>