<template>
  <div>
    <h1>지금! 어떤 감정을 느끼고 싶나요?</h1>
    <GenreRecommendList/>
    <br>
  </div>
</template>

<script>
import GenreRecommendList from '@/components/GenreRecommendList'

export default {
  name: 'CategoryGenreView',
  components: {
    GenreRecommendList,
  },
  created() {
    this.getGenreRecommend()
  },
  methods: {
    getGenreRecommend() {
      this.$store.dispatch('getGenreRecommend')
    },
  }
}
</script>

<style>

</style>